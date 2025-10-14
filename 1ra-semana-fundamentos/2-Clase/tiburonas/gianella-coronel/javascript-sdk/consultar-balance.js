import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://horizon-testnet.stellar.org');
//const PUBLIC_KEY = 'GBXXX...'; // Cuenta a consultar
const PUBLIC_KEYS = [
  'GB6UL6TO3SJGGMSTGCZIXSZGSULF7CZWVRTL6XPBDRNV4USXSX6FWSZN', // Frida
  'GCAJPMEFM3MSU3LLJIX4EUTAX5P5QWHNRENKYIYEUYVBE5EILBIZ6KGV', // Jenny
  'GBMHI3DL6MHV2AXZD6ZUN4H3Z2M4XNXWH6XQV4IRZNBW4HJXNO4LABJ2'  // Julieta
];

async function consultarBalance(publicKey) {
  try {    
    const account = await server.loadAccount(publicKey);
    
    console.log(`Cuenta:`);
    console.log(`   ${account.id}\n`);
    
    console.log('  💰 Balance:');
    
    account.balances.forEach((balance, index) => {
      if (balance.asset_type === 'native') {
        console.log(` ${balance.balance} XLM \n`);
        
        const baseReserve = 0.5;
        const subentryReserve = account.subentry_count * 0.5;
        const totalReserve = baseReserve + subentryReserve;
        const available = parseFloat(balance.balance) - totalReserve;
        
      } else {
        console.log(`${index + 1}. 🪙 ${balance.asset_code}:`);
        console.log(`   Balance: ${balance.balance}`);
        console.log(`   Emisor: ${balance.asset_issuer.substring(0, 8)}...\n`);
      }
    });
    
    // Mostrar cantidad de trustlines
    const trustlines = account.balances.filter(balance => balance.asset_type !== 'native');
    console.log(` 🔗 Trustlines: ${trustlines.length}\n`);

    console.log(` 🔢 Sequence:`);
    console.log(`   ${account.sequenceNumber()}\n`);
    
    
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('❌ Cuenta no encontrada');
      console.log('💡 Posibles causas:');
      console.log('   - La cuenta nunca fue creada/fondeada');
      console.log('   - Error de tipeo en la public key\n');
    } else {
      console.error('❌ Error:', error.message);
    }
    throw error;
  }
}

console.log('=== MONITOR DE CUENTAS ===\n');
for (const PUBLIC_KEY of PUBLIC_KEYS) {
  consultarBalance(PUBLIC_KEY);
}