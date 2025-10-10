#include <stdio.h>
#include <oqs/oqs.h>

void list_KEM_algorithms() {
    printf("KEM Algorithms:\n");
    for (size_t i = 0; i < OQS_KEM_alg_count(); i++) {
        const char *kem_name = OQS_KEM_alg_identifier(i);
        OQS_KEM *kem = OQS_KEM_new(kem_name);
        if (kem) {
            printf("Algorithm: %s\n", kem_name);
            printf("Public Key Length: %zu bytes\n", kem->length_public_key);
            printf("Secret Key Length: %zu bytes\n", kem->length_secret_key);
            printf("Ciphertext Length: %zu bytes\n\n", kem->length_ciphertext);
            OQS_KEM_free(kem);
        }
    }
}

void list_SIG_algorithms() {
    printf("Signature Algorithms:\n");
    for (size_t i = 0; i < OQS_SIG_alg_count(); i++) {
        const char *sig_name = OQS_SIG_alg_identifier(i);
        OQS_SIG *sig = OQS_SIG_new(sig_name);
        if (sig) {
            printf("Algorithm: %s\n", sig_name);
            printf("Public Key Length: %zu bytes\n", sig->length_public_key);
            printf("Secret Key Length: %zu bytes\n", sig->length_secret_key);
            printf("Signature Length: %zu bytes\n\n", sig->length_signature);
            OQS_SIG_free(sig);
        }
    }

}

int main() {
    // Initialize the liboqs library


    // List available KEM and SIG algorithms
    list_KEM_algorithms();
    list_SIG_algorithms();

    return 0;
}
