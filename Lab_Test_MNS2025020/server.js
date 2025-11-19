const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// JS version of modular exponentiation (same as myProg.c but using BigInt)
function modexp(a, b, n) {
  let result = 1n;
  a = a % n;

  while (b > 0n) {
    if (b & 1n) {
      result = (result * a) % n;
    }
    a = (a * a) % n;
    b >>= 1n;
  }

  return result;
}

// Server-side: receives <g, p, x>, generates b, computes y and K, sends <K, y>
app.post('/compute', (req, res) => {
  const { g, p, x } = req.body;  // all strings

  const bigG = BigInt(g);
  const bigP = BigInt(p);
  const bigX = BigInt(x);

  // b ← random element of Z_p*  (we pick [2, p-2])
  const rand = Math.floor(Math.random() * (Number(p) - 3)) + 2;
  const b = BigInt(rand);

  // y = g^b mod p
  const y = modexp(bigG, b, bigP);

  // K = x^b mod p
  const K = modexp(bigX, b, bigP);

  res.json({
    K: K.toString(),
    y: y.toString(),
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
