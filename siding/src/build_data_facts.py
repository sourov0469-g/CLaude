"""Published price distributions (austinprosiding.com cost guides, read 29 Oct 2026)."""
HIST = dict(
    siding=dict(n=415, bands=[('Under $2k', 12), ('$2k–$5k', 33), ('$5k–$10k', 70), ('$10k–$15k', 107), ('$15k–$20k', 92), ('$20k–$25k', 53), ('$25k–$30k', 22), ('$30k–$40k', 19), ('$40k–$50k', 4), ('$50k–$60k', 1), ('$60k–$75k', 2)], median=3, mid=(2, 4)),
    windows=dict(n=376, bands=[('Under $2k', 12), ('$2k–$5k', 40), ('$5k–$10k', 96), ('$10k–$15k', 79), ('$15k–$20k', 50), ('$20k–$25k', 30), ('$25k–$30k', 19), ('$30k–$40k', 30), ('$40k–$50k', 13), ('$50k–$60k', 4), ('$75k–$100k', 2), ('$100k+', 1)], median=3, mid=(2, 5)),
)
assert sum(c for _, c in HIST['siding']['bands']) == 415
assert sum(c for _, c in HIST['windows']['bands']) == 376
