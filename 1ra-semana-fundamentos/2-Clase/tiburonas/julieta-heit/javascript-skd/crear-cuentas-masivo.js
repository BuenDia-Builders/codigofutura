import { Keypair } from "@stellar/stellar-sdk";

console.log("=== CREACIÓN MASIVA DE CUENTAS ===\n");

// Array para guardar todas las cuentas
const cuentasCreadas = [];

// Función asíncrona para crear una cuenta
async function crearCuenta(numeroCuenta) {
  try {
    console.log(`Creando cuenta ${numeroCuenta}...`);

    // Generar par de llaves aleatorio
    const pair = Keypair.random();

    console.log(`Public Key: ${pair.publicKey()}`);
    console.log(`Secret Key: ${pair.secret()}`);

    // Fondear automáticamente con Friendbot
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${pair.publicKey()}`
    );
    const result = await response.json();

    if (result.successful || response.ok) {
      console.log("✓ Cuenta fondeada con 10,000 XLM");
      console.log(`Transaction Hash: ${result.hash}`);

      // Guardar información en el array
      cuentasCreadas.push({
        numero: numeroCuenta,
        publicKey: pair.publicKey(),
        secretKey: pair.secret(),
        balanceInicial: "10000 XLM",
        transactionHash: result.hash,
      });
    } else {
      console.log("✗ Error al fondear");
    }

    console.log("---\n");
  } catch (error) {
    console.error(`Error creando cuenta ${numeroCuenta}:`, error.message);
  }
}

// Función principal para crear múltiples cuentas
async function crearCuentasMasivas() {
  // Bucle para crear 5 cuentas
  for (let i = 1; i <= 5; i++) {
    await crearCuenta(i);
    // Pequeña pausa entre creaciones para no saturar Friendbot
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Mostrar resumen final
  console.log("\n=== RESUMEN DE CUENTAS CREADAS ===\n");
  cuentasCreadas.forEach((cuenta) => {
    console.log(`Cuenta ${cuenta.numero}:`);
    console.log(`  Public Key: ${cuenta.publicKey}`);
    console.log(`  Secret Key: ${cuenta.secretKey}`);
    console.log(`  Balance Inicial: ${cuenta.balanceInicial}`);
    console.log(`  TX Hash: ${cuenta.transactionHash}`);
    console.log("");
  });

  console.log("IMPORTANTE: Guardar estas llaves en un lugar seguro\n");
}

// Ejecutar
crearCuentasMasivas();
