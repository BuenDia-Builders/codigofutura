import { Keypair, Horizon } from "@stellar/stellar-sdk";

const server = new Horizon.Server("https://horizon-testnet.stellar.org");

async function crearCuentas() {
  const cuentas = [];
  
  console.log("🚀 Iniciando creación masiva de cuentas...\n");

  // Usar un bucle for para generar 5 keypairs
  for (let i = 1; i <= 5; i++) {
    console.log(`🔹 Creando cuenta ${i}...`);
    
    // Generar nuevo keypair
    const pair = Keypair.random();
    
    try {
      // Fondear con Friendbot
      const response = await fetch(`https://friendbot.stellar.org?addr=${pair.publicKey()}`);
      if (!response.ok) throw new Error("Error al fondear con Friendbot");
      
      // Obtener información de la cuenta
      const cuenta = await server.loadAccount(pair.publicKey());
      
      // Guardar toda la información en un array
      const datosCuenta = {
        numero: i,
        publicKey: pair.publicKey(),
        secretKey: pair.secret(),
        balance: cuenta.balances[0].balance
      };
      
      cuentas.push(datosCuenta);
      
      // Mostrar en consola: public key, secret key y balance inicial
      console.log(`   ✅ Public Key: ${datosCuenta.publicKey}`);
      console.log(`   🔐 Secret Key: ${datosCuenta.secretKey}`);
      console.log(`   💰 Balance inicial: ${datosCuenta.balance} XLM\n`);
      
    } catch (error) {
      console.error(`❌ Error creando cuenta ${i}:`, error.message);
    }
  }

  console.log("📋 Resumen de cuentas creadas:");
  console.log(cuentas);
  
  return cuentas;
}

crearCuentas().catch(console.error);
