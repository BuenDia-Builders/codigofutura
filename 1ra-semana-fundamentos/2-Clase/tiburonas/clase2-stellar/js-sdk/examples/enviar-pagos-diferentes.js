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
async function enviarPago(adress, amount, memo = '') {
  
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
        destination: adress,
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
    console.error(`❌ ERROR al enviar a ${adress}:`, error.message);
    throw error;
  }
}

async function enviarVariosPagos(destinations) {
  for(const dest of destinations) {
    console.log ('--------------------------------');
    console.log(`Enviando a ${dest.address}...`);
    await enviarPago(dest.address, dest.amount, `Pago a ${dest.address.slice(0, 5)}...`);
  }
}

const destinationsAccounts = [
  { 
    address: 'GDWSCTESGJ3N35WKPN2WLQIWRHWIJ6PEOKT4F3TFXJA3GJ2APCXWDCJI', 
    amount: '50' 
  },
  { address: 'GB6PJYBIOWHDCM3WGS6JXLABJJ5IBB2VUNLBL6CHGVMEFQLMPZKZNSCW', 
    amount: '15' 
  },
  {
    address: 'GANAD6QSAYEXXTEU6R76MQDMGPW6BXISVQA6FQMRJN6I46CCDENZGXK4',
    amount: '20'
  }
];

await enviarVariosPagos(destinationsAccounts);