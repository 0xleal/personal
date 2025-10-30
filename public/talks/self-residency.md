# Self Residency

## Building human-first infrastructure

30th Oct 2025 by [0xleal](https://x.com/0x_leal)

---

## One Theme, Two Apps

**Token Distributor**

- Compliant airdrops without KYC
- Gas-efficient multi-sender (>1k addresses)

**Builder Tokens**

- Human-verified token launches
- Onchain goals with prediction markets

---

## The Problem

Current token distribution is broken:

- Bots exploit airdrops
- KYC processes are invasive and centralized
- Gas costs make large distributions prohibitively expensive
- Fair launches aren't really fair

---

# Token Distributor

Open source, compliant distribution without the honeypot

---

## How It Works

Self's zero-knowledge identity verification enables compliant token distribution **without collecting any personal data**.

```
User → Scans Passport NFC → Self Verification
  ↓
Cryptographic Proof (30 days)
  ↓
✓ OFAC Screened  ✓ Human  ✗ No PII Revealed
```

**Economic Sybil Resistance**: Small verification fee + time limit

---

## Airdrop Mode

Recipients claim tokens by proving they're compliant humans

```
┌─────────────┐
│   Creator   │
│  Sets Rules │
└──────┬──────┘
       │
       ↓
┌─────────────────────────────┐
│    Smart Contract Pool      │
│  - Token Amount             │
│  - Allocation per Address   │
└──────┬──────────────────────┘
       │
       ↓
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│  Claimer #1      │    │  Claimer #2      │    │  Claimer #N      │
│  Proves via Self │    │  Proves via Self │    │  Proves via Self │
│  ✓ Gets Tokens   │    │  ✓ Gets Tokens   │    │  ✓ Gets Tokens   │
└──────────────────┘    └──────────────────┘    └──────────────────┘
```

**Result**: Only real people from allowed jurisdictions can participate

---

## Distribute Mode

Sender verifies once, batch-sends to thousands

```
┌──────────────────┐
│     Sender       │
│ Self Verified ✓  │
└────────┬─────────┘
         │
         ↓
┌─────────────────────────────────┐
│   Verifiable Multi-Send         │
│   - 1,000+ addresses            │
│   - Single transaction          │
│   - Linear gas cost (70%+ less) │
└────────┬────────────────────────┘
         │
         ↓
┌────────┴─────────────────────┐
│  addr1  addr2  addr3  ...    │
│  100tk  200tk  150tk  ...    │
└──────────────────────────────┘
```

**No centralized platform. No data collection. Open source.**

---

## Gas Efficiency Deep Dive

Traditional multi-send: O(n) gas cost (exponential growth)

**Verifiable Multi-Send**: Linear gas cost

```
Gas Cost Comparison (sending to 1000 addresses)

Traditional:  ████████████████████████  ~$500
Multi-Send:   ███████                   ~$150

Traditional:  Check × 1000
Multi-Send:   Verify once + batch process
```

Supports >1,000 addresses in a single transaction

---

# Builder Tokens

Human-first token launches with onchain accountability

---

## The Vision

Most tokens focus on content or memes.

**Builder tokens are different:**

- Token represents the **builder**, not just content
- Utility: Reputation + supporting the builder
- Builders earn fees on trades
- Market exposure helps grow their projects

---

## Human-Verified Launches

```
┌─────────────────┐
│  Token Creator  │
│  (Self Verified)│
└────────┬────────┘
         │
         ↓
┌─────────────────────────┐
│   Token Launch          │
│   ✓ Created by Human    │
│   ✓ Initial LP Access   │
│     Limited to Humans   │
└────────┬────────────────┘
         │
         ↓
┌────────┴──────────────────┐
│  Uniswap Hook             │
│  - Lower fees for humans  │
│  - Self verification req  │
└───────────────────────────┘
```

Removes bot exploitation from fair launches

---

## Onchain Goals & Prediction Markets

Make building more **engaging**, **open**, and **accountable**

```
┌──────────────────┐
│  Builder Sets    │
│  Public Goal     │
│  "10k users by Q2"│
└────────┬─────────┘
         │
         ↓
┌─────────────────────────────┐
│  Prediction Market Opens    │
│  - YES: 0.6 ETH             │
│  - NO:  0.4 ETH             │
└────────┬────────────────────┘
         │
         ↓
┌─────────────────────────────┐
│  Onchain Oracle Verifies    │
│  - Transaction attribution  │
│  - Verified computation     │
│  - Proves metrics           │
└────────┬────────────────────┘
         │
         ↓
    ✓ Resolved
```

---

## Goal Verification

Goals must be **trackable onchain** or use a **specialized oracle**

**Powered by:**

- [ERC8021](https://oxlib.sh/ercs/erc8021/Attribution) for transaction attribution
- Custom analytics with distributed, verified computation

**Examples:**

- Number of visitors
- Transaction count (your protocol or others)
- Any verifiable engagement metric

**Result**: Transparent accountability, gamified building

---

## The Full Picture

```
                    ┌─────────────────┐
                    │   Self Network  │
                    │  ZK Identity    │
                    └────────┬────────┘
                             │
                ┌────────────┴───────────┐
                │                        │
                ↓                        ↓
    ┌──────────────────┐    ┌──────────────────┐
    │ Token Distributor│    │  Builder Tokens  │
    │                  │    │                  │
    │ • Airdrops       │    │ • Human Launches │
    │ • Multi-send     │    │ • Lower Fees     │
    │ • Compliant      │    │ • Onchain Goals  │
    └──────────────────┘    └──────────────────┘
            │                        │
            └────────┬───────────────┘
                     │
                     ↓
           ┌────────────────┐
           │  Open Source   │
           │  Infrastructure│
           └────────────────┘
```

---

## Key Benefits

**Privacy-Preserving**

- No PII collected
- Zero-knowledge proofs

**Compliant**

- OFAC screening built-in
- No honeypots or legal gray areas

**Efficient**

- 70%+ gas savings
- Linear scaling

**Human-First**

- Sybil resistant
- Bot-proof launches

---

## Live Demos

**Token Distributor (Verifiable Multi-Send)**
[self-verifiable-multisend.vercel.app](https://self-verifiable-multisend.vercel.app/)

**Builder Tokens (Human Tokens)**
[human-tokens.vercel.app](https://human-tokens.vercel.app)

---

## Tech Stack Highlights

- Self Network for ZK identity
- Solidity smart contracts
- Uniswap v4 hooks
- ERC8021 for attribution
- Verifiable computation oracles

---

# Building the Future

Where compliance meets privacy.

Where humans come first.

Where builders are accountable.

---

# Thanks!

Built during Self Residency Week 3

**Try the demos:**

- [Verifiable Multi-Send](https://self-verifiable-multisend.vercel.app/)
- [Human Tokens](https://human-tokens.vercel.app)

---

## Questions?

Let's build compliant, human-first infrastructure together.
