import { Keypair } from "@stellar/stellar-sdk";

console.log("Generando tu nuevo par de llaves...");

// Función asíncrona para crear cuenta
async function crearCuenta() {
  // Generar par de llaves aleatorio
  const pair = Keypair.random();

  console.log("¡Cuenta creada!");
  console.log("Public Key:", pair.publicKey());
  console.log("Secret Key (NUNCA COMPARTIR):", pair.secret());

  // Fondear automáticamente con Friendbot
  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${pair.publicKey()}`
    );
    const result = await response.json();

    if (result.successful || response.ok) {
      console.log("¡Cuenta fondeada con 10,000 XLM!");
      console.log("Transaction Hash:", result.hash);
    } else {
      console.log("Error al fondear");
    }
  } catch (error) {
    console.error("Error:", error);
  }

  console.log("IMPORTANTE: Guardar estas llaves en un lugar seguro");
}

// Ejecutar la función
crearCuenta();
