Platform Used:
- Windows 11

Software / Tools Used:
- Node.js (Backend)
- Express.js (Server framework)
- HTML / CSS / JavaScript (Frontend)
- Emscripten (to compile C → WebAssembly)
- WebAssembly (WASM)

Commands to Run the Project:
1. Install dependencies:
   npm install

2. Start the server:
   node server.js

3. Open in browser:
   http://localhost:3000

   

Command Used to Compile C Code to WebAssembly:

emcc myProg.c -O3 -s WASM=1 -s EXPORTED_FUNCTIONS="['_modexp']" -s EXPORTED_RUNTIME_METHODS="['cwrap']" -o public/myProg.js



Command Used to Calculate the MD5 Digest (During Lab Test):

certutil -hashfile myProg.c MD5

