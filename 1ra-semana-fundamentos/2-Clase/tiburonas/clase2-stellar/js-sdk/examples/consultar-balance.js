import { Horizon } from '@stellar/stellar-sdk';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });


const server = new Horizon.Server('https://horizon-testnet.stellar.org');
const PUBLIC_KEY = process.env.PUBLIC_KEY;

async function consultarBalance(publicKey) {
  try {
    console.log(`🔍 Consultando cuenta: ${publicKey.substring(0, 8)}...\n`);
    
    const account = await server.loadAccount(publicKey);
    
    console.log('╔═══════════════════════════════════╗');
    console.log('📊 INFORMACIÓN DE CUENTA');
    console.log('╚═══════════════════════════════════╝\n');
    
    console.log(`📧 Account ID:`);
    console.log(`   ${account.id}\n`);
    
    console.log(`🔢 Sequence Number:`);
    console.log(`   ${account.sequenceNumber()}\n`);
    
    console.log('╔═══════════════════════════════════╗');
    console.log('💰 BALANCES');
    console.log('╚═══════════════════════════════════╝\n');
    
    account.balances.forEach((balance, index) => {
      if (balance.asset_type === 'native') {
        console.log(`${index + 1}. 🌟 XLM (Lumens):`);
        console.log(`   Total: ${balance.balance} XLM`);
        
        const baseReserve = 0.5;
        const subentryReserve = account.subentry_count * 0.5;
        const totalReserve = baseReserve + subentryReserve;
        const available = parseFloat(balance.balance) - totalReserve;
        
        console.log(`   Bloqueado: ${totalReserve.toFixed(7)} XLM`);
        console.log(`   Disponible: ${available.toFixed(7)} XLM\n`);
      } else {
        console.log(`${index + 1}. 🪙 ${balance.asset_code}:`);
        console.log(`   Balance: ${balance.balance}`);
        console.log(`   Emisor: ${balance.asset_issuer.substring(0, 8)}...\n`);
      }
    });
    
    return account;
    
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

consultarBalance(PUBLIC_KEY);