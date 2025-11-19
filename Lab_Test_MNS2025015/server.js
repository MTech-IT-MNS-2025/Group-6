// server.js
const express = require('express');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// serve static files (index.html, myProg.wasm, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Helper: secure random BigInt in range [1, max-1]
function randomBigIntBelow(maxExclusive) {
  const max = BigInt(maxExclusive);
  if (max <= 2n) return 1n;
  // Number of bytes
  const bytes = Math.ceil((max.toString(2).length) / 8);
  while (true) {
    const buf = crypto.randomBytes(bytes);
    let cand = 0n;
    for (let i = 0; i < buf.length; i++) {
      cand = (cand << 8n) + BigInt(buf[i]);
    }
    if (cand > 0n && cand < max) return cand;
  }
}

// JS BigInt modular exponentiation (fast)
function modPowBigInt(base, exp, mod) {
  base = BigInt(base) % BigInt(mod);
  exp = BigInt(exp);
  mod = BigInt(mod);
  let result = 1n;
  while (exp > 0n) {
    if (exp & 1n) result = (result * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return result;
}

// POST /api/dh
// expects JSON { g: "<decimal>", p: "<decimal>", x: "<decimal>" }
app.post('/api/dh', async (req, res) => {
  try {
    const { g, p, x } = req.body;
    if (!g || !p || !x) return res.status(400).json({ error: 'missing g/p/x' });

    const pBig = BigInt(p);

    // 1. choose random b in Z_p^*
    const b = randomBigIntBelow(pBig - 1n); // in [1, p-2]

    // 2. compute y = g^b mod p (server public)
    const y = modPowBigInt(BigInt(g), b, pBig);

    // 3. compute shared K = x^b mod p
    const K = modPowBigInt(BigInt(x), b, pBig);

    // Return decimal string values
    return res.json({ y: y.toString(), K: K.toString() });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error', details: String(err) });
  }
});

// Start server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
