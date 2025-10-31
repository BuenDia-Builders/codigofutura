// test/crear-cuentas.test.js
const CreadorCuentas = require('../crear-cuentas');
const { Keypair } = require('@stellar/stellar-sdk');

// Mock de fetch global
global.fetch = jest.fn();

describe('CreadorCuentas', () => {
  let creador;
  let mockKeypair;

  beforeEach(() => {
    creador = new CreadorCuentas();
    
    // Mock de Keypair
    mockKeypair = {
      publicKey: jest.fn().mockReturnValue('GDEXAMPLECUENTAPUBLICKEY123456789'),
      secret: jest.fn().mockReturnValue('SDEXAMPLESECRETKEY123456789ABCDEFGHIJK')
    };
    
    Keypair.random = jest.fn().mockReturnValue(mockKeypair);
    
    // Mock de console.log para no ensuciar los tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    creador.limpiarCuentas();
  });

  test('debería crear una instancia de CreadorCuentas', () => {
    expect(creador).toBeInstanceOf(CreadorCuentas);
    expect(creador.getCuentas()).toEqual([]);
  });

  test('debería generar keys válidas al crear cuentas', async () => {
    // Mock de respuesta exitosa de Friendbot
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ 
        successful: true, 
        hash: 'mock-transaction-hash-12345' 
      })
    });

    // Mock de setTimeout para que no espere realmente
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    const cuentas = await creador.crearCuentaMasiva(1);

    expect(Keypair.random).toHaveBeenCalled();
    expect(mockKeypair.publicKey).toHaveBeenCalled();
    expect(mockKeypair.secret).toHaveBeenCalled();
    
    // Verificar que se creó la cuenta correctamente
    expect(cuentas).toHaveLength(1);
    expect(cuentas[0].publicKey).toBe('GDEXAMPLECUENTAPUBLICKEY123456789');
    expect(cuentas[0].secretKey).toBe('SDEXAMPLESECRETKEY123456789ABCDEFGHIJK');
    expect(cuentas[0].balance).toBe('10000.0000000');
    
    jest.useRealTimers();
  });

  test('debería manejar errores de Friendbot correctamente', async () => {
    // Mock de respuesta fallida de Friendbot
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ 
        successful: false 
      })
    });

    const cuentas = await creador.crearCuentaMasiva(1);

    // Verificar que no se agregó la cuenta al array por el error
    expect(cuentas).toHaveLength(0);
  });

  test('debería crear múltiples cuentas', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ 
        successful: true, 
        hash: 'mock-transaction-hash-12345' 
      })
    });

    const numeroCuentas = 3;
    const cuentas = await creador.crearCuentaMasiva(numeroCuentas);

    expect(cuentas).toHaveLength(numeroCuentas);
    expect(Keypair.random).toHaveBeenCalledTimes(numeroCuentas);
    expect(global.fetch).toHaveBeenCalledTimes(numeroCuentas);
  });

  test('debería limpiar el array de cuentas correctamente', () => {
    creador.cuentas = [
      { numero: 1, publicKey: 'test1', secretKey: 'secret1' },
      { numero: 2, publicKey: 'test2', secretKey: 'secret2' }
    ];
    
    expect(creador.getCuentas()).toHaveLength(2);
    
    creador.limpiarCuentas();
    
    expect(creador.getCuentas()).toEqual([]);
    expect(creador.getCuentas()).toHaveLength(0);
  });
});