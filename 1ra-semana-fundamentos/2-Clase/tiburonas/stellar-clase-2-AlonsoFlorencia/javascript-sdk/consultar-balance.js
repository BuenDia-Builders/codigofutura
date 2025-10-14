import { Horizon } from "@stellar/stellar-sdk";

// Servidor Horizon para Testnet
const server = new Horizon.Server("https://horizon-testnet.stellar.org");

// Función para acortar public keys
function short(pk) {
  return `${pk.slice(0, 6)}...${pk.slice(-6)}`;
}

// Array de public keys a monitorear
const cuentasAMonitorear = [
  "GBSPYVFC4M24VQ33DGDHWPTABOA24EVXGVGXSWPJ5LZLNLDVB33GATRN",
  "GD4PFXSBMC2KBI2UJQYGTYQVY5O6HVLYPLMWT6LPCTCQMZXU23DJMPU2",
  "GBQAY5UMIDBBU6EXLLTPTOU5MF2ITVI5EYWAGUHTIK26MFGGSW3LRSQ7",
];

// Función para consultar una cuenta individual
async function consultarCuenta(publicKey) {
  try {
    const account = await server.loadAccount(publicKey);

    // Obtener balance de XLM (asset nativo)
    const balanceXLM = account.balances.find(
      (balance) => balance.asset_type === "native"
    );
    const balance = balanceXLM ? parseFloat(balanceXLM.balance) : 0;

    // Contar trustlines activos (assets no nativos)
    const trustlines = account.balances.filter(
      (balance) => balance.asset_type !== "native"
    );
    const numeroTrustlines = trustlines.length;

    // Obtener sequence number
    const sequence = account.sequence;

    return {
      publicKey,
      balance,
      trustlines: numeroTrustlines,
      sequence,
    };
  } catch (error) {
    return {
      publicKey,
      error: error.message,
    };
  }
}

// Función principal del monitor
async function monitorDeBalances() {
  console.log("=== MONITOR DE CUENTAS ===");

  for (const publicKey of cuentasAMonitorear) {
    const resultado = await consultarCuenta(publicKey);

    if (resultado.error) {
      console.log(`Cuenta: ${short(publicKey)}`);
      console.log(`  Error: ${resultado.error}`);
    } else {
      console.log(`Cuenta: ${short(publicKey)}`);
      console.log(`  Balance: ${resultado.balance.toFixed(2)} XLM`);
      console.log(`  Trustlines: ${resultado.trustlines}`);
      console.log(`  Sequence: ${resultado.sequence}`);
    }
    console.log(); // Línea en blanco
  }
}

// Ejecutar el monitor
monitorDeBalances();
