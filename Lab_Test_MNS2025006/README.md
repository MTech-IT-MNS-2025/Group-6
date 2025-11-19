
### Folder Structure
```
labtest/
│
├── README.md
│
├── client/
│   ├── index.html
│   ├── script.js
│   ├── myProg.c
│   ├── myProg.wasm
│
├── server/
│   ├── server.js
│   ├── myProg.c
│   ├── myProg.wasm
│   ├── package.json
│   ├── package-lock.json
 ```
### 1. Platform Used:
   - Ubuntu 

### 2. Software / Tools Used:
   - NodeJS (for server-side computation)
   - ExpressJS (for backend routing)
   - Emscripten (to compile myProg.c into WebAssembly)
   - WebAssembly (WASM) module for modular exponentiation
   - Python HTTP server (for frontend hosting)
   - JavaScript / HTML (frontend)

### 3. Commands to Run the Code:

   #### A) Start the Server:
      cd server
      node server.js

   #### B) Run the Frontend:
      cd client
      python3 -m http.server 8000

   #### C) Compile myProg.c to WebAssembly (Client Side):
      cd client
      emcc myProg.c -O3 -s STANDALONE_WASM=1 -Wl,--no-entry \
      -s EXPORTED_FUNCTIONS='["_modexp"]' \
      -o myProg.wasm

   #### D) Compile myProg.c to WebAssembly (Server Side):
      cd server
      emcc myProg.c -O3 -s STANDALONE_WASM=1 -Wl,--no-entry \
      -s EXPORTED_FUNCTIONS='["_modexp"]' \
      -o myProg.wasm

   #### E) Install Dependencies:
      cd server
      npm init -y
      npm install express

### 4. Command Used to Calculate MD5 Digest:

      md5sum labtest.zip > md5.txt
   
### 5. To see the md5 digest:
      md5sum latest.zip
