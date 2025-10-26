import { Horizon } from '@stellar/stellar-sdk';
import dotenv from 'dotenv';
// Cargar desde el archivo .env
dotenv.config();

// Servidor Horizon para Testnet
const server = new Horizon.Server('https://horizon-testnet.stellar.org');


// Array de cuentas a monitorear
const cuentas = [
  process.env.PUBLIC_KEY, // creado en crear-cuenta.js
  'GDPEWAKMRZKP72BXTZGRKZET34LF3ZFC7WSGWJYO3XCU2KGEYGDUTSKO', // Cuenta de Freighter
  'GDWSCTESGJ3N35WKPN2WLQIWRHWIJ6PEOKT4F3TFXJA3GJ2APCXWDCJI' // Cuenta de Mariel
];


// Función para consultar balance de cuenta
async function consultAccount(publicKey) {
  try {  
    const account = await server.loadAccount(publicKey);
    console.log(`Cuenta: ${publicKey}`);

    // Número de trustlines
    const trustlines = account.balances.filter(b => b.asset_type !== 'native').length;
    // Balance de XLM
    const xlmBalanceObj = account.balances.find(b => b.asset_type === 'native')?.balance || '0';

    console.log(`   💰 Balance: ${parseFloat(xlmBalanceObj).toFixed(2)} XLM`);
    console.log(`   🔗 Trustlines: ${trustlines}`);
    console.log(`   🔢 Sequence: ${account.sequenceNumber()}\n`);
    console.log('-------------------------\n');
    } catch (error) {
    console.error(`❌ Error al consultar cuenta ${publicKey}:`, error.message);
  }
}
async function monitorearCuentas() {
    console.log('=== MONITOR DE CUENTAS ===\n');
    for (const pk of cuentas) {
        if (!pk) continue;
        await consultAccount(pk);
    }
}
monitorearCuentas();