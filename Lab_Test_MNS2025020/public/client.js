let modexpWasm = null;

// Runs when myProg.js (WASM compiled from myProg.c) is ready
Module["onRuntimeInitialized"] = () => {
  // C: uint64_t modexp(uint64_t a, uint64_t b, uint64_t n)
  modexpWasm = Module.cwrap("modexp", "number", ["number", "number", "number"]);
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("dh-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!modexpWasm) {
      alert("Crypto module (WASM) not ready yet. Please try again.");
      return;
    }

    const pStr = document.getElementById("p").value;
    const gStr = document.getElementById("g").value;

    if (!pStr.trim() || !gStr.trim()) {
      alert("Please enter numeric values for p and g.");
      return;
    }

    // Use plain Numbers on the client side
    const p = Number(pStr);
    const g = Number(gStr);

    if (!Number.isFinite(p) || !Number.isFinite(g)) {
      alert("Invalid numbers for p or g.");
      return;
    }

    // Step 2 (client): a ← random element of Z_p*
    const a = Math.floor(Math.random() * (p - 3)) + 2;

    // Step 3 (client): x = g^a mod p using WASM modexp
    const x = modexpWasm(g, a, p); // Number

    // Show client values
    document.getElementById("val-a").textContent = String(a);
    document.getElementById("val-x").textContent = String(x);

    // Step 4: send <g, p, x> to server (as strings)
    const response = await fetch("/compute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        g: String(g),
        p: String(p),
        x: String(x),
      }),
    });

    const data = await response.json();
    const K = data.K;
    const y = data.y;

    // Step 5: display <K, y, a>
    document.getElementById("val-y").textContent = y;
    document.getElementById("val-K").textContent = K;
    document.getElementById("triple").textContent = `<${K}, ${y}, ${a}>`;
  });
});
