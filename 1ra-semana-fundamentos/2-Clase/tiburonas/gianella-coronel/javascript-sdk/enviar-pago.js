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

import dotenv from 'dotenv';
dotenv.config();

const server = new Horizon.Server('https://horizon-testnet.stellar.org');
const networkPassphrase = Networks.TESTNET;

const SECRET_KEY = process.env.SECRET_KEY; // Tu secret key (es un secret key de prueba, de una billetera creada para este ejercicio)
//const DESTINATION = 'GCAJPMEFM3MSU3LLJIX4EUTAX5P5QWHNRENKYIYEUYVBE5EILBIZ6KGV'; // Cuenta destino
const DESTINATIONS = [
  {publicKey: "GB6UL6TO3SJGGMSTGCZIXSZGSULF7CZWVRTL6XPBDRNV4USXSX6FWSZN", memo: "Pago para Frida :)"},
  {publicKey: "GCAJPMEFM3MSU3LLJIX4EUTAX5P5QWHNRENKYIYEUYVBE5EILBIZ6KGV", memo: "Pago para Jenny :)"},
  {publicKey: "GBMHI3DL6MHV2AXZD6ZUN4H3Z2M4XNXWH6XQV4IRZNBW4HJXNO4LABJ2", memo: "Pago para Julieta :)"}
]

async function enviarPago(DESTINATION = '',amount, memo = '') {
  try {
    console.log('🚀 Iniciando pago...\n');
    
    // Paso 1: Cargar tu cuenta
    const sourceKeys = Keypair.fromSecret(SECRET_KEY);
    const sourceAccount = await server.loadAccount(sourceKeys.publicKey());
    
    console.log(`Balance actual: ${sourceAccount.balances[0].balance} XLM\n`);
    
    //Validar balance antes de enviar
    if (parseFloat(sourceAccount.balances[0].balance) < amount) {
      throw new Error('Balance insuficiente');
    }

    // Paso 2: Construir transacción
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
    
    // Paso 3: Firmar
    transaction.sign(sourceKeys);
    
    // Paso 4: Enviar
    const result = await server.submitTransaction(transaction);
    
    console.log('🎉 ¡PAGO EXITOSO!\n');
    console.log(`💰 Enviaste: ${amount} XLM`);
    console.log(`🔗 Hash: ${result.hash}\n`);
    
    return result;
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    throw error;
  }
}

async function enviarVariosPagos(destinatarios, amount) {
  for (let i = 0; i < destinatarios.length; i++) {
    const dest = destinatarios[i];
    const transactionId = Date.now() + i; // Timestamp único + índice
    const uniqueMemo = `TX-${transactionId}-${i + 1}/${destinatarios.length}`;
    
    await enviarPago(dest.publicKey, amount, uniqueMemo);
    console.log(`✅ Enviado a ${dest.publicKey} con memo: ${uniqueMemo}\n`);
  }
}

enviarVariosPagos(DESTINATIONS, '2');
//enviarPago('25', '¡Mi primer pago con código! 🚀');