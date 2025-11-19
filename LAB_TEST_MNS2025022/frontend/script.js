// script.js
// Wait for Emscripten Module runtime to initialize
Module.onRuntimeInitialized = () => {

  // cwrap: use BIGINT return + BIGINT params
  const modexp = Module.cwrap('modexp', 'bigint', ['bigint', 'bigint', 'bigint']);

  const form = document.getElementById('dhForm');
  const output = document.getElementById('output');
  const aSpan = document.getElementById('aVal');
  const xSpan = document.getElementById('xVal');
  const ySpan = document.getElementById('yVal');
  const kSpan = document.getElementById('kVal');

  function randZpStar(p) {
    p = Number(p);
    if (p <= 3) return 2;
    return Math.floor(Math.random() * (p - 3)) + 2;
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const p = Number(document.getElementById('p').value);
    const g = Number(document.getElementById('g').value);

    // 2. a in Zp*
    const a = randZpStar(p);

    // 3. x = g^a mod p using WASM with BigInt inputs
    const xBig = modexp(BigInt(g), BigInt(a), BigInt(p));
    const x = Number(xBig);   // convert BigInt → JS number for display

    // Display client values
    aSpan.textContent = a;
    xSpan.textContent = x;

    // 4. Send to server
    const body = { g: g, p: p, x: x };
    try {
      const res = await fetch('/compute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('server error ' + res.status);

      const data = await res.json();

      // server returns { K, y }
      output.style.display = 'block';
      ySpan.textContent = data.y;
      kSpan.textContent = data.K;

    } catch (err) {
      alert('Request failed: ' + err);
      console.error(err);
    }
  });
};
