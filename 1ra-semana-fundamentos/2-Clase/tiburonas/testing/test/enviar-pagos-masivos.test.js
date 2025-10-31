// test/enviar-pagos-masivos.test.js
const { EnviadorPagos } = require('../enviar-pagos-masivos');

// Mock completo de Stellar SDK
jest.mock('@stellar/stellar-sdk', () => {
  const mockKeypair = {
    publicKey: jest.fn().mockReturnValue('GFUENTE123456789'),
    secret: jest.fn().mockReturnValue('SBSECRET123')
  };

  const mockTransaction = {
    sign: jest.fn()
  };

  const mockTransactionBuilder = {
    addOperation: jest.fn().mockReturnThis(),
    addMemo: jest.fn().mockReturnThis(),
    setTimeout: jest.fn().mockReturnThis(),
    build: jest.fn().mockReturnValue(mockTransaction)
  };

  return {
    Keypair: {
      fromSecret: jest.fn().mockReturnValue(mockKeypair),
      random: jest.fn().mockReturnValue(mockKeypair)
    },
    TransactionBuilder: jest.fn(() => mockTransactionBuilder),
    Networks: {
      TESTNET: 'Test SDF Network ; September 2015'
    },
    Operation: {
      payment: jest.fn().mockReturnValue({})
    },
    Asset: {
      native: jest.fn().mockReturnValue({})
    },
    BASE_FEE: '100',
    Memo: {
      text: jest.fn().mockReturnValue({})
    },
    Horizon: {
      Server: jest.fn()
    }
  };
});

const { 
  Keypair, 
  TransactionBuilder, 
  Networks, 
  Operation, 
  Asset, 
  BASE_FEE, 
  Memo,
  Horizon 
} = require('@stellar/stellar-sdk');

describe('EnviadorPagos', () => {
  let enviador;
  let mockServer;
  let mockSourceKeys;
  let mockSourceAccount;
  let mockTransactionBuilder;
  let mockTransaction;

  const destinatarios = [
    { publicKey: "GDESTINO1", memo: "Pago-001" },
    { publicKey: "GDESTINO2", memo: "Pago-002" },
    { publicKey: "GDESTINO3", memo: "Pago-003" }
  ];

  beforeEach(() => {
    // Mock de Server
    mockServer = {
      loadAccount: jest.fn(),
      submitTransaction: jest.fn()
    };
    Horizon.Server.mockImplementation(() => mockServer);

    // Obtener el mock de Keypair
    mockSourceKeys = Keypair.fromSecret();
    
    // Mock de Account
    mockSourceAccount = {
      balances: [{ balance: '1000.0000000' }],
      sequence: '123456789' // Necesario para TransactionBuilder
    };

    // Mock de TransactionBuilder
    mockTransactionBuilder = TransactionBuilder();
    mockTransaction = mockTransactionBuilder.build();

    // Mock de console.log y console.error
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Mock de setTimeout
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
      if (cb) cb();
      return { unref: () => {} };
    });

    // Crear instancia de EnviadorPagos
    enviador = new EnviadorPagos('SBSECRET123', destinatarios, 'https://horizon-testnet.stellar.org');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe('constructor', () => {
    test('debería crear una instancia con los parámetros correctos', () => {
      expect(enviador.secretKey).toBe('SBSECRET123');
      expect(enviador.destinatarios).toEqual(destinatarios);
      expect(enviador.pagosExitosos).toBe(0);
      expect(enviador.totalEnviado).toBe(0);
    });
  });

  describe('enviarPagosMasivos', () => {
    test('debería enviar pagos exitosamente', async () => {
      // Configurar mocks para éxito
      mockServer.loadAccount
        .mockResolvedValueOnce(mockSourceAccount) // Cuenta inicial
        .mockResolvedValueOnce(mockSourceAccount) // Recarga 1
        .mockResolvedValueOnce(mockSourceAccount) // Recarga 2
        .mockResolvedValueOnce(mockSourceAccount) // Recarga 3
        .mockResolvedValueOnce({ balances: [{ balance: '994.0000000' }] }); // Balance final

      mockServer.submitTransaction
        .mockResolvedValueOnce({ hash: 'hash1' })
        .mockResolvedValueOnce({ hash: 'hash2' })
        .mockResolvedValueOnce({ hash: 'hash3' });

      const resultado = await enviador.enviarPagosMasivos();

      expect(resultado.pagosExitosos).toBe(3);
      expect(resultado.totalEnviado).toBe(6);
      expect(resultado.totalPagos).toBe(3);
      expect(mockServer.submitTransaction).toHaveBeenCalledTimes(3);
    });

    test('debería manejar errores en pagos individuales', async () => {
      mockServer.loadAccount
        .mockResolvedValueOnce(mockSourceAccount) // Cuenta inicial
        .mockResolvedValueOnce(mockSourceAccount) // Recarga 1
        .mockResolvedValueOnce(mockSourceAccount) // Recarga 2
        .mockResolvedValueOnce(mockSourceAccount) // Recarga 3
        .mockResolvedValueOnce({ balances: [{ balance: '996.0000000' }] }); // Balance final

      mockServer.submitTransaction
        .mockResolvedValueOnce({ hash: 'hash1' })
        .mockRejectedValueOnce(new Error('Error en transacción'))
        .mockResolvedValueOnce({ hash: 'hash3' });

      const resultado = await enviador.enviarPagosMasivos();

      expect(resultado.pagosExitosos).toBe(2);
      expect(resultado.totalEnviado).toBe(4);
      expect(mockServer.submitTransaction).toHaveBeenCalledTimes(3);
    });

    test('debería manejar error al cargar cuenta inicial', async () => {
      mockServer.loadAccount.mockRejectedValue(new Error('Error de red'));

      await expect(enviador.enviarPagosMasivos()).rejects.toThrow('Error de red');
    });
  });

  describe('enviarPagoIndividual', () => {
    test('debería enviar pago individual exitosamente', async () => {
      mockServer.loadAccount.mockResolvedValue(mockSourceAccount);
      mockServer.submitTransaction.mockResolvedValue({ hash: 'test-hash' });

      const destino = { publicKey: 'GDESTINO', memo: 'Test' };
      const resultado = await enviador.enviarPagoIndividual(mockSourceKeys, destino, 0);

      expect(resultado).toBe(true);
      expect(mockServer.submitTransaction).toHaveBeenCalledWith(mockTransaction);
    });

    test('debería manejar error en pago individual', async () => {
      mockServer.loadAccount.mockResolvedValue(mockSourceAccount);
      mockServer.submitTransaction.mockRejectedValue(new Error('Fondos insuficientes'));

      const destino = { publicKey: 'GDESTINO', memo: 'Test' };
      const resultado = await enviador.enviarPagoIndividual(mockSourceKeys, destino, 0);

      expect(resultado).toBe(false);
    });
  });

  describe('getResultados', () => {
    test('debería devolver resultados correctos', () => {
      enviador.pagosExitosos = 2;
      enviador.totalEnviado = 4;

      const resultados = enviador.getResultados();

      expect(resultados).toEqual({
        pagosExitosos: 2,
        totalEnviado: 4,
        totalPagos: 3
      });
    });
  });
});