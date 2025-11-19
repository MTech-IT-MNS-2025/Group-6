
Diffie-Hellman Shared Secret Key Exchange Demo

This project demonstrates the establishment of a Diffie-Hellman (DH) shared secret key between a client (browser frontend) and a server (Node.js/Express) using a WebAssembly (WASM) module compiled from C for core cryptographic computations.

The DH exchange ensures both parties arrive at the same shared secret key ($K$) over an insecure channel.

🚀 Project Overview

The client-side JavaScript handles the user interface and initial random number generation ($\mathbf{a}$), then uses a WASM module to calculate the public key ($\mathbf{x} = g^a \bmod p$). The server performs its own random number generation ($\mathbf{b}$), calculates its public key ($\mathbf{y} = g^b \bmod p$), and calculates the shared secret ($\mathbf{K} = x^b \bmod p$), again leveraging the WASM module for the modular exponentiation operation.

🛠️ Prerequisites

You must have the following installed to set up and run this project:

Node.js and npm: For running the server and managing dependencies.

Emscripten SDK (EMS/emcc): Required to compile the myProg.c file into the necessary myProg.wasm module for the cryptographic operations.

📂 Project Structure

Create a main directory (e.g., dh-demo) and structure your files as follows:

dh-demo/
├── package.json
├── server.js
├── myProg.c
└── public/
    ├── index.html        # Client-side frontend and logic
    └── myProg.wasm       # Compiled WASM module (must be present)


📝 Core Files
1. myProg.c (C Implementation)
#include <stdio.h>
#include <stdint.h>

uint64_t modexp(uint64_t a, uint64_t b, uint64_t n) {
    uint64_t result = 1;
    a = a % n;  // reduce 'a' first

    while (b > 0) {
        if (b & 1) {              // if b is odd
            result = (result * a) % n;
        }
        a = (a * a) % n;          // square base
        b >>= 1;                  // divide b by 2
    }

    return result;
}

int main() {
    uint64_t a, b, n;
    printf("Enter a, b, n: ");
    scanf("%lu %lu %lu", &a, &b, &n);

    printf("%lu^%lu mod %lu = %lu\n", a, b, n, modexp(a, b, n));
    return 0;
}



2. package.json (Server Dependencies)

Sets up the Node.js project and dependencies (Express for the server).

{
  "name": "dh-demo",
  "version": "1.0.0",
  "description": "Diffie-Hellman Shared Secret Key Exchange using WASM and Node.js",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}

### 3\. `server.js` (Node/Express Server)

Handles serving static files (including the WASM module and HTML) and implementing the server-side DH logic using the same modular exponentiation function provided in the C code. **Note:** Since the DH steps specify using the C file, the server will need a direct implementation of the math if it cannot directly call the WASM file synchronously (which is often difficult in server environments without specific loaders). For simplicity and adherence to the calculation requirement, the server logic will use the same modular exponentiation math as the C function, implemented in JavaScript.


### 4\. `index.html` (Client Frontend with WASM Loading)

This file contains the UI, the JavaScript logic to load and use the WASM module for \`g^a \\bmod p$, and the AJAX call to the server.

-----

## ⚙️ Setup Instructions

### Step 1: Create Files

Create the files listed above (`package.json`, `server.js`, `myProg.c`, and `public/index.html`) in your `dh-demo` directory.

### Step 2: Compile C to WASM

You must use Emscripten to compile the modular exponentiation function into a WebAssembly module.

1.  **Activate Emscripten:** Run the environment script for your system (e.g., `emsdk_env.bat`).

2.  **Compile:** Run the following command from the root of your `dh-demo` folder:

    ```bash
    emcc myProg.c -O3 -s STANDALONE_WASM=1 -s EXPORTED_FUNCTIONS='["_modexp"]' -o public/myProg.wasm
       
       ( This creates the necessary `myProg.wasm` file inside the `public` folder. )

    ```

### Step 3: Install Dependencies

From the `dh-demo` root directory, install the required Node.js package (Express):

````bash
npm install

### Step 4: Run the Server & Test

Start the Node.js Express server:

```bash
npm start

1.  Open your browser and navigate to: `http://localhost:3000`
2.  Wait for the "Loading WASM..." button to change to **"Compute & Send to Server"**.
3.  Use the sample values: `p=23`, `g=5`.
4.  Click the **Compute & Send to Server** button.
5.  Observe the client-side private key ($a$), the public key exchange ($x$ and $y$), and the final shared secret key ($K$). The server and client should arrive at the *same* value for $K$.

---




