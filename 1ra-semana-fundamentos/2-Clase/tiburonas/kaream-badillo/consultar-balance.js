import { Horizon } from "@stellar/stellar-sdk";

const server = new Horizon.Server("https://horizon-testnet.stellar.org");

// PASO 1: Copiar estas direcciones del ejercicio 1 (crear-cuenta.js)
// Array de public keys de las 5 cuentas creadas anteriormente
const cuentas = [
  "TU_PUBLIC_KEY_CUENTA_1", // Cuenta 1 (emisora)
  "TU_PUBLIC_KEY_CUENTA_2", // Cuenta 2 
  "TU_PUBLIC_KEY_CUENTA_3", // Cuenta 3
  "TU_PUBLIC_KEY_CUENTA_4", // Cuenta 4
  "TU_PUBLIC_KEY_CUENTA_5"  // Cuenta 5
];

async function consultarBalances() {
  console.log("=== MONITOR DE CUENTAS ===");
  
  for (const publicKey of cuentas) {
    try {
      // Cargar información de la cuenta
      const cuenta = await server.loadAccount(publicKey);
      
      // Obtener balance de XLM (native asset)
      const balanceXLM = cuenta.balances.find(b => b.asset_type === "native").balance;
      
      // Contar trustlines activos (excluyendo XLM nativo)
      const trustlines = cuenta.balances.length - 1;
      
      // Obtener sequence number actual
      const sequenceNumber = cuenta.sequence;
      
      // Formatear la salida de manera legible (formato exacto requerido)
      console.log(`Cuenta: ${publicKey}`);
      console.log(`  Balance: ${parseFloat(balanceXLM).toFixed(2)} XLM`);
      console.log(`  Trustlines: ${trustlines}`);
      console.log(`  Sequence: ${sequenceNumber}`);
      console.log(); // Línea vacía entre cuentas
      
    } catch (error) {
      console.error(`❌ Error consultando cuenta ${publicKey}:`, error.message);
      console.log(); // Línea vacía entre cuentas
    }
  }
}

consultarBalances().catch(console.error);
