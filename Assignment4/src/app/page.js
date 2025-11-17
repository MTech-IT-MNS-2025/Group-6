'use client';
import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { Lock, Unlock, Code, AlertCircle, Copy, Check } from 'lucide-react';

export default function Home() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');
  const [wasmReady, setWasmReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const wasmModule = useRef(null);

  const loadWasmModule = async () => {
    try {
      if (typeof window !== 'undefined' && window.createRC4Module) {
        wasmModule.current = await window.createRC4Module();
        setWasmReady(true);
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to load WASM: ' + err.message);
      setLoading(false);
    }
  };

  const callRC4 = (inputText, inputKey, isHex = false) => {
    const Module = wasmModule.current;
    
    let inputData;
    if (isHex) {
      const cleanHex = inputText.replace(/\s/g, '');
      inputData = new Uint8Array(cleanHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    } else {
      inputData = new TextEncoder().encode(inputText);
    }
    
    const keyData = new TextEncoder().encode(inputKey);
    
    const dataPtr = Module._malloc(inputData.length);
    const keyPtr = Module._malloc(keyData.length);
    const outputPtr = Module._malloc(inputData.length);
    
    Module.HEAPU8.set(inputData, dataPtr);
    Module.HEAPU8.set(keyData, keyPtr);
    
    Module._rc4_crypt(dataPtr, inputData.length, keyPtr, keyData.length, outputPtr);
    
    const outputData = new Uint8Array(Module.HEAPU8.buffer, outputPtr, inputData.length);
    const result = Array.from(outputData);
    
    Module._free(dataPtr);
    Module._free(keyPtr);
    Module._free(outputPtr);
    
    return result;
  };

  const handleEncrypt = () => {
    try {
      setError('');
      if (!text || !key) {
        setError('Please enter both text and key');
        return;
      }
      const encrypted = callRC4(text, key, false);
      const hex = encrypted.map(b => b.toString(16).padStart(2, '0')).join('');
      setResult(hex);
    } catch (err) {
      setError('Encryption failed: ' + err.message);
    }
  };

  const handleDecrypt = () => {
    try {
      setError('');
      if (!text || !key) {
        setError('Please enter both hex text and key');
        return;
      }
      if (!/^[0-9a-fA-F\s]*$/.test(text)) {
        setError('Invalid hex format');
        return;
      }
      const decrypted = callRC4(text, key, true);
      const str = String.fromCharCode(...decrypted);
      setResult(str);
    } catch (err) {
      setError('Decryption failed: ' + err.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Script src="/rc4.js" onLoad={loadWasmModule} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/20">
            
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
              <div className="flex items-center gap-3">
                <Code className="w-8 h-8 text-white" />
                <div>
                  <h1 className="text-2xl font-bold text-white">RC4 WASM Encryption</h1>
                  <p className="text-purple-100 text-sm">C → WebAssembly → Next.js</p>
                </div>
              </div>
            </div>

            <div className="px-6 pt-6">
              <div className={`flex items-center gap-2 text-sm ${wasmReady ? 'text-green-400' : loading ? 'text-yellow-400' : 'text-red-400'}`}>
                <div className={`w-2 h-2 rounded-full ${wasmReady ? 'bg-green-400' : loading ? 'bg-yellow-400' : 'bg-red-400'} ${loading ? 'animate-pulse' : ''}`}></div>
                {wasmReady ? 'WASM Module Loaded' : loading ? 'Loading WASM...' : 'WASM Load Failed'}
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Plaintext / Ciphertext (Hex)
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text to encrypt or hex to decrypt..."
                  className="w-full h-32 px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 font-mono text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Encryption Key
                </label>
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Enter your secret key..."
                  className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleEncrypt}
                  disabled={!wasmReady}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-purple-500/50"
                >
                  <Lock className="w-5 h-5" />
                  Encrypt
                </button>
                <button
                  onClick={handleDecrypt}
                  disabled={!wasmReady}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-blue-500/50"
                >
                  <Unlock className="w-5 h-5" />
                  Decrypt
                </button>
              </div>

              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="text-red-300 text-sm">{error}</div>
                </div>
              )}

              {result && !error && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-purple-300">Result</label>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-4 bg-slate-900/50 border border-green-500/30 rounded-lg">
                    <p className="text-green-400 font-mono text-sm break-all">{result}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}