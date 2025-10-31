// Script para enviar pagos en XML

// Importaciones
import dotenv from 'dotenv';
dotenv.config();

import { Keypair, Horizon, TransactionBuilder, Networks,Operation, Asset, BASE_FEE, Memo } from "stellar-sdk";

//Conectar a servidor Horizon de Tesnet
const server = new Horizon.Server('https://horizon-testnet.stellar.org');

// Identifica la red
const networkPassphrase = Networks.TESTNET;

const SECRET_KEY = process.env.SECRET_KEY; // cuenta que envia los xml
const DESTINATION = process.env.PUBLICKEY; // cuenta que recibe los xml

async function enviarPago(amount, memo = '') {
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

enviarPago('25', 'Sent!');