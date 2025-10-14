/* crear-cuenta.js
    Script para crear una nueva cuenta Stellar en Testnet
*/

// Importar Librería
import { Keypair } from 'stellar-sdk';
import dotenv from 'dotenv';
dotenv.config();

const friendbotURL = process.env.FRIENDBOT_URL || 'https://friendbot.stellar.org';
const num_cuentas = 5;

// F(x) principal
async function crearCuenta() {
    console.log(`Generando y fondeando ${num_cuentas} cuentas en testnet 🔐🔑 ...`);

    for (let i = 1; i <= num_cuentas; i++) {
        // Generar keypair
        const pair = Keypair.random();
        const publicKey = pair.publicKey();
        const secretKey = pair.secret();

        // Mostrar claves generadas
        console.log(`\nCuenta ${i}:`);
        console.log('✅ ¡KeyPair creada!');
        console.log('🔑 PUBLIC KEY (puedes compartir):', publicKey);
        console.log('🔐 SECRET KEY (NUNCA COMPARTIR):', secretKey);

        // Fondear con Friendbot usando la publicKey generada (NO process.env)
        console.log('💰 Fondeando con Friendbot...');

        try {
            const response = await fetch(`${friendbotURL}/?addr=${encodeURIComponent(publicKey)}`);
            const result = await response.json();

            if (response.ok) {
            console.log('✅ ¡Cuenta fondeada con 10,000 XLM!');
            console.log('🔗 Transaction hash:', result.hash);
            } else {
            console.warn('⚠️ Error al fondear:', result);
            }
        } catch (error) {
            console.error('❌ Error al conectar con Friendbot:', error.message);
        }
    }

    console.log('\n⚠️ IMPORTANTE: Guarda estas llaves en un lugar seguro');
}

crearCuenta();
