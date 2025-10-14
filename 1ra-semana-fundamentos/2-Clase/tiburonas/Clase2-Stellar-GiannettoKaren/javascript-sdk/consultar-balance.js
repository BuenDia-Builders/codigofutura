import { Horizon } from "@stellar/stellar-sdk"; // Hay error con Server agrego Horizon.

import dotenv from "dotenv";
dotenv.config(); // Carga las variables del archivo .env

const server = new Horizon.Server("https://horizon-testnet.stellar.org");

const PUBLIC_KEY = process.env.PUBLIC_KEY; // Cuenta a consultar

// Array de cuentas a monitorear
const cuentas = [
  PUBLIC_KEY, // Mi cuenta creada en crear-cuenta.js
  "GA74ICXS227XU5SXFTZXQWNHWCTMUBJM2FCFXDAO3V2KTDH4E7WQWSS5", // Cuenta Liz
  "GC4NA75MPXPVZD26HMIWCG5GPZU4COFFAAHLLZ4DKAZFZS3XWIDZ35HJ", // Mi cuenta personal freighter
];

async function consultarCuenta(publicKey) {
  try {
    const cuenta = await server.loadAccount(publicKey);

    // Contar cuántos balances no son XLM → trustlines activas
    const trustlines = cuenta.balances.filter(
      (b) => b.asset_type !== "native"
    ).length;

    // Buscar balance XLM
    const balanceXLM = cuenta.balances.find(
      (b) => b.asset_type === "native"
    )?.balance;

    return {
      id: cuenta.id,
      balanceXLM,
      trustlines,
      sequence: cuenta.sequenceNumber(),
    };
  } catch (error) {
    if (error.response?.status === 404) {
      return {
        id: publicKey,
        error: "Cuenta no encontrada o no fondeada.",
      };
    } else {
      return {
        id: publicKey,
        error: error.message,
      };
    }
  }
}

async function monitorDeCuentas() {
  console.log("\n=== 🛰️ MONITOR DE CUENTAS ===\n");

  for (const key of cuentas) {
    const info = await consultarCuenta(key);

    console.log(`Cuenta: ${info.id.substring(0, 12)}...`);
    if (info.error) {
      console.log(`  ❌ Error: ${info.error}\n`);
      continue;
    }

    console.log(`  💰 Balance: ${info.balanceXLM} XLM`);
    console.log(`  🔗 Trustlines: ${info.trustlines}`);
    console.log(`  🔢 Sequence: ${info.sequence}\n`);
  }

  console.log("=== Fin del monitoreo ===\n");
}

monitorDeCuentas();
