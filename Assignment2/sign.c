#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <oqs/oqs.h>

int main() {
    OQS_STATUS rc;
    const char *alg_name = OQS_SIG_alg_dilithium_2;  // Use Dilithium2
    OQS_SIG *sig = NULL;

    printf("Algorithm: %s\n", alg_name);

    // Initialize the signature object
    sig = OQS_SIG_new(alg_name);
    if (sig == NULL) {
        fprintf(stderr, "Error initializing signature algorithm.\n");
        return EXIT_FAILURE;
    }

    // Allocate memory for keys and signature
    uint8_t *public_key = malloc(sig->length_public_key);
    uint8_t *secret_key = malloc(sig->length_secret_key);
    uint8_t *signature = malloc(sig->length_signature);

    if (!public_key || !secret_key || !signature) {
        fprintf(stderr, "Memory allocation failed.\n");
        return EXIT_FAILURE;
    }

    // Generate keypair
    rc = OQS_SIG_keypair(sig, public_key, secret_key);
    if (rc != OQS_SUCCESS) {
        fprintf(stderr, "Keypair generation failed.\n");
        return EXIT_FAILURE;
    }
    printf("Keypair generated successfully.\n");

    // Message to sign
    const char *message = "Post-Quantum Cryptography is the future";
    size_t message_len = strlen(message);

    size_t sig_len;
    // Sign the message
    rc = OQS_SIG_sign(sig, signature, &sig_len, (const uint8_t *)message, message_len, secret_key);
    if (rc != OQS_SUCCESS) {
        fprintf(stderr, "Signing failed.\n");
        return EXIT_FAILURE;
    }
    printf("Message signed successfully.\n");

    // Verify the signature
    rc = OQS_SIG_verify(sig, (const uint8_t *)message, message_len, signature, sig_len, public_key);
    if (rc == OQS_SUCCESS) {
        printf("✅ Signature verification SUCCESSFUL!\n");
    } else {
        printf("❌ Signature verification FAILED!\n");
    }

    // Print key and signature sizes
    printf("\n--- Size Comparison ---\n");
    printf("Public key size   : %zu bytes\n", sig->length_public_key);
    printf("Secret key size   : %zu bytes\n", sig->length_secret_key);
    printf("Signature size    : %zu bytes\n", sig->length_signature);

    // Cleanup
    free(public_key);
    free(secret_key);
    free(signature);
    OQS_SIG_free(sig);

    return EXIT_SUCCESS;
}
