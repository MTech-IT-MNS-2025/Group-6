# 🔐 **Diffie-Hellman WebAssembly Project**
**Course:** Introduction to Cryptography  
**Objective:** Establishment of Diffie-Hellman shared secret key between Client and Server using **WebAssembly + JavaScript + C code**.

---

# 📘 **Project Description**

This project implements the **Diffie–Hellman Key Exchange** using:

- **C program (`myProg.c`)** compiled to WebAssembly using **Emscripten**
- **Frontend (HTML/JS)** to collect inputs and compute client-side values
- **Backend (Express.js)** to compute server-side values
- **Client and server both use WASM** to compute modular exponentiation efficiently and consistently

The goal is for both client and server to compute the same shared secret:

\[
K = g^{ab} \mod p
\]

Where:

- `a` is the client’s private random value  
- `b` is the server’s private random value  
- `x = g^a mod p` (client → server)  
- `y = g^b mod p` (server → client)

Using WebAssembly guarantees **fast, secure, and identical modular exponentiation** on both sides.

---

# 🗂 **Project Structure**

```
dh-wasm-project
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── myprog.js
│   ├── myprog.wasm
│
├── server/
│   ├── myprog_server.js
│   ├── myprog_server.wasm
│   ├── package.json
│   ├── package-lock.json
│   ├── node_modules/
│
├── myProg.c
└── README.md
```

---

# ⚙️ **Diffie-Hellman Flow (Client + Server)**

## **Client-Side Steps**
1. User enters **p** (prime) and **g** (generator) in HTML form  
2. Client generates a random private value  
   \[
   a ∈ Z_p^*
   \]
3. Client computes:
   \[
   x = g^a mod p
   \]
   using `myprog.wasm`
4. Client sends to server:
   ```
   { g, p, x }
   ```
5. Client receives from the server:
   ```
   { K, y }
   ```
6. Client displays:
   ```
   K, y, a
   ```

---

## **Server-Side Steps**
Upon receiving `<g, p, x>`:

1. Server generates its private value:
   \[
   b ∈ Z_p^*
   \]
2. Server computes:
   \[
   y = g^b mod p
   \]
3. Server computes shared secret:
   \[
   K = x^b mod p
   \]
4. Server responds with:
   ```
   { K, y }
   ```

---

# 🧪 **Mathematical Validation**

Both sides compute the same shared key:

Client computes:

\[
K = y^a = (g^b)^a = g^{ab} mod p
\]

Server computes:

\[
K = x^b = (g^a)^b = g^{ab} mod p
\]

Thus, both calculate the same **shared secret**, without revealing private values `a` or `b`.

---

# ✔️ **Technologies Used**

- **Emscripten** → C to WebAssembly compiler  
- **WebAssembly (WASM)** → Fast modular exponentiation  
- **Node.js + Express.js** → Server  
- **HTML, CSS, JavaScript** → Client  
- **C (myProg.c)** → Performs `g^x mod p` computations  
- **Crypto Math** → Diffie-Hellman key exchange  


# 🛠 **Setup & Installation (macOS)**

### **1. Navigate to project folder**
```bash
cd ~/Downloads/dh-wasm-project
```

### **2. Install Node dependencies**
```bash
npm install
```

### **3. Activate Emscripten environment**
(Adjust path if needed)
```bash
source ~/emsdk/emsdk_env.sh
```

### **4. Compile C → WebAssembly**

**Frontend WASM**
```bash
emcc myProg.c -o frontend/myprog.js -s WASM=1
```

**Server WASM**
```bash
emcc myProg.c -o server/myprog_server.js -s WASM=1
```

The `.wasm` files will be auto-generated.

### **5. Run the Node server**
```bash
npm start
```

If port 3001 is already in use:
```bash
lsof -i :3001
kill -9 <PID>
npm start
```

---

# 🌐 **How to Use the Application**

1. Open the frontend in a browser (`index.html`)
2. Enter values for:
   - `p` (a large prime)
   - `g` (generator)
3. Click **Generate Key**
4. Client computes `a` and `x`
5. Server computes `b`, `y`, and final shared key `K`
6. Client displays:
   ```
   a (client private)
   y (server public)
   K (shared secret key)
   ```

---

# 📦 **How to Create ZIP for Submission**

## Create zip:
```bash
cd ..
zip -r dh-wasm-project.zip dh-wasm-project/
```

## Generate MD5 digest:
```bash
md5 dh-wasm-project.zip
```

Sample output:
```
MD5 (dh-wasm-project.zip) = 9f2c234ac7b91a283ebae678fcaa002c
```

Give this hash to the invigilator.

---

# 🎉 **End of README**
