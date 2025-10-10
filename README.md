# Exploring Post-Quantum Cryptography with liboqs

## Objective
The goal of this assignment is to:
1. Introduce students to the **liboqs** library.
2. Compare **classical cryptographic algorithms** (RSA, ECC) with **post-quantum algorithms** (Kyber, Dilithium, Falcon, etc.).
3. Gain hands-on experience with **Key Encapsulation Mechanisms (KEMs)** and **Digital Signature Schemes (SIGs)** in liboqs.
4. Understand the integration challenges of post-quantum cryptography in **real-world systems**.

---

## Setup
- Official liboqs website: [https://openquantumsafe.org/liboqs/](https://openquantumsafe.org/liboqs/)
- Follow the steps below to download and install **liboqs**:

Note: Make sure your system has already installed lcrypto library and ssl library.

### Step 1: Install liboqs and CMake
```bash
sudo apt update
sudo apt install git cmake build-essential

# Clone the liboqs repository
git clone --branch main https://github.com/open-quantum-safe/liboqs.git
cd liboqs

# Create build directory and compile
mkdir build && cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
make
sudo make install

## compilation and Running Programs:
gcc file_name.c -o file_name -loqs -lcrypto -lssl

## run:
./file_name

## Tasks

### Task 1: Getting Started
- List all available **KEM** and **SIG** algorithms supported in your build of liboqs.
- Write a C program that prints the following for each algorithm:
  - Algorithm name
  - Public key length
  - Secret key length
  - Ciphertext length (for KEMs)
- **Hints:**  
  - Use `OQS_KEM_alg_count()`, `OQS_KEM_alg_identifier()` for KEMs.  
  - Use `OQS_SIG_alg_count()` for digital signature algorithms.

---

### Task 2: Key Encapsulation (KEM)
- Implement a key exchange demo using a post-quantum KEM (e.g., **Kyber512**):
  1. **Alice** generates a keypair.
  2. **Bob** uses Alice’s public key to encapsulate a shared secret.
  3. **Alice** decapsulates the ciphertext to recover the same shared secret.
  4. Print both secrets and confirm equality.
- Extend the program to measure:
  - Key generation time
  - Encapsulation time
  - Decapsulation time

---

### Task 3: Digital Signatures (SIG)
- Implement a digital signature demo using a post-quantum signature algorithm (e.g., **Dilithium2**):
  1. Generate a keypair.
  2. Sign a message: `"Post-Quantum Cryptography is the future"`.
  3. Verify the signature.
  4. Print success/failure.
- Compare key/signature sizes with **RSA-2048** or **ECDSA P-256** (using OpenSSL or Crypto++).

---

### Task 4: Comparative Study
- Compare **PQC schemes** with classical algorithms:
  - Key sizes
  - Signature/ciphertext sizes
  - Execution times
- Write a short report (2–3 pages) discussing:
  - Which PQC algorithm seems practical for **real-world deployment**
  - Trade-offs between **security, performance, and key sizes**
  - How **hybrid schemes** (PQC + classical) could be useful


### You can make Directory setup as:
  Lab2/
├── README.md
├── KEM/
│   ├── kem_demo.c
│   └── ...
├── SIG/
│   ├── sig_demo.c
│   └── ...
├── Reports/
│   └── PQC_Comparative_Report.pdf
└── Notes/
    └── setup_instructions.txt
