import {
  Keypair,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  BASE_FEE,
  Memo,
  Horizon
} from '@stellar/stellar-sdk';

const Server = Horizon.Server;

const server = new Server('https://horizon-testnet.stellar.org');
const networkPassphrase = Networks.TESTNET;

// ⚠️ SUSTITUYE con tu SECRET KEY de la cuenta origen
const SECRET_KEY = 'SBXXX...'; // Secret key de la cuenta origen

// ⚠️ SUSTITUYE con las PUBLIC KEYS de las cuentas destino (las 5 que creaste)
const destinatarios = [
  { publicKey: "GABC...1", memo: "Pago-001" },
  { publicKey: "GABC...2", memo: "Pago-002" },
  { publicKey: "GABC...3", memo: "Pago-003" },
  { publicKey: "GABC...3", memo: "Pago-004" },
  { publicKey: "GABC...3", memo: "Pago-005" },
];

async function enviarPagosMasivos() {
  console.log('💸 SISTEMA DE PAGOS AUTOMATIZADO\n');
  console.log('═'.repeat(60));
  
  try {
    // Cargar cuenta origen
    const sourceKeys = Keypair.fromSecret(SECRET_KEY);
    const sourceAccount = await server.loadAccount(sourceKeys.publicKey());
    
    console.log(`\n💰 Balance inicial: ${sourceAccount.balances[0].balance} XLM`);
    console.log(`📤 Cuenta origen: ${sourceKeys.publicKey()}`);
    console.log(`\n🎯 Enviando 2 XLM a ${destinatarios.length} cuentas...\n`);
    console.log('─'.repeat(60));
    
    // Contador de éxitos
    let pagosExitosos = 0;
    let totalEnviado = 0;
    
    // Enviar pago a cada destinatario
    for (let i = 0; i < destinatarios.length; i++) {
      const destino = destinatarios[i];
      
      console.log(`\n📍 Pago ${i + 1}/${destinatarios.length}`);
      console.log(`   Destino: ${destino.publicKey}`);
      console.log(`   Memo: ${destino.memo}`);
      console.log(`   Monto: 2 XLM`);
      
      try {
        // Recargar cuenta para actualizar sequence number
        const accountRefresh = await server.loadAccount(sourceKeys.publicKey());
        
        // Construir transacción
        const transaction = new TransactionBuilder(accountRefresh, {
          fee: BASE_FEE,
          networkPassphrase: networkPassphrase
        })
          .addOperation(Operation.payment({
            destination: destino.publicKey,
            asset: Asset.native(),
            amount: '2'
          }))
          .addMemo(Memo.text(destino.memo))
          .setTimeout(30)
          .build();
        
        // Firmar
        transaction.sign(sourceKeys);
        
        // Enviar
        const result = await server.submitTransaction(transaction);
        
        console.log(`   ✅ ÉXITO!`);
        console.log(`   🔗 Hash: ${result.hash}`);
        console.log(`   🔍 Ver: https://stellar.expert/explorer/testnet/tx/${result.hash}`);
        
        pagosExitosos++;
        totalEnviado += 2;
        
        // Delay de 1 segundo entre transacciones
        if (i < destinatarios.length - 1) {
          console.log(`   ⏳ Esperando 1 segundo...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
      } catch (error) {
        console.log(`   ❌ ERROR: ${error.message}`);
        if (error.response?.data) {
          console.log(`   Detalle:`, error.response.data.extras?.result_codes);
        }
      }
      
      console.log('─'.repeat(60));
    }
    
    // Cargar balance final
    const accountFinal = await server.loadAccount(sourceKeys.publicKey());
    const balanceFinal = accountFinal.balances[0].balance;
    
    // Mostrar resumen
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('                📊 RESUMEN DE PAGOS');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');
    console.log(`✅ Pagos exitosos: ${pagosExitosos}/${destinatarios.length}`);
    console.log(`❌ Pagos fallidos: ${destinatarios.length - pagosExitosos}`);
    console.log(`💰 Total enviado: ${totalEnviado} XLM`);
    console.log(`📊 Balance final: ${balanceFinal} XLM`);
    console.log(`📉 Diferencia: ${(parseFloat(sourceAccount.balances[0].balance) - parseFloat(balanceFinal)).toFixed(7)} XLM`);
    console.log('');
    
  } catch (error) {
    console.error('\n❌ ERROR GENERAL:', error.message);
    throw error;
  }
}

// Ejecutar
enviarPagosMasivos();