// test/stellar-basic.test.js
const { Keypair } = require('@stellar/stellar-sdk');

describe('Stellar SDK Basic Tests', () => {
  test('Debe generar un par de llaves válido', () => {
    const pair = Keypair.random();
    
    // Verificar que la llave pública empieza con 'G'
    expect(pair.publicKey()).toMatch(/^G/);
    
    // Verificar que la llave secreta empieza con 'S'
    expect(pair.secret()).toMatch(/^S/);
    
    // Verificar longitudes
    expect(pair.publicKey()).toHaveLength(56);
    expect(pair.secret()).toHaveLength(56);
  });

  test('Debe poder recrear un Keypair desde la llave secreta', () => {
    const originalPair = Keypair.random();
    const secret = originalPair.secret();
    
    // Recrear desde la llave secreta
    const recreatedPair = Keypair.fromSecret(secret);
    
    // Deben ser iguales
    expect(recreatedPair.publicKey()).toBe(originalPair.publicKey());
    expect(recreatedPair.secret()).toBe(originalPair.secret());
  });

  test('Debe lanzar error con llave secreta inválida', () => {
    expect(() => {
      Keypair.fromSecret('INVALID_SECRET_KEY');
    }).toThrow();
  });
});