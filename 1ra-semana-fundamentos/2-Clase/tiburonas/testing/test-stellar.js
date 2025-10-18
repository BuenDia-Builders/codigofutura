// test/test-stellar.js
const { Keypair } = require("@stellar/stellar-sdk");

console.log("🎉 ¡Hola Mundo Stellar!");

// Test simple para que prueben que corra
const pair = Keypair.random();

console.log("✅ Llave pública generada:", pair.publicKey().slice(0, 10) + "...");
console.log("✅ Test básico completado!");