import readline from 'readline';
import {
  Keypair,
  Horizon,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  BASE_FEE,
  Memo
} from '@stellar/stellar-sdk';
import fs from 'fs';
import dotenv from 'dotenv';

// Cargar variables
dotenv.config({ path: '.env' });
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
}

// Configuración base
const server = new Horizon.Server('https://horizon-testnet.stellar.org');
const networkPassphrase = Networks.TESTNET;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// FUNCIONALIDAD CREAR NUEVA CUENTA
async function crearCuenta() {
  console.log('🔐 Generando tu nuevo par de llaves...\n');

  const pair = Keypair.random();
  
  console.log('✅ ¡Cuenta creada!\n');
  console.log('📧 PUBLIC KEY (puedes compartir):');
  console.log(pair.publicKey());
  console.log('\n🔑 SECRET KEY (NUNCA COMPARTIR):');
  console.log(pair.secret());

  console.log('\n💧 Solicitando fondos desde Friendbot...');

  try {
    const response = await fetch(
      `https://friendbot.stellar.org/?addr=${pair.publicKey()}`
    );
    
    const result = await response.json();
    
    if (result.successful || response.ok) {
      console.log('✅ ¡Cuenta fondeada con 10,000 XLM!\n');
      console.log('🔗 Transaction hash:', result.hash);
    }
  } catch (error) {
    console.error('❌ Error al fondear:', error.message);
  }

  // Guardar localmente
  fs.writeFileSync(
    '.env.local',
    `PUBLIC_KEY=${pair.publicKey()}\nSECRET_KEY=${pair.secret()}\n`
  );
  console.log('💾 Claves guardadas en .env.local');
}

// FUNCIONALIDAD VER BALANCE
async function verBalance() {
  const publicKey = process.env.PUBLIC_KEY;
  if (!publicKey) {
    console.log('⚠️ No se encontró PUBLIC_KEY en .env o .env.local');
    return;
  }
  try {
    const account = await server.loadAccount(publicKey);
    console.log(`\n💰 Balance de la cuenta ${publicKey}:`);
    account.balances.forEach((bal) =>
      console.log(`- ${bal.balance} ${bal.asset_type === 'native' ? 'XLM' : bal.asset_code}`)
    );
  } catch (error) {
    console.error('❌ Error al cargar la cuenta:', error.message);
  }
}

// FUNCIONALIDAD ENVIAR PAGO
async function enviarPago() {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    console.log('⚠️ No se encontró SECRET_KEY en .env.local');
    return;
  }

  rl.question('\n👉 Dirección destino: ', (destino) => {
    rl.question('💸 Monto (XLM): ', async (monto) => {
      try {
        const sourceKeypair = Keypair.fromSecret(secretKey);
        const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

        const tx = new TransactionBuilder(sourceAccount, {
          fee: BASE_FEE,
          networkPassphrase
        })
          .addOperation(Operation.payment({
            destination: destino,
            asset: Asset.native(),
            amount: monto
          }))
          .setTimeout(30)
          .build();

        tx.sign(sourceKeypair);

        const result = await server.submitTransaction(tx);
        console.log('\n✅ Pago enviado exitosamente!');
        console.log(`🔗 Hash: ${result.hash}`);
      } catch (err) {
        console.error('❌ Error al enviar pago:', err.message);
      } finally {
        menu();
      }
    });
  });
}

// FUNCIONALIDAD VER HISTORIAL
async function verHistorial() {
  const publicKey = process.env.PUBLIC_KEY;
  if (!publicKey) {
    console.log('⚠️ No se encontró PUBLIC_KEY en .env o .env.local');
    return;
  }

  try {
    const payments = await server.payments()
      .forAccount(publicKey)
      .order('desc')
      .limit(5)
      .call();

    console.log(`\n🧾 Últimas transacciones de ${publicKey}:\n`);
    payments.records.forEach((p, i) => {
      if (p.type === 'payment') {
        console.log(`${i + 1}. De: ${p.from} → A: ${p.to}`);
        console.log(`   💰 ${p.amount} ${p.asset_type === 'native' ? 'XLM' : p.asset_code}`);
        console.log(`   🕒 ${p.created_at}\n`);
      }
    });
  } catch (error) {
    console.error('❌ Error al obtener historial:', error.message);
  }
}

// MENÚ PRINCIPAL
async function menu() {
  console.log('\n=== 💼 MI WALLET STELLAR ===\n');
  console.log('1. Crear nueva cuenta');
  console.log('2. Ver balance');
  console.log('3. Enviar pago');
  console.log('4. Ver historial');
  console.log('5. Salir\n');

  rl.question('Elige opción: ', async (opcion) => {
    switch (opcion) {
      case '1':
        await crearCuenta();
        break;
      case '2':
        await verBalance();
        break;
      case '3':
        await enviarPago();
        return; // evita mostrar menú dos veces
      case '4':
        await verHistorial();
        break;
      case '5':
        console.log('\n👋 Saliendo de Mi Wallet Stellar...');
        rl.close();
        return;
      default:
        console.log('❌ Opción no válida.');
    }
    menu();
  });
}

menu();