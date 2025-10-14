import dotenv from "dotenv";
dotenv.config(); // Carga las variables del archivo .env

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

const server = new Horizon.Server("https://horizon-testnet.stellar.org");
const networkPassphrase = Networks.TESTNET;

const SECRET_KEY = process.env.SECRET_KEY; // Mi secret key (cuenta fuente) traida desde .env

// Lista de destinatarios
const destinatarios = [
  {
    publicKey: "GA74ICXS227XU5SXFTZXQWNHWCTMUBJM2FCFXDAO3V2KTDH4E7WQWSS5",
    memo: "Pago-001-HolaLiz",
  },
  {
    publicKey: "GA74ICXS227XU5SXFTZXQWNHWCTMUBJM2FCFXDAO3V2KTDH4E7WQWSS5",
    memo: "Pago-002-HolaLiz2",
  },
  {
    publicKey: "GA74ICXS227XU5SXFTZXQWNHWCTMUBJM2FCFXDAO3V2KTDH4E7WQWSS5",
    memo: "Pago-003-HolaLiz3",
  },
];

async function enviarPago(amount, destino, memo) {
  try {
    console.log(`\n🚀 Iniciando pago a ${destino} con memo "${memo}"...\n`);

    // 1️⃣ Cargar cuenta fuente
    const sourceKeys = Keypair.fromSecret(SECRET_KEY);
    const sourceAccount = await server.loadAccount(sourceKeys.publicKey());

    console.log(`Balance actual: ${sourceAccount.balances[0].balance} XLM`);

    // 2️⃣ Construir transacción
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase,
    })
      .addOperation(
        Operation.payment({
          destination: destino,
          asset: Asset.native(),
          amount: amount.toString(),
        })
      )
      .addMemo(Memo.text(memo))
      .setTimeout(30)
      .build();

    // 3️⃣ Firmar y enviar
    transaction.sign(sourceKeys);
    const result = await server.submitTransaction(transaction);

    // 4️⃣ Confirmación
    console.log("🎉 ¡PAGO EXITOSO!");
    console.log(`💰 Enviado: ${amount} XLM`);
    console.log(`📤 Destinatario: ${destino}`);
    console.log(`🔗 Hash: ${result.hash}\n`);

    return true; // Indica éxito
  } catch (error) {
    console.error(`❌ Error en pago a ${destino}:`, error.message);
    return false; // Indica fallo
  }
}

// Sistema automatizado donde uso la función enviarPago
async function sistemaDePagos() {
  const monto = 2;

  for (const { publicKey, memo } of destinatarios) {
    const exito = await enviarPago(monto, publicKey, memo);

    if (!exito) {
      console.log(`⚠️ Interrumpido: error al enviar a ${publicKey}`);
      break; // Detiene si hay un error
    }

    // pequeño delay entre pagos
    await new Promise((r) => setTimeout(r, 3000));
  }

  console.log("\n✅ Todos los pagos procesados.");
}

// Ejecuto el sistema de pagos
sistemaDePagos();
