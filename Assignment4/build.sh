#!/bin/bash
emcc rc4.c -o public/rc4.js \
  -s WASM=1 \
  -s EXPORTED_FUNCTIONS='["_rc4_crypt","_malloc","_free"]' \
  -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap","getValue","setValue","UTF8ToString","stringToUTF8","lengthBytesUTF8","HEAP8","HEAPU8","HEAP16","HEAPU16","HEAP32","HEAPU32","HEAPF32","HEAPF64"]' \
  -s MODULARIZE=1 \
  -s EXPORT_NAME='createRC4Module' \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s INITIAL_MEMORY=16777216