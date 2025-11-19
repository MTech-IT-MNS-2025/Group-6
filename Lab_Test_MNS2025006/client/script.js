let wasmModule;

fetch("myProg.wasm")
  .then(res => res.arrayBuffer())
  .then(buffer => WebAssembly.instantiate(buffer))
  .then(wasm => wasmModule = wasm.instance.exports);

function computeX() {
    const p = parseInt(document.getElementById("p").value);
    const g = parseInt(document.getElementById("g").value);

    // Step 2: a = random element of Zp*
    const a = Math.floor(Math.random() * (p - 2)) + 2;

    // Step 3: x = g^a mod p  (using WASM)
    const x = wasmModule.modexp(g, a, p);

    // Step 4: send <g,p,x> to server
    fetch("http://localhost:3000/dh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ g, p, x })
    })
    .then(res => res.json())
    .then(data => {
        // Step 5: display <K, y, a>
        document.getElementById("K").innerText = data.K;
        document.getElementById("y").innerText = data.y;
        document.getElementById("a").innerText = a;
    });
}
