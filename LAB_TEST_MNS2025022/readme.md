# Diffie-Hellman WebAssembly Project

## Platform Used
- macOS (Apple Silicon / Intel)

## Software / Tools Used
- Node.js
- npm (Node Package Manager)
- HTML + CSS + javascript
- Express.js (server)
- Emscripten SDK (emsdk)
- C Compiler (emcc)

---

## Project folder structure (extracted from dh-wasm-project.zip)
```
dh-wasm-project
│   └── frontend
│   └── frontend/index.html
│   └── frontend/myprog.js
│   └── frontend/myprog.wasm
│   └── frontend/script.js
│   └── myProg.c
│   └── server
│   └── server/myprog_server.js
│   └── server/myprog_server.wasm
│   └── server/node_modules
│   └── server/node_modules/.bin
│   └── server/node_modules/.bin/mime
│   └── server/node_modules/.package-lock.json
│   └── server/node_modules/accepts
│   └── server/node_modules/accepts/HISTORY.md
│   └── server/node_modules/accepts/LICENSE
│   └── server/node_modules/accepts/README.md
│   └── server/node_modules/accepts/index.js
│   └── server/node_modules/accepts/package.json
│   └── server/node_modules/array-flatten
│   └── ...
```

---

## Commands to run the project (macOS)

1. Open Terminal and go to the project folder (replace path if needed):
```bash
cd ~/Downloads/dh-wasm-project    # or wherever you extracted the zip
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Activate Emscripten environment (if you installed emsdk in your home folder):
```bash
# run this from the emsdk folder or adjust the path
source ~/emsdk/emsdk_env.sh
```

4. Compile the C source(s) to WebAssembly (example):
```bash
# from project root if dh.c is present
emcc dh.c -o wasm/dh.js -s WASM=1
# or produce dh.wasm and a JavaScript loader:
emcc dh.c -o dh.js -s WASM=1
```

5. Start the Node server:
```bash
npm start
# or if using Next.js
npm run dev
```

6. If the server port (commonly 3001) is already in use:
```bash
lsof -i :3001
kill -9 <PID>
npm start
```

---

## Create ZIP and calculate MD5 digest (macOS)

To create a ZIP of the project folder:
```bash
cd ..
zip -r dh-wasm-project.zip dh-wasm-project/
```

To calculate MD5 digest of that zip:
```bash
md5 dh-wasm-project.zip
```

Example output:
```
MD5 (dh-wasm-project.zip) = <your-hash-here>
```

---

## Notes and next steps

- I inspected the uploaded archive and used its actual file list to generate the folder structure above.
- If you want, I can:
  - regenerate the README with a specific `start` command from package.json (I can read package.json contents if you want),
  - create a deterministic zip script so hashes remain stable,
  - or produce a downloadable README.md file for you.

I've saved a copy of this README as a file you can download below.
