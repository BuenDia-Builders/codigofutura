import {
  Keypair,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  BASE_FEE,
  Memo
} from '@stellar/stellar-sdk';
const __sdk = await import('@stellar/stellar-sdk');
const Server = __sdk.Server ?? __sdk.default?.Server ?? __sdk.Horizon?.Server ?? __sdk.default?.Horizon?.Server;

const server = new Server('https://horizon-testnet.stellar.org');
const networkPassphrase = Networks.TESTNET;

const SECRET_KEY = 'SBXXX...'; // Tu secret key
const destinatarios = [
    { publicKey: "GBITFC7MKOAKFBLSRK4E2KICDPSP7JYEPKASZ55PMN4EJFLJHW6CXXTD", memo: "Pago-001" },
    { publicKey: "GBRTWVDRZM3XZEEZNNX3UD3M764UHIN27Q3TFC7QDVRJAEUSKVDYWABR", memo: "Pago-002" },
    { publicKey: "GDISLXFS5JOM7BKEYURIERN66J62P6WMIFBQY22CVK5BCNWNDNFX25TM", memo: "Pago-003" }
];
async function enviarPago(destination, amount, memo = '') {
  try {
    console.log('🚀 Iniciando pago...\n');
    
    // Paso 1: Cargar tu cuenta
    const sourceKeys = Keypair.fromSecret(SECRET_KEY);
    const sourceAccount = await server.loadAccount(sourceKeys.publicKey());
    
    console.log(`Balance actual: ${sourceAccount.balances[0].balance} XLM\n`);
    
    // Paso 2: Construir transacción
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: networkPassphrase
    })
      .addOperation(Operation.payment({
        destination,
        asset: Asset.native(),
        amount: amount.toString()
      }))
      .addMemo(memo ? Memo.text(memo) : Memo.none())
      .setTimeout(30)
      .build();
    
    // Paso 3: Firmar
    transaction.sign(sourceKeys);
    
    // Paso 4: Enviar
    const result = await server.submitTransaction(transaction);
    
    console.log('🎉 ¡PAGO EXITOSO!\n');
    console.log(`💰 Enviaste: ${amount} XLM`);
    console.log(`📝 Memo: ${memo || '(sin memo)'}`);
    console.log(`🔗 Hash: ${result.hash}\n`);
    
    return result;
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    throw error;
  }
}

(async () => {
  const amount = '25';
  for (const { publicKey, memo } of destinatarios) {
    await enviarPago(publicKey, amount, memo);
  }
})();