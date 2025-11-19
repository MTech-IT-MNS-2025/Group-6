const express = require("express");
const fs = require("fs");

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(express.json());

let wasm;

WebAssembly.instantiate(fs.readFileSync("myProg.wasm"))
    .then(obj => wasm = obj.instance.exports);

app.post("/dh", (req, res) => {
    const { g, p, x } = req.body;

    // Step 2: b = random element of Zp*
    const b = Math.floor(Math.random() * (p - 2)) + 2;

    // Step 3: y = g^b mod p
    const y = wasm.modexp(g, b, p);

    // Step 4: K = x^b mod p
    const K = wasm.modexp(x, b, p);

    res.json({ K, y });
});

app.listen(3000, () => console.log("Server running on port 3000"));
