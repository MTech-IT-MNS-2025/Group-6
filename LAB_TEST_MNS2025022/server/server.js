// server/server.js
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// serve frontend static files
app.use('/', express.static(path.join(__dirname, '..', 'frontend')));

// Load the Emscripten node module (MODULARIZE=1)
const createModule = require('./myprog_server.js');

let wasmInstancePromise = createModule(); // Promise resolving to module instance

app.post('/compute', async (req, res) => {
  const { g, p, x } = req.body;

  if (typeof g !== 'number' || typeof p !== 'number' || typeof x !== 'number') {
    return res.status(400).json({ error: 'g, p, x must be numbers' });
  }

  try {
    const module = await wasmInstancePromise;

    // USING BIGINT — required for uint64_t
    const modexp = module.cwrap('modexp', 'bigint',
      ['bigint', 'bigint', 'bigint']
    );

    // choose random b in Zp*
    const randZpStar = (p) => {
      p = Number(p);
      if (p <= 3) return 2;
      return Math.floor(Math.random() * (p - 3)) + 2;
    };

    const b = randZpStar(p);

    // 3. y = g^b mod p (WASM BigInt)
    const yBig = modexp(BigInt(g), BigInt(b), BigInt(p));
    const y = Number(yBig);

    // 4. K = x^b mod p (WASM BigInt)
    const KBig = modexp(BigInt(x), BigInt(b), BigInt(p));
    const K = Number(KBig);

    // 5. respond to client
    return res.json({
      K: K,
      y: y
      // remove b from production output
    });

  } catch (err) {
    console.error('WASM or server error:', err);
    return res.status(500).json({ error: 'internal server error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
