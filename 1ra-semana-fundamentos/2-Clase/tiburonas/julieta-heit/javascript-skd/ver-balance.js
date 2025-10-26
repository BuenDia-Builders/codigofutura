import { Horizon } from "@stellar/stellar-sdk";

// Servidor
const server = new Horizon.Server("https://horizon-testnet.stellar.org");

// Public Key a consultar
const publicKey = "GBMHI3DL6MHV2AXZD6ZUN4H3Z2M4XNXWH6XQV4IRZNBW4HJXNO4LABJ2";

// Función para consultar balance
async function consultarBalance() {
  console.log("Consultando cuenta...");

  try {
    // Cargar información de la cuenta
    const account = await server.loadAccount(publicKey);

    console.log("Account ID:", account.account_id);
    console.log("Account Sequence Number:", account.sequence);

    console.log("\n=== BALANCES ===");

    // Iterar sobre cada balance
    account.balances.forEach((balance, index) => {
      if (balance.asset_type === "native") {
        const reserva = 0.5; // Mínimo requerido
        const disponible = parseFloat(balance.balance) - reserva;

        console.log(`\nBalance ${index + 1}:`);
        console.log("  Tipo: XLM (nativo)");
        console.log("  Balance total:", balance.balance, "XLM");
        console.log("  Reserva (bloqueada):", reserva, "XLM");
        console.log("  Disponible para enviar:", disponible.toFixed(7), "XLM");
      }
    });
  } catch (error) {
    if (error.response) {
      console.error("Cuenta no encontrada. Posibles causas:");
      console.error("- La cuenta nunca fue creada o fondeada");
      console.error("- Error de tipeo en la Public Key");
    } else {
      console.error("Error:", error.message);
    }
  }
}

// Ejecutar
consultarBalance();
