import {
  Keypair,
  Horizon,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  BASE_FEE,
  Memo,
} from "@stellar/stellar-sdk";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// Crear servidor Horizon para Testnet
const server = new Horizon.Server("https://horizon-testnet.stellar.org");

// Configurar red
const networkPassphrase = Networks.TESTNET;

// TUS CREDENCIALES (NO SUBIR A GITHUB)
const sourceSecretKey = process.env.SECRET_KEY; // Tu Secret Key

// Array de destinatarios
const destinatarios = [
  {
    publicKey: "GCAJPMEFM3MSU3LLJIX4EUTAX5P5QWHNRENKYIYEUYVBE5EILBIZ6KGV",
    memo: "Pago-001",
  }, //jenny
  {
    publicKey: "GDNDHUKX3WG66DLJOI6RVNGA7RXIPHXF2ULOTI3KTX63VO42KCJUVCHE",
    memo: "Pago-002",
  }, //gia
  {
    publicKey: "GB6UL6TO3SJGGMSTGCZIXSZGSULF7CZWVRTL6XPBDRNV4USXSX6FWSZN",
    memo: "Pago-003",
  }, //frida
];

// Función para enviar un pago individual
async function enviarPago(destinatario, numeroPago) {
  try {
    console.log(`\n=== Enviando pago ${numeroPago} ===`);
    console.log(`Destino: ${destinatario.publicKey}`);
    console.log(`Memo: ${destinatario.memo}`);

    // Paso 1: Cargar la cuenta origen
    const sourceKeypair = Keypair.fromSecret(sourceSecretKey);
    const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

    // Paso 2: Construir la transacción
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: networkPassphrase,
    })
      .addOperation(
        Operation.payment({
          destination: destinatario.publicKey,
          asset: Asset.native(), // XLM
          amount: "2", // 2 XLM
        })
      )
      .addMemo(Memo.text(destinatario.memo))
      .setTimeout(30)
      .build();

    // Paso 3: Firmar la transacción
    transaction.sign(sourceKeypair);

    // Paso 4: Enviar al servidor
    const result = await server.submitTransaction(transaction);

    console.log("✓ Pago exitoso");
    console.log(`Monto enviado: 2 XLM`);
    console.log(`Transaction Hash: ${result.hash}`);

    return { success: true, hash: result.hash };
  } catch (error) {
    console.error("✗ Error al enviar pago:", error.message);
    return { success: false, error: error.message };
  }
}

// Función principal para enviar pagos masivos
async function enviarPagosMasivos() {
  console.log("=== SISTEMA DE PAGOS AUTOMATIZADO ===");
  console.log(`Total de pagos a realizar: ${destinatarios.length}\n`);

  const resultados = [];

  // Enviar pago a cada destinatario
  for (let i = 0; i < destinatarios.length; i++) {
    const resultado = await enviarPago(destinatarios[i], i + 1);
    resultados.push({
      destinatario: destinatarios[i],
      ...resultado,
    });

    // Pequeña pausa entre transacciones
    if (i < destinatarios.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  // Mostrar resumen final
  console.log("\n\n=== RESUMEN DE TRANSACCIONES ===");
  resultados.forEach((resultado, index) => {
    console.log(`\nPago ${index + 1}:`);
    console.log(`  Destino: ${resultado.destinatario.publicKey}`);
    console.log(`  Memo: ${resultado.destinatario.memo}`);
    console.log(`  Estado: ${resultado.success ? "✓ Exitoso" : "✗ Fallido"}`);
    if (resultado.success) {
      console.log(`  Hash: ${resultado.hash}`);
    } else {
      console.log(`  Error: ${resultado.error}`);
    }
  });

  const exitosos = resultados.filter((r) => r.success).length;
  console.log(`\n\nTotal exitosos: ${exitosos}/${destinatarios.length}`);
}

// Ejecutar
enviarPagosMasivos();
