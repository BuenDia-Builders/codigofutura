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
const sourceSecretKey = process.env.SECRET_KEY;
const destinationPublicKey = process.env.DESTINATION_KEY; // Public Key de destino-Gia

async function enviarPago(amount, memo = "") {
  try {
    console.log("Iniciando pago...");

    // Paso 1: Cargar la cuenta origen
    const sourceKeypair = Keypair.fromSecret(sourceSecretKey);
    const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

    console.log("Balance actual:", sourceAccount.balances);

    // Paso 2: Construir la transacción
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: networkPassphrase,
    })
      .addOperation(
        Operation.payment({
          destination: destinationPublicKey,
          asset: Asset.native(), // XLM
          amount: amount.toString(),
        })
      )
      .addMemo(memo ? Memo.text(memo) : Memo.none())
      .setTimeout(30)
      .build();

    // Paso 3: Firmar la transacción
    transaction.sign(sourceKeypair);

    // Paso 4: Enviar al servidor
    const result = await server.submitTransaction(transaction);

    console.log("¡Pago exitoso!");
    console.log("Enviaste:", amount, "XLM");
    console.log("Transaction Hash:", result.hash);
  } catch (error) {
    console.error("Error al enviar pago:", error);
  }
}

// Ejecutar: enviar 50 XLM con un memo
enviarPago("50", "Primer TX");
