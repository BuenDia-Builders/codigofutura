import { Keypair } from "@stellar/stellar-sdk";
import fs from "fs/promises";

function isPublicKeyValid(key) {
  return key.startsWith("G") && key.length === 56;
}

function createMultipleAccounts(numAccounts) {
  const accounts = [];
  for (let i = 0; i < numAccounts; i++) {
    const pair = Keypair.random();
    if(!isPublicKeyValid(pair.publicKey())) {
      throw new Error("Clave pública inválida generada");
    }
    console.log(`Cuenta ${i + 1}: ${pair.publicKey()}`);
    accounts.push({ publicKey: pair.publicKey(), secretKey: pair.secret() });
  }
  return accounts;
}

async function saveAccountsToFile(accounts) {
  try {
    await fs.writeFile("cuentas.json", JSON.stringify(accounts, null, 2));
    console.log("Cuentas guardadas en cuentas.json");
  } catch (error) {
    console.error("Error al guardar cuentas:", error);
  }
}

const NUM_ACCOUNTS = 5;
const accounts = createMultipleAccounts(NUM_ACCOUNTS);
saveAccountsToFile(accounts);