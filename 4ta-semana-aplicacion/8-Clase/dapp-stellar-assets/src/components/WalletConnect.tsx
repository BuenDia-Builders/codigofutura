'use client';

import { useState, useEffect } from 'react';

interface Props {
  onConnect: (publicKey: string) => void;
}

export default function WalletConnect({ onConnect }: Props) {
  const [publicKey, setPublicKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkConnection = async () => {
      try {
        const freighter = await import('@stellar/freighter-api');
        
        const connected = await freighter.isConnected();
        
        if (connected) {
          const result = await freighter.getAddress();
          if (result.address && result.address !== '') {
            setPublicKey(result.address);
            onConnect(result.address);
          }
        }
      } catch (err: any) {
        console.error('Error checking connection:', err);
      }
    };
    
    checkConnection();
  }, [mounted, onConnect]);

  const connectWallet = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (typeof window === 'undefined') {
        throw new Error('Este código solo funciona en el navegador');
      }

      const freighter = await import('@stellar/freighter-api');
      
      const connected = await freighter.isConnected();
      
      if (!connected) {
        throw new Error('Por favor instala Freighter desde https://freighter.app');
      }

      // 🔥 ESTO ES LO IMPORTANTE: Solicitar acceso primero
      console.log('🔐 Solicitando acceso a Freighter...');
      const accessResult = await freighter.requestAccess();
      console.log('📊 Resultado de requestAccess:', accessResult);

      if (accessResult.error) {
        throw new Error(`Acceso denegado: ${accessResult.error}`);
      }

      // Ahora sí, obtener la dirección
      console.log('🔑 Obteniendo dirección...');
      const addressResult = await freighter.getAddress();
      console.log('📦 Resultado:', addressResult);
      
      if (addressResult.address && addressResult.address !== '') {
        setPublicKey(addressResult.address);
        onConnect(addressResult.address);
      } else {
        throw new Error('No se pudo obtener la dirección. Verifica que Freighter esté desbloqueado.');
      }
    } catch (err: any) {
      console.error('❌ Error:', err);
      setError(err.message || 'Error al conectar');
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (addr: string) => 
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicKey);
    alert('¡Copiado!');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center">Conectar Wallet</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded text-sm text-red-700 text-center">
          {error}
        </div>
      )}

      {!publicKey ? (
        <button
          onClick={connectWallet}
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Conectando...
            </>
          ) : (
            'Conectar Freighter'
          )}
        </button>
      ) : (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <p className="text-green-800 font-bold text-center mb-2">✅ Wallet Conectada</p>
          <div className="flex items-center justify-between bg-white px-3 py-2 rounded border">
            <p className="text-sm font-mono break-all">{formatAddress(publicKey)}</p>
            <button 
              onClick={copyToClipboard}
              className="ml-2 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Copiar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}