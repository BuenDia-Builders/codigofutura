import { Horizon } from "@stellar/stellar-sdk";

// Servidor
const server = new Horizon.Server("https://horizon-testnet.stellar.org");

// Array de Public Keys a monitorear
const cuentasAMonitorear = [
  "GCAJPMEFM3MSU3LLJIX4EUTAX5P5QWHNRENKYIYEUYVBE5EILBIZ6KGV",
  "GDNDHUKX3WG66DLJOI6RVNGA7RXIPHXF2ULOTI3KTX63VO42KCJUVCHE",
  "GB6UL6TO3SJGGMSTGCZIXSZGSULF7CZWVRTL6XPBDRNV4USXSX6FWSZN",
];

// Función para consultar balance de una cuenta
async function consultarCuenta(publicKey) {
  try {
    // Cargar información de la cuenta
    const account = await server.loadAccount(publicKey);

    // Extraer balance de XLM
    const xlmBalance = account.balances.find((b) => b.asset_type === "native");
    const balanceXLM = xlmBalance
      ? parseFloat(xlmBalance.balance).toFixed(2)
      : "0.00";

    // Contar trustlines (todas las líneas que no sean nativas)
    const trustlines = account.balances.filter(
      (b) => b.asset_type !== "native"
    ).length;

    // Sequence number
    const sequenceNumber = account.sequence;

    return {
      success: true,
      publicKey: publicKey,
      balanceXLM: balanceXLM,
      trustlines: trustlines,
      sequenceNumber: sequenceNumber,
    };
  } catch (error) {
    return {
      success: false,
      publicKey: publicKey,
      error: error.message,
    };
  }
}

// Función principal para monitorear múltiples cuentas
async function monitoreoCuentas() {
  console.log("=== MONITOR DE CUENTAS ===\n");

  for (let i = 0; i < cuentasAMonitorear.length; i++) {
    const publicKey = cuentasAMonitorear[i];
    console.log(`Consultando cuenta ${i + 1}...`);

    const resultado = await consultarCuenta(publicKey);

    if (resultado.success) {
      console.log(`Cuenta: ${resultado.publicKey}`);
      console.log(`  Balance: ${resultado.balanceXLM} XLM`);
      console.log(`  Trustlines: ${resultado.trustlines}`);
      console.log(`  Sequence: ${resultado.sequenceNumber}`);
    } else {
      console.log(`Cuenta: ${resultado.publicKey}`);
      console.log(`  ✗ Error: ${resultado.error}`);
    }

    console.log("");
  }

  console.log("=== FIN DEL MONITOREO ===");
}

// Ejecutar
monitoreoCuentas();
