import { Keypair } from '@stellar/stellar-sdk';

async function crearCuenta() {

  //Ejercicio 1: Creación Masiva de Cuentas (5)
  const cuentasCreadas = []

  for (let i = 1; i <= 5; i++) {
    // Generar llaves aleatorias
    const pair = Keypair.random();
    
    // Fondear con Friendbot
    try {
      const response = await fetch(
        `https://friendbot.stellar.org/?addr=${pair.publicKey()}`
      );
      
      const result = await response.json();
      
    } catch (error) {
      console.error('❌ Error al fondear:', error.message);
    }
    console.log(`✅ ¡Cuenta ${i} creada!\n`);
    console.log('📧 PUBLIC KEY (puedes compartir):');
    console.log(pair.publicKey());
    console.log('\n🔑 SECRET KEY (NUNCA COMPARTIR):');
    console.log(pair.secret());
    console.log('✅ ¡Balance inicial de 10,000 XLM!\n\n');
    
    // Guardar las cuentas creadas en el array
    cuentasCreadas.push({ publicKey: pair.publicKey(), secretKey: pair.secret(), initialBalance: '10,000 XLM' });
  }
}

crearCuenta();