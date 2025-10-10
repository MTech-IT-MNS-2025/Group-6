en, secret_key_len, signature_len;
    const char *message = "Post-Quantum Cryptography is the future";
    size_t message_len = strlen(message);

    // Create Falcon-512 signature object
    sig = OQS_SIG_new("Falcon-512");
    if (sig == NULL) {#include <stdio.h>
#include <string.h>
#include <oqs/oqs.h>

int main() {
    OQS_SIG *sig = NULL;
    uint8_t *public_key = NULL;
    uint8_t *secret_key = NULL;
    uint8_t *signature = NULL;

    size_t public_key_l
        printf("Failed to initialize Falcon-512 signature algorithm\n");
        return 1;
    }

    public_key_len = sig->length_public_key;
    secret_key_len = sig->length_secret_key;
    signature_len = sig->length_signature;

    public_key = malloc(public_key_len);
    secret_key = malloc(secret_key_len);
    signature = malloc(signature_len);

    if (!public_key || !secret_key || !signature) {
        printf("Memory allocation failed\n");
        OQS_SIG_free(sig);
        return 1;
    }

    // Key generation
    if (OQS_SIG_keypair(sig, public_key, secret_key) != OQS_SUCCESS) {
        printf("Keypair generation failed\n");
        goto cleanup;
    }

    // Sign the message
    size_t sig_len_actual;
    if (OQS_SIG_sign(sig, signature, &sig_len_actual, (const uint8_t*)message, message_len, secret_key) != OQS_SUCCESS) {
        printf("Signing failed\n");
        goto cleanup;
    }

    // Verify the signature
    if (OQS_SIG_verify(sig, (const uint8_t*)message, message_len, signature, sig_len_actual, public_key) == OQS_SUCCESS) {
        printf("Signature verified successfully!\n");
    } else {
        printf("Signature verification failed.\n");
    }

cleanup:
    free(public_key);
    free(secret_key);
    free(signature);
    OQS_SIG_free(sig);

    return 0;
}

