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

const SECRET_KEY = 'SXXX...XXX'; // Secret key da CONTA 1
const DESTINATION = 'GXXX...XXX'; // Public key da CONTA 2

async function enviarPago(amount, memo = '') {
  try {
    console.log('🚀 Iniciando pago...\n');
    
    const sourceKeys = Keypair.fromSecret(SECRET_KEY);
    const sourceAccount = await server.loadAccount(sourceKeys.publicKey());
    
    console.log(`Balance actual: ${sourceAccount.balances[0].balance} XLM\n`);
    
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: networkPassphrase
    })
      .addOperation(Operation.payment({
        destination: DESTINATION,
        asset: Asset.native(),
        amount: amount.toString()
      }))
      .addMemo(memo ? Memo.text(memo) : Memo.none())
      .setTimeout(30)
      .build();
    
    transaction.sign(sourceKeys);
    
    const result = await server.submitTransaction(transaction);
    
    console.log('🎉 ¡PAGO EXITOSO!\n');
    console.log(`💰 Enviaste: ${amount} XLM`);
    console.log(`🔗 Hash: ${result.hash}`);
    console.log(`🔍 Ver en: https://stellar.expert/explorer/testnet/tx/${result.hash}\n`);
    
    return result;
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    if (error.response?.data) {
      console.error('Detalles:', error.response.data);
    }
    throw error;
  }
}

enviarPago('25', 'Pago desde Node.js 🚀');