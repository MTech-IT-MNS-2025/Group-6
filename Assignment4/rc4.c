#include <emscripten.h>
#include <string.h>
#include <stdlib.h>

EMSCRIPTEN_KEEPALIVE
void rc4_crypt(unsigned char* data, int data_len, unsigned char* key, int key_len, unsigned char* output) {
    unsigned char S[256];
    int i, j = 0;
    
    // KSA (Key Scheduling Algorithm)
    for (i = 0; i < 256; i++) {
        S[i] = i;
    }
    
    for (i = 0; i < 256; i++) {
        j = (j + S[i] + key[i % key_len]) % 256;
        unsigned char temp = S[i];
        S[i] = S[j];
        S[j] = temp;
    }
    
    // PRGA (Pseudo-Random Generation Algorithm)
    i = 0;
    j = 0;
    for (int n = 0; n < data_len; n++) {
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;
        unsigned char temp = S[i];
        S[i] = S[j];
        S[j] = temp;
        unsigned char K = S[(S[i] + S[j]) % 256];
        output[n] = data[n] ^ K;
    }
}