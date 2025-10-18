import {
  Keypair,
  Horizon,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  BASE_FEE,
  Memo,
} from "@stellar/stellar-sdk";

const server = new Horizon.Server("https://horizon-testnet.stellar.org");
const networkPassphrase = Networks.TESTNET;

// PASO 1: Copiar estos datos del ejercicio anterior (crear-cuenta.js)
// Llave secreta de la cuenta emisora (cuenta 1 creada anteriormente)
const sourceSecret = "TU_SECRET_KEY_DE_LA_CUENTA_1";
const sourceKeypair = Keypair.fromSecret(sourceSecret);

// Array de destinatarios (cuentas 2, 3, 4 creadas anteriormente)
const destinatarios = [
    { publicKey: "TU_PUBLIC_KEY_CUENTA_2", memo: "Pago-001" },
    { publicKey: "TU_PUBLIC_KEY_CUENTA_3", memo: "Pago-002" },
    { publicKey: "TU_PUBLIC_KEY_CUENTA_4", memo: "Pago-003" }
];

async function enviarPagos() {
  console.log("💸 Iniciando sistema de pagos automatizado...\n");
  
  for (const destinatario of destinatarios) {
    try {
      // Cargar cuenta emisora para obtener sequence number actualizado
      const cuentaEmisor = await server.loadAccount(sourceKeypair.publicKey());
      
      // Crear transacción
      const transaction = new TransactionBuilder(cuentaEmisor, {
        fee: BASE_FEE,
        networkPassphrase: networkPassphrase
      })
        .addOperation(Operation.payment({
          destination: destinatario.publicKey,
          asset: Asset.native(),
          amount: "2" // Enviar 2 XLM
        }))
        .addMemo(Memo.text(destinatario.memo))
        .setTimeout(300)
        .build();

      // Firmar transacción
      transaction.sign(sourceKeypair);
      
      // Enviar transacción
      const result = await server.submitTransaction(transaction);
      
      // Verificar que fue exitosa y mostrar hash
      console.log(`✅ ${destinatario.memo} - Pago exitoso`);
      console.log(`   📤 Destinatario: ${destinatario.publicKey}`);
      console.log(`   💰 Monto: 2 XLM`);
      console.log(`   🔗 Hash: ${result.hash}`);
      console.log(`   ⏰ Timestamp: ${new Date().toLocaleString()}\n`);
      
    } catch (error) {
      console.error(`❌ Error en ${destinatario.memo}:`, error.message);
    }
  }
  
  console.log("🎉 Sistema de pagos completado");
}

enviarPagos().catch(console.error);
