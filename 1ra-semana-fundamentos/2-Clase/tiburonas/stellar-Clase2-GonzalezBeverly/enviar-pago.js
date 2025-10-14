// enviar-pago.js

// Importar librerías necesarias
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

// Para cargar variables de entorno
import dotenv from 'dotenv';
// Cargar desde el archivo .env
dotenv.config();

//Configuración inicial
// Crear servidor Horizon para Testnet
const server = new Horizon.Server('https://horizon-testnet.stellar.org');

// Configurar red
const networkPassphrase = Networks.TESTNET;

// CREDENCIALES
const sourceSecretKey = process.env.SECRET_KEY;  // Secret Key desde .env
// const sourcePublicKey = process.env.PUBLIC_KEY;  // Public Key desde .env

const destinatarios = [
    { publicKey: "GDWSCTESGJ3N35WKPN2WLQIWRHWIJ6PEOKT4F3TFXJA3GJ2APCXWDCJI", 
        memo: "Pago-Mar" 
    },
    { publicKey: "GBT7PCQF6F424QIWUA2I5HZWWDJRZRWG2E6JQE3K7IX2R36T6HNYPN7V", 
        memo: "Pago-Beth" 
    },
    { publicKey: "GDPEWAKMRZKP72BXTZGRKZET34LF3ZFC7WSGWJYO3XCU2KGEYGDUTSKO", 
        memo: "Pago-Bev" 
    }
];


async function enviarPago(amount, publicKeyDestino, memo = '') {
  try {
    console.log(`🚀 Iniciando pago a ${publicKeyDestino}\n`);
    
    // 1: Cargar cuenta
const sourceKeypair = Keypair.fromSecret(sourceSecretKey);
const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

    
    console.log(`Balance actual: ${sourceAccount.balances[0].balance} XLM\n`);
    
    // 2: Construir transacción
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: networkPassphrase
    })
      .addOperation(Operation.payment({
        destination: publicKeyDestino,
        asset: Asset.native(),
        amount: amount.toString()
      }))
      .addMemo(Memo.text(memo.slice(0, 28)))
      .setTimeout(30)
      .build();
    
    // 3: Firmar
    transaction.sign(sourceKeypair);
    
    // 4: Enviar
    const result = await server.submitTransaction(transaction);
    
    console.log('🎉 ¡PAGO EXITOSO!\n');
    console.log(`💰 Enviaste: ${amount} XLM`);
    console.log(`👤 A: ${publicKeyDestino}`);
    if (memo) {
        console.log(`📝 Memo: ${memo}`);
    }
    console.log(`🔗 Hash: ${result.hash}\n`);
    
    return result;
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    throw error;
  }
}

async function sistPagosAutomaticos() {
    const monto= 2;

    for (const{publicKey, memo} of destinatarios) {
        const exitoso = await enviarPago(monto, publicKey, memo);
        if (!exitoso) {
            console.log(`Error en el pago a ${publicKey}. Proceso detenido.`);
            break;
        }
        await new Promise(res => setTimeout(res, 2000)); // Espera 2 seg entre pagos
    }
    console.log('\n ✅ Todos los pagos procesados correctamente.');
}
sistPagosAutomaticos();