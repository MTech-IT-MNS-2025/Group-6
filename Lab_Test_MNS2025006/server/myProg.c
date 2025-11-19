int modexp(int base, int exp, int mod) {
    long long result = 1;
    long long b = base % mod;

    while (exp > 0) {
        if (exp & 1)
            result = (result * b) % mod;
        b = (b * b) % mod;
        exp >>= 1;
    }
    return (int)result;
}


