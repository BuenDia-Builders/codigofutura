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

//Destinatarios y montos
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
//Configuración
const server = new Horizon.Server('https://horizon-testnet.stellar.org');
const networkPassphrase = Networks.TESTNET;
const SECRET_KEY = process.env.SECRET_KEY;

const sourceKeys = Keypair.fromSecret(SECRET_KEY);

//Funcionalidad
async function enviarPagosEnUnaTransaccion(destinations) {
  console.log('====================================================\n');

  try {
    console.log('🚀 Iniciando envío múltiple en una sola transacción...\n');

    const sourceAccount = await server.loadAccount(sourceKeys.publicKey());
    const balanceXLM = parseFloat(sourceAccount.balances.find(b => b.asset_type === 'native').balance);
    const total = destinations.reduce((sum, d) => sum + parseFloat(d.amount), 0);

    if (balanceXLM < total) {
      throw new Error(`Balance insuficiente (${balanceXLM} < ${total})`);
    }

    // Construir transacción con múltiples operaciones
    let builder = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE * destinations.length,
      networkPassphrase
    });

    for (const dest of destinations) {
      builder = builder.addOperation(Operation.payment({
        destination: dest.address,
        asset: Asset.native(),
        amount: dest.amount.toString()
      }));
      console.log(`➡️  Preparando pago de ${dest.amount} XLM a ${dest.address.slice(0, 5)}...${dest.address.slice(-5)}`);
    }

    const transaction = builder
      .addMemo(Memo.text('Pagos múltiples'))
      .setTimeout(30)
      .build();

    transaction.sign(sourceKeys);

    const result = await server.submitTransaction(transaction);

    console.log('\n🎉 Transacción múltiple completada');
    console.log(`🔗 Hash: ${result.hash}\n`);

    console.log('====================================================\n');
  } catch (error) {
    console.error('❌ Error en transacción múltiple:', error.message);
  }
}

await enviarPagosEnUnaTransaccion(destinationsAccounts);