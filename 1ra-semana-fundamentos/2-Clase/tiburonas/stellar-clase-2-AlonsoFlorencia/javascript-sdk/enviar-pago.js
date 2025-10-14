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
dotenv.config();
// TUS CREDENCIALES (NO SUBIR A GITHUB)
const sourceSecretKey = process.env.SECRET_KEY;
const destinationPublicKey = process.env.DESTINATION_KEY;

// Crear servidor Horizon para Testnet
const server = new Horizon.Server("https://horizon-testnet.stellar.org");

// Configurar red
const networkPassphrase = Networks.TESTNET;

// Función para acortar public keys
function short(pk) {
  return `${pk.slice(0, 6)}...${pk.slice(-6)}`;
}

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

// Lista de destinatarios y memos únicos
const destinatarios = [
  {
    publicKey: "GBSPYVFC4M24VQ33DGDHWPTABOA24EVXGVGXSWPJ5LZLNLDVB33GATRN",
    memo: "Pago-001",
  },
  {
    publicKey: "GD4PFXSBMC2KBI2UJQYGTYQVY5O6HVLYPLMWT6LPCTCQMZXU23DJMPU2",
    memo: "Pago-002",
  },
  {
    publicKey: "GBQAY5UMIDBBU6EXLLTPTOU5MF2ITVI5EYWAGUHTIK26MFGGSW3LRSQ7",
    memo: "Pago-003",
  },
];

// Función principal - pagos múltiples
async function enviarPagos() {
  console.log("🚀 Iniciando sistema de pagos automatizado...\n");

  for (const [i, destino] of destinatarios.entries()) {
    try {
      console.log(`💸 Enviando pago ${i + 1} a ${short(destino.publicKey)}...`);

      const sourceKeypair = Keypair.fromSecret(sourceSecretKey);
      const cuenta = await server.loadAccount(sourceKeypair.publicKey());

      const transaccion = new TransactionBuilder(cuenta, {
        fee: BASE_FEE,
        networkPassphrase,
      })
        .addOperation(
          Operation.payment({
            destination: destino.publicKey,
            asset: Asset.native(),
            amount: "2",
          })
        )
        .addMemo(Memo.text(destino.memo))
        .setTimeout(30)
        .build();

      transaccion.sign(sourceKeypair);
      const resultado = await server.submitTransaction(transaccion);

      console.log(`✅ Pago ${i + 1} exitoso`);
      console.log(`🔗 Hash: ${resultado.hash}\n`);
    } catch (error) {
      console.error(`⚠️ Error al enviar pago ${i + 1}:`, error.message);
      break;
    }
  }

  console.log("🏁 Sistema de pagos completado.");
}

// Ejecutar función principal
enviarPagos();
