import { Horizon } from '@stellar/stellar-sdk';

const Server = Horizon.Server;
const server = new Server('https://horizon-testnet.stellar.org');

// ⚠️ SUSTITUYE con las PUBLIC KEYS que quieres monitorear
const cuentasAMonitorear = [
  "GABC...1", // Cuenta 1
  "GABC...2", // Cuenta 2
  "GABC...3", // Cuenta 3
  "GABC...4", // Cuenta 4
  "GABC...5"  // Cuenta 5
];

async function consultarCuenta(publicKey, numero) {
  try {
    const account = await server.loadAccount(publicKey);
    
    // Extraer información relevante
    const balance = account.balances.find(b => b.asset_type === 'native').balance;
    const trustlines = account.balances.length - 1; // -1 porque XLM nativo no es trustline
    const sequence = account.sequence;
    
    return {
      success: true,
      numero: numero,
      publicKey: publicKey,
      balance: parseFloat(balance),
      trustlines: trustlines,
      sequence: sequence,
      subentryCount: account.subentry_count
    };
    
  } catch (error) {
    return {
      success: false,
      numero: numero,
      publicKey: publicKey,
      error: error.message
    };
  }
}

async function monitorearBalances() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('              🔍 MONITOR DE CUENTAS STELLAR');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');
  
  console.log(`📊 Monitoreando ${cuentasAMonitorear.length} cuentas...\n`);
  console.log('═'.repeat(60));
  
  const resultados = [];
  let totalBalance = 0;
  let cuentasActivas = 0;
  
  // Consultar cada cuenta
  for (let i = 0; i < cuentasAMonitorear.length; i++) {
    console.log(`\n🔄 Consultando cuenta ${i + 1}/${cuentasAMonitorear.length}...`);
    
    const resultado = await consultarCuenta(cuentasAMonitorear[i], i + 1);
    resultados.push(resultado);
    
    if (resultado.success) {
      console.log(`✅ Cuenta encontrada`);
      totalBalance += resultado.balance;
      cuentasActivas++;
    } else {
      console.log(`❌ Error: ${resultado.error}`);
    }
    
    // Pequeño delay entre consultas
    if (i < cuentasAMonitorear.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  // Mostrar resultados detallados
  console.log('\n' + '═'.repeat(60));
  console.log('\n📋 RESULTADOS DETALLADOS:\n');
  
  resultados.forEach((resultado) => {
    if (resultado.success) {
      const reserva = 1 + (resultado.subentryCount * 0.5);
      const disponible = resultado.balance - reserva;
      
      console.log(`╔═══════════════════════════════════════════════════════════╗`);
      console.log(`  Cuenta ${resultado.numero}: ${resultado.publicKey.substring(0, 8)}...${resultado.publicKey.substring(resultado.publicKey.length - 4)}`);
      console.log(`╚═══════════════════════════════════════════════════════════╝`);
      console.log(`  💰 Balance Total:      ${resultado.balance.toFixed(7)} XLM`);
      console.log(`  🔒 Bloqueado (reserve): ${reserva.toFixed(7)} XLM`);
      console.log(`  ✅ Disponible:         ${disponible.toFixed(7)} XLM`);
      console.log(`  🔗 Trustlines activos: ${resultado.trustlines}`);
      console.log(`  📊 Subentries:         ${resultado.subentryCount}`);
      console.log(`  🔢 Sequence Number:    ${resultado.sequence}`);
      console.log(`  🔍 Explorer: https://stellar.expert/explorer/testnet/account/${resultado.publicKey}`);
      console.log('');
      
    } else {
      console.log(`╔═══════════════════════════════════════════════════════════╗`);
      console.log(`  ❌ Cuenta ${resultado.numero}: ERROR`);
      console.log(`╚═══════════════════════════════════════════════════════════╝`);
      console.log(`  📧 Public Key: ${resultado.publicKey.substring(0, 12)}...`);
      console.log(`  ⚠️  Error: ${resultado.error}`);
      console.log('');
    }
  });
  
  // Resumen global
  console.log('═'.repeat(60));
  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('                  📊 RESUMEN GLOBAL');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');
  console.log(`  ✅ Cuentas activas:     ${cuentasActivas}/${cuentasAMonitorear.length}`);
  console.log(`  ❌ Cuentas con error:   ${cuentasAMonitorear.length - cuentasActivas}`);
  console.log(`  💰 Balance total:       ${totalBalance.toFixed(7)} XLM`);
  console.log(`  📊 Balance promedio:    ${(totalBalance / cuentasActivas).toFixed(7)} XLM`);
  console.log(`  🔍 Cuentas monitoreadas: ${cuentasAMonitorear.length}`);
  console.log('');
  
  // Ranking de balances
  const cuentasOrdenadas = resultados
    .filter(r => r.success)
    .sort((a, b) => b.balance - a.balance);
  
  console.log('═'.repeat(60));
  console.log('\n🏆 RANKING DE BALANCES:\n');
  
  cuentasOrdenadas.forEach((cuenta, index) => {
    const medalla = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '  ';
    console.log(`${medalla} ${index + 1}. Cuenta ${cuenta.numero}: ${cuenta.balance.toFixed(7)} XLM`);
  });
  
  console.log('\n' + '═'.repeat(60));
  console.log('\n✅ Monitoreo completado!\n');
}

// Ejecutar
monitorearBalances();