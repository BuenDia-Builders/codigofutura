// crear-cuentas.js
const { Keypair } = require('@stellar/stellar-sdk');

class CreadorCuentas {
  constructor() {
    this.cuentas = [];
  }

  async crearCuentaMasiva(numeroCuentas = 5) {
    console.log('🔐 CREACIÓN MASIVA DE CUENTAS\n');
    console.log('═'.repeat(50));
    
    for (let i = 1; i <= numeroCuentas; i++) {
      console.log(`\n📍 Creando cuenta ${i}...`);
      
      // Generar par de llaves
      const pair = Keypair.random();
      
      console.log(`✅ Par de llaves generado`);
      console.log(`📧 PUBLIC KEY: ${pair.publicKey()}`);
      console.log(`🔑 SECRET KEY: ${pair.secret()}`);
      
      // Fondear con Friendbot
      console.log(`💰 Fondeando con Friendbot...`);
      
      try {
        const response = await fetch(
          `https://friendbot.stellar.org/?addr=${pair.publicKey()}`
        );
        
        const result = await response.json();
        
        if (result.successful || response.ok) {
          console.log(`✅ Cuenta ${i} fondeada: 10,000 XLM`);
          console.log(`🔗 TX Hash: ${result.hash}`);
          
          // Guardar información en el array
          this.cuentas.push({
            numero: i,
            publicKey: pair.publicKey(),
            secretKey: pair.secret(),
            balance: '10000.0000000',
            txHash: result.hash
          });
          
        } else {
          console.log(`❌ Error al fondear cuenta ${i}`);
        }
        
        // Delay de 2 segundos entre las creaciones para evitar rate limit
        if (i < numeroCuentas) {
          console.log(`⏳ Esperando 2 segundos...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
      } catch (error) {
        console.error(`❌ Error en cuenta ${i}:`, error.message);
      }
      
      console.log('─'.repeat(50));
    }
    
    this.mostrarResumen();
    return this.cuentas;
  }

  mostrarResumen() {
    console.log('\n╔═══════════════════════════════════════════════╗');
    console.log('       📊 RESUMEN DE CUENTAS CREADAS');
    console.log('╚═══════════════════════════════════════════════╝\n');
    
    this.cuentas.forEach((cuenta) => {
      console.log(`Cuenta ${cuenta.numero}:`);
      console.log(`  📧 Public:  ${cuenta.publicKey}`);
      console.log(`  🔑 Secret:  ${cuenta.secretKey}`);
      console.log(`  💰 Balance: ${cuenta.balance} XLM`);
      console.log(`  🔗 TX:      ${cuenta.txHash}`);
      console.log('');
    });
    
    console.log(`✅ Total creadas: ${this.cuentas.length} cuentas\n`);
    console.log('⚠️  IMPORTANTE: Guarda estas llaves en un lugar seguro!\n');
  }

  getCuentas() {
    return this.cuentas;
  }

  limpiarCuentas() {
    this.cuentas = [];
  }
}

// Para uso directo del script
if (require.main === module) {
  const creador = new CreadorCuentas();
  creador.crearCuentaMasiva();
}

module.exports = CreadorCuentas;