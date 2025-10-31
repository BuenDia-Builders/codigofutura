// test/crear-cuentas-masivas.test.js
const { crearCuentaMasiva, limpiarCuentas, getCuentas, mostrarResumen } = require('../crear-cuentas-masivas');
const { Keypair } = require('@stellar/stellar-sdk');

// Mock de fetch global
global.fetch = jest.fn();

describe('crear-cuentas-masivas.js', () => {
  let mockKeypair;

  beforeEach(() => {
    // Mock de Keypair - CORREGIDO (son funciones, no propiedades)
    mockKeypair = {
      publicKey: jest.fn().mockReturnValue('GDEXAMPLECUENTAPUBLICKEY123456789'),
      secret: jest.fn().mockReturnValue('SDEXAMPLESECRETKEY123456789ABCDEFGHIJK')
    };
    
    Keypair.random = jest.fn().mockReturnValue(mockKeypair);
    
    // Mock de console.log para no ensuciar los tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // ✅ NUEVO: Mock de setTimeout para que se ejecute inmediatamente
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
      if (cb) cb();
    });
    
    // Limpiar cuentas antes de cada test
    limpiarCuentas();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers(); // ✅ Restaurar timers reales
    limpiarCuentas();
  });

  describe('crearCuentaMasiva', () => {
    test('debería crear el número correcto de cuentas', async () => {
      // Mock de respuesta exitosa de Friendbot
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ 
          successful: true, 
          hash: 'mock-transaction-hash-12345' 
        })
      });

      const numeroCuentas = 3;
      const cuentasCreadas = await crearCuentaMasiva(numeroCuentas);

      expect(Keypair.random).toHaveBeenCalledTimes(numeroCuentas);
      expect(global.fetch).toHaveBeenCalledTimes(numeroCuentas);
      expect(cuentasCreadas).toHaveLength(numeroCuentas);
    });

    test('debería generar keys válidas para cada cuenta', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ 
          successful: true, 
          hash: 'mock-transaction-hash-12345' 
        })
      });

      await crearCuentaMasiva(2);

      const cuentas = getCuentas();
      
      // Verificar que se llamaron las funciones mock
      expect(mockKeypair.publicKey).toHaveBeenCalled();
      expect(mockKeypair.secret).toHaveBeenCalled();
      
      // Verificar los valores
      expect(cuentas[0].publicKey).toBe('GDEXAMPLECUENTAPUBLICKEY123456789');
      expect(cuentas[0].secretKey).toBe('SDEXAMPLESECRETKEY123456789ABCDEFGHIJK');
      expect(cuentas[0].balance).toBe('10000.0000000');
      expect(cuentas[0].txHash).toBe('mock-transaction-hash-12345');
    });

    test('debería manejar errores de Friendbot correctamente', async () => {
      // Mock de respuesta fallida de Friendbot
      global.fetch.mockResolvedValue({
        ok: false,
        json: async () => ({ 
          successful: false 
        })
      });

      const cuentasCreadas = await crearCuentaMasiva(1);

      // Verificar que no se agregó la cuenta al array por el error
      expect(cuentasCreadas).toHaveLength(0);
    });

    test('debería manejar excepciones en fetch', async () => {
      // Mock de fetch que lanza error
      global.fetch.mockRejectedValue(new Error('Network error'));

      const cuentasCreadas = await crearCuentaMasiva(1);

      // En caso de excepción, no se agrega la cuenta
      expect(cuentasCreadas).toHaveLength(0);
    });
  });

  describe('limpiarCuentas', () => {
    test('debería limpiar todas las cuentas', async () => {
      // Primero creamos algunas cuentas
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ successful: true, hash: 'test-hash' })
      });

      await crearCuentaMasiva(2);
      expect(getCuentas()).toHaveLength(2);

      // Luego limpiamos
      limpiarCuentas();
      
      expect(getCuentas()).toHaveLength(0);
    });
  });

  describe('getCuentas', () => {
    test('debería devolver una copia del array de cuentas', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ successful: true, hash: 'test-hash' })
      });

      await crearCuentaMasiva(1);
      
      const cuentas1 = getCuentas();
      const cuentas2 = getCuentas();
      
      // Deberían ser arrays diferentes (copias)
      expect(cuentas1).not.toBe(cuentas2);
      expect(cuentas1).toEqual(cuentas2);
    });
  });

  describe('mostrarResumen', () => {
    test('debería mostrar el resumen sin errores', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ successful: true, hash: 'test-hash' })
      });

      await crearCuentaMasiva(1);
      
      // No debería lanzar error
      expect(() => mostrarResumen()).not.toThrow();
    });
  });
});