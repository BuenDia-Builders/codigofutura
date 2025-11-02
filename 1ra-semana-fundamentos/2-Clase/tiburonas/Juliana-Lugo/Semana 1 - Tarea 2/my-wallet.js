import readline from 'readline';
import { createRequire } from 'module';
const sdk = createRequire(import.meta.url)('@stellar/stellar-sdk');

const {
  Keypair,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  BASE_FEE,
  Memo,
} = sdk;
const Server = sdk.Server ?? sdk.Horizon?.Server ?? sdk.default?.Server ?? sdk.default?.Horizon?.Server;
const server = new Server('https://horizon-testnet.stellar.org');
const networkPassphrase = Networks.TESTNET;

let CURRENT_SECRET = null;
let CURRENT_PUBLIC = null;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, (ans) => res(ans)));

const sanitizeAmount = (amount) => String(amount).replace(',', '.').trim();
const isValidAmount = (s) => /^\d+(\.\d{1,7})?$/.test(s) && parseFloat(s) > 0;

async function friendbotFund(publicKey) {
  const res = await fetch(`https://friendbot.stellar.org/?addr=${encodeURIComponent(publicKey)}`);
  if (!res.ok) throw new Error(`Friendbot error HTTP ${res.status}`);
  return res.json();
}

function printBalances(account) {
  console.log('╔═══════════════════════════════════╗');
  console.log('💰 BALANCES');
  console.log('╚═══════════════════════════════════╝\n');

  account.balances.forEach((b, i) => {
    if (b.asset_type === 'native') {
      const baseReserve = 0.5;
      const subentryReserve = account.subentry_count * 0.5;
      const totalReserve = baseReserve + subentryReserve;
      const available = parseFloat(b.balance) - totalReserve;
      console.log(`${i + 1}. 🌟 XLM (Lumens):`);
      console.log(`   Total:      ${b.balance} XLM`);
      console.log(`   Bloqueado:  ${totalReserve.toFixed(7)} XLM`);
      console.log(`   Disponible: ${Math.max(0, available).toFixed(7)} XLM\n`);
    } else {
      console.log(`${i + 1}. 🪙 ${b.asset_code}: ${b.balance} (issuer ${b.asset_issuer.slice(0, 8)}…)`);
    }
  });
}

async function crearCuenta() {
  console.log('\n🔐 Generando par de llaves…');
  const pair = Keypair.random();
  console.log('\n✅ ¡Cuenta generada!');
  console.log('📧 PUBLIC KEY (compartible):\n' + pair.publicKey());
  console.log('\n🔑 SECRET KEY (NUNCA compartir):\n' + pair.secret());

  console.log('\n💰 Fondeando con Friendbot…');
  try {
    const fb = await friendbotFund(pair.publicKey());
    console.log('✅ Fondeada con 10,000 XLM');
    console.log('🔗 Tx hash:', fb.hash || '(no provisto)');
    CURRENT_SECRET = pair.secret();
    CURRENT_PUBLIC = pair.publicKey();
    console.log('\n🧠 Sesión actualizada: cuenta cargada en memoria.');
  } catch (e) {
    console.error('❌ Error al fondear:', e.message);
  }
}

async function cargarCuentaExistente() {
  const secret = await ask('🔑 Ingresa tu SECRET KEY (S…): ');
  try {
    const kp = Keypair.fromSecret(secret.trim());
    CURRENT_SECRET = secret.trim();
    CURRENT_PUBLIC = kp.publicKey();
    console.log('✅ Cuenta cargada. PUBLIC KEY:', CURRENT_PUBLIC);
  } catch {
    console.error('❌ Secret inválida.');
  }
}

async function verBalance() {
  const pk = CURRENT_PUBLIC ?? (await ask('📧 Public key (G…): ')).trim();
  if (!pk) return console.log('⚠️  No se proporcionó public key.');
  try {
    console.log(`\n🔍 Consultando cuenta: ${pk.slice(0, 8)}…\n`);
    const account = await server.loadAccount(pk);
    console.log('📧 Account ID:\n   ' + account.id + '\n');
    console.log('🔢 Sequence:\n   ' + account.sequenceNumber() + '\n');
    printBalances(account);
  } catch (e) {
    if (e.response?.status === 404) {
      console.error('❌ Cuenta no encontrada (¿sin fondear?).');
    } else {
      console.error('❌ Error:', e.message);
    }
  }
}

async function enviarPago() {
  if (!CURRENT_SECRET) {
    console.log('ℹ️  Carga una cuenta primero (opción 2).');
    return;
  }
  const destination = (await ask('➡️  Destinatario (G…): ')).trim();
  const rawAmt = sanitizeAmount(await ask('💸 Monto XLM (ej. 25 o 25.0000000): '));
  const memoTxt = (await ask('📝 Memo (opcional, máx 28 bytes): ')).trim();

  if (!isValidAmount(rawAmt)) return console.error('❌ Monto inválido.');

  try {
    const sourceKeys = Keypair.fromSecret(CURRENT_SECRET);
    const sourceAccount = await server.loadAccount(sourceKeys.publicKey());
    const nativeBal = parseFloat(
      (sourceAccount.balances.find((b) => b.asset_type === 'native')?.balance) ?? '0'
    );
    const needed = parseFloat(rawAmt);
    if (nativeBal < needed) throw new Error(`Balance insuficiente: ${nativeBal} < ${needed}`);

    let builder = new TransactionBuilder(sourceAccount, { fee: BASE_FEE, networkPassphrase })
      .addOperation(
        Operation.payment({ destination, asset: Asset.native(), amount: rawAmt })
      );

    if (memoTxt) builder = builder.addMemo(Memo.text(memoTxt.slice(0, 28)));
    const tx = builder.setTimeout(30).build();
    tx.sign(sourceKeys);

    const res = await server.submitTransaction(tx);
    console.log('\n🎉 ¡PAGO EXITOSO!');
    console.log('📝 Memo:', memoTxt || '(sin memo)');
    console.log('💰 Enviaste:', rawAmt, 'XLM');
    console.log('🔗 Hash:', res.hash, '\n');
  } catch (e) {
    console.error('❌ Error al enviar:', e.response?.data?.extras?.result_codes || e.message);
  }
}

async function verHistorial() {
  const pk = CURRENT_PUBLIC ?? (await ask('📧 Public key (G…): ')).trim();
  if (!pk) return console.log('⚠️  No se proporcionó public key.');
  try {
    const payments = await server.payments().forAccount(pk).order('desc').limit(10).call();
    console.log('\n📜 Últimos pagos (máx 10):\n');
    for (const p of payments.records) {
      if (p.type !== 'payment') continue;
      const isIncoming = p.to === pk;
      const asset =
        p.asset_type === 'native' ? 'XLM' : `${p.asset_code}:${p.asset_issuer.slice(0, 6)}…`;
      console.log(
        `${new Date(p.created_at).toISOString()}  ${isIncoming ? '⬅️  IN' : '➡️  OUT'}  ${p.amount} ${asset}`
      );
      console.log(`   from ${p.from.slice(0, 6)}… to ${p.to.slice(0, 6)}…  (tx: ${p.transaction_hash})\n`);
    }
  } catch (e) {
    console.error('❌ Error:', e.message);
  }
}

// --- Extras del desafío ---

// 1) Airdrop
async function airdrop(cuentas, amount) {
  if (!CURRENT_SECRET) {
    console.log('ℹ️  Carga una cuenta primero (opción 2).');
    return;
  }
  const amt = sanitizeAmount(amount);
  if (!isValidAmount(amt)) return console.error('❌ Monto inválido.');

  for (const cuenta of cuentas) {
    try {
      await enviarPagoA(cuenta, amt, `Airdrop a ${cuenta.slice(0, 6)}…`);
      console.log(`✅ Enviado a ${cuenta}\n`);
    } catch (e) {
      console.error(`❌ Falló envío a ${cuenta}:`, e.response?.data?.extras?.result_codes || e.message);
    }
  }
}

async function enviarPagoA(destination, amount, memoTxt = '') {
  const sourceKeys = Keypair.fromSecret(CURRENT_SECRET);
  const sourceAccount = await server.loadAccount(sourceKeys.publicKey());

  const tx = new TransactionBuilder(sourceAccount, { fee: BASE_FEE, networkPassphrase })
    .addOperation(Operation.payment({ destination, asset: Asset.native(), amount }))
    .addMemo(memoTxt ? Memo.text(memoTxt.slice(0, 28)) : Memo.none())
    .setTimeout(30)
    .build();

  tx.sign(sourceKeys);
  return server.submitTransaction(tx);
}

// 2) Monitor de balance cada N ms (presiona Enter para detener)
async function monitorearBalance() {
  const pk = CURRENT_PUBLIC ?? (await ask('📧 Public key (G…): ')).trim();
  if (!pk) return console.log('⚠️  No se proporcionó public key.');
  const ms = parseInt(await ask('⏱️  Intervalo ms (ej. 10000), termina con enter: '), 10) || 10000;

  console.log(`\n🖥️  Monitoreando ${pk.slice(0, 8)}… cada ${ms} ms. Presiona ENTER para detener.\n`);
  const timer = setInterval(async () => {
    try {
      const account = await server.loadAccount(pk);
      const bal = account.balances.find((b) => b.asset_type === 'native')?.balance ?? '0';
      console.log(`[${new Date().toLocaleTimeString()}] Balance: ${bal} XLM`);
    } catch (e) {
      console.error('❌ Error al consultar:', e.message);
    }
  }, ms);

  rl.once('line', () => {
    clearInterval(timer);
    console.log('🛑 Monitoreo detenido.\n');
    void menu(); 
  });
}

// 3) Calculadora de fees
function calcularCostoTotal(numTransacciones, opsPerTx) {
  const totalOps = Number(numTransacciones) * Number(opsPerTx);
  const totalStroops = totalOps * Number(BASE_FEE); 
  const XLM = totalStroops / 10_000_000; 
  return XLM;
}

async function menu() {
  console.log('\n=== MI WALLET STELLAR (TESTNET) ===\n');
  console.log('1. Crear nueva cuenta');
  console.log('2. Cargar cuenta existente (SECRET)');
  console.log('3. Ver balance');
  console.log('4. Enviar pago');
  console.log('5. Ver historial');
  console.log('6. Airdrop (enviar a varias cuentas)');
  console.log('7. Monitor de balance (cada N ms)');
  console.log('8. Calculadora de fees');
  console.log('9. Salir\n');

  const opcion = await ask('Elige opción: ');
  switch (opcion.trim()) {
    case '1':
      await crearCuenta();
      return menu();
    case '2':
      await cargarCuentaExistente();
      return menu();
    case '3':
      await verBalance();
      return menu();
    case '4':
      await enviarPago();
      return menu();
    case '5':
      await verHistorial();
      return menu();
    case '6': {
      if (!CURRENT_SECRET) {
        console.log('ℹ️  Carga una cuenta primero (opción 2).');
        return menu();
      }
      const raw = await ask('📋 Ingresa cuentas separadas por coma: ');
      const cuentas = raw.split(',').map((s) => s.trim()).filter(Boolean);
      const amt = sanitizeAmount(await ask('💸 Monto XLM por cuenta: '));
      if (!isValidAmount(amt)) {
        console.log('❌ Monto inválido.');
        return menu();
      }
      await airdrop(cuentas, amt);
      return menu();
    }
    case '7':
      await monitorearBalance(); 
      return; 
    case '8': {
      const n = Number(await ask('🔢 Número de transacciones: '));
      const ops = Number(await ask('🧮 Operaciones por transacción: '));
      const costo = calcularCostoTotal(n, ops);
      console.log(`\n💸 Costo estimado: ${costo} XLM (BASE_FEE=${BASE_FEE} stroops/op)\n`);
      return menu();
    }
    case '9':
      console.log('👋 ¡Hasta luego!');
      rl.close();
      return;
    default:
      console.log('⚠️  Opción inválida.');
      return menu();
  }
}

menu();