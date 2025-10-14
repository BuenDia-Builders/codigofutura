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

//Environment variables
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({path: '.env'});
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
}

//Configuración
const server = new Horizon.Server('https://horizon-testnet.stellar.org');
const networkPassphrase = Networks.TESTNET;
const SECRET_KEY = process.env.SECRET_KEY;

const sourceKeys = Keypair.fromSecret(SECRET_KEY);

//Funcionalidad
async function enviarPago(dest, amount, memo = '') {
  
  try {
    console.log('🚀 Iniciando pago...\n');
    
    // Paso 1: Cargar tu cuenta
    const sourceAccount = await server.loadAccount(sourceKeys.publicKey());
    console.log(`Balance actual: ${sourceAccount.balances[0].balance} XLM\n`);

    // Paso 1.5: Validar saldo
    if (parseFloat(sourceAccount.balances[0].balance) < amount) {
      throw new Error('Balance insuficiente');
    }

    // Paso 2: Construir transacción
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: networkPassphrase
    })
      .addOperation(Operation.payment({
        destination: dest.address,
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
    console.log(`🔗 Hash: ${result.hash}\n`);
    
    return result;
    
  } catch (error) {
    console.error(`❌ ERROR al enviar a ${dest.address}:`, error.message);
    throw error;
  }
}

async function enviarVariosPagos(destinations) {
  for(const dest of destinations) {
    console.log ('--------------------------------');
    await enviarPago(dest.address, dest.amount, `Pago a ${dest.address.slice(0, 5)}...`);
  }
}

const destinationsAccounts = [
  { address: 'GCFXW4Y5LZ3KX5Y5Z6K7JH3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E4', amount: '10' },
  { address: 'GB3JDWCQ3Y5KX5Y5Z6K7JH3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E4', amount: '15' }
];
await enviarVariosPagos(destinationsAccounts);
