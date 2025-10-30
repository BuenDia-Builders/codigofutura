'use client';

import { useState } from 'react';
import WalletConnect from '@/components/WalletConnect';

export default function Home() {
  const [publicKey, setPublicKey] = useState('');

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Assets Nativos en Stellar
          </h1>
          <p className="text-gray-600 mt-2">Tu dApp de stablecoins en testnet</p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-center">
          <WalletConnect onConnect={setPublicKey} />
        </div>

        {publicKey && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 text-center">
            <p className="text-sm text-gray-700">
              <strong>Wallet conectada:</strong>
            </p>
            <p className="font-mono text-lg mt-1">{publicKey}</p>
          </div>
        )}
      </div>
    </main>
  );
}