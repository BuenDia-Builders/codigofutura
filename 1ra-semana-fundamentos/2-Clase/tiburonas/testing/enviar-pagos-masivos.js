// enviar-pagos-masivos.js
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

const Server = Horizon.Server;

class EnviadorPagos {
  constructor(secretKey, destinatarios, serverUrl = 'https://horizon-testnet.stellar.org') {
    this.secretKey = secretKey;
    this.destinatarios = destinatarios;
    this.server = new Server(serverUrl);
    this.networkPassphrase = Networks.TESTNET;
    this.pagosExitosos = 0;
    this.totalEnviado = 0;
  }

  async enviarPagosMasivos() {
    console.log('💸 SISTEMA DE PAGOS AUTOMATIZADO\n');
    console.log('═'.repeat(60));
    
    try {
      // Cargar cuenta origen
      const sourceKeys = Keypair.fromSecret(this.secretKey);
      const sourceAccount = await this.server.loadAccount(sourceKeys.publicKey());
      
      console.log(`\n💰 Balance inicial: ${sourceAccount.balances[0].balance} XLM`);
      console.log(`📤 Cuenta origen: ${sourceKeys.publicKey()}`);
      console.log(`\n🎯 Enviando 2 XLM a ${this.destinatarios.length} cuentas...\n`);
      console.log('─'.repeat(60));
      
      // Enviar pago a cada destinatario
      for (let i = 0; i < this.destinatarios.length; i++) {
        const destino = this.destinatarios[i];
        
        console.log(`\n📍 Pago ${i + 1}/${this.destinatarios.length}`);
        console.log(`   Destino: ${destino.publicKey}`);
        console.log(`   Memo: ${destino.memo}`);
        console.log(`   Monto: 2 XLM`);
        
        const exito = await this.enviarPagoIndividual(sourceKeys, destino, i);
        
        if (exito) {
          this.pagosExitosos++;
          this.totalEnviado += 2;
        }
        
        // Delay de 1 segundo entre transacciones
        if (i < this.destinatarios.length - 1) {
          console.log(`   ⏳ Esperando 1 segundo...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        console.log('─'.repeat(60));
      }
      
      await this.mostrarResumen(sourceKeys, sourceAccount);
      return {
        pagosExitosos: this.pagosExitosos,
        totalEnviado: this.totalEnviado,
        totalPagos: this.destinatarios.length
      };
      
    } catch (error) {
      console.error('\n❌ ERROR GENERAL:', error.message);
      throw error;
    }
  }

  async enviarPagoIndividual(sourceKeys, destino, index) {
    try {
      // Recargar cuenta para actualizar sequence number
      const accountRefresh = await this.server.loadAccount(sourceKeys.publicKey());
      
      // Construir transacción
      const transaction = new TransactionBuilder(accountRefresh, {
        fee: BASE_FEE,
        networkPassphrase: this.networkPassphrase
      })
        .addOperation(Operation.payment({
          destination: destino.publicKey,
          asset: Asset.native(),
          amount: '2'
        }))
        .addMemo(Memo.text(destino.memo))
        .setTimeout(30)
        .build();
      
      // Firmar
      transaction.sign(sourceKeys);
      
      // Enviar
      const result = await this.server.submitTransaction(transaction);
      
      console.log(`   ✅ ÉXITO!`);
      console.log(`   🔗 Hash: ${result.hash}`);
      console.log(`   🔍 Ver: https://stellar.expert/explorer/testnet/tx/${result.hash}`);
      
      return true;
      
    } catch (error) {
      console.log(`   ❌ ERROR: ${error.message}`);
      if (error.response?.data) {
        console.log(`   Detalle:`, error.response.data.extras?.result_codes);
      }
      return false;
    }
  }

  async mostrarResumen(sourceKeys, sourceAccountInicial) {
    // Cargar balance final
    const accountFinal = await this.server.loadAccount(sourceKeys.publicKey());
    const balanceFinal = accountFinal.balances[0].balance;
    
    // Mostrar resumen
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('                📊 RESUMEN DE PAGOS');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');
    console.log(`✅ Pagos exitosos: ${this.pagosExitosos}/${this.destinatarios.length}`);
    console.log(`❌ Pagos fallidos: ${this.destinatarios.length - this.pagosExitosos}`);
    console.log(`💰 Total enviado: ${this.totalEnviado} XLM`);
    console.log(`📊 Balance final: ${balanceFinal} XLM`);
    console.log(`📉 Diferencia: ${(parseFloat(sourceAccountInicial.balances[0].balance) - parseFloat(balanceFinal)).toFixed(7)} XLM`);
    console.log('');
  }

  // Getters para testing
  getResultados() {
    return {
      pagosExitosos: this.pagosExitosos,
      totalEnviado: this.totalEnviado,
      totalPagos: this.destinatarios.length
    };
  }
}

// Función original para mantener compatibilidad
async function enviarPagosMasivos() {
  const SECRET_KEY = 'SBXXX...'; // Secret key de la cuenta origen
  const destinatarios = [
    { publicKey: "GABC...1", memo: "Pago-001" },
    { publicKey: "GABC...2", memo: "Pago-002" },
    { publicKey: "GABC...3", memo: "Pago-003" },
    { publicKey: "GABC...4", memo: "Pago-004" },
    { publicKey: "GABC...5", memo: "Pago-005" },
  ];

  const enviador = new EnviadorPagos(SECRET_KEY, destinatarios);
  return await enviador.enviarPagosMasivos();
}

// Si se ejecuta directamente, correr la función
if (require.main === module) {
  enviarPagosMasivos();
}

module.exports = {
  EnviadorPagos,
  enviarPagosMasivos
};