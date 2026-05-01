# Experiment 003 — Faucet drip + watch your balance change

> **Lesson 3.** Get free Base Sepolia ETH from a faucet, send it to an address you control, and watch your balance update in real time. ~15 minutes (most of which is waiting on the faucet).

## What you'll learn

- The relationship between **private keys**, **addresses**, and **accounts**.
- That on testnet you can generate a fresh key in 2 lines of code, but **on mainnet you should never** — real keys belong in a wallet.
- How a faucet works and why testnets need them.
- How to poll the chain to watch state change in real time.

## Two ways to do this lesson

**Path A — bring your own wallet (easier if you already have one)**
You already use Coinbase Wallet / Rabby / MetaMask / a hardware wallet. Open it, switch to Base Sepolia, copy your address. Skip the "generate a key" step below.

**Path B — generate a fresh testnet-only address (no wallet needed)**
You don't have a wallet yet, or you don't want to mix learning with your real one. We'll generate a brand new private key in code. ⚠️ **This key is for testnet learning only.** Never send real ETH to it. When you're done with the lessons, throw it away.

Both paths converge after you have an address.

## Run it

### Step 1 — get an address

**Path A:** copy your existing wallet's address.

**Path B:**
```bash
npm install
npm run generate
```

This prints a fresh `Address` and `Private key`. Copy them — we'll use them in the next step.

### Step 2 — wire up `.env`

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` and paste your address (and, if Path B, your private key). The `.env` file is gitignored — it will not get committed.

### Step 3 — drip from a faucet

Open a Base Sepolia faucet in your browser and paste your address. Two reliable options:

- **Coinbase Developer Platform faucet** — https://portal.cdp.coinbase.com/products/faucet (sign-in required, generous drip)
- **Alchemy Base Sepolia faucet** — https://www.alchemy.com/faucets/base-sepolia (sign-in required)

Click "send" or "drip." Faucets typically deliver within 10–30 seconds.

### Step 4 — watch the balance

In a new terminal, in this folder:
```bash
npm run watch
```

You'll see something like:
```
Watching 0xabc... on Base Sepolia.
Polling every 5s. Ctrl+C to stop.

[14:22:01] 0 ETH
[14:22:21] 0.05 ETH (Δ 0.05 ETH)
```

The first line prints immediately. The second prints when the faucet's transaction lands and your balance changes. **Ctrl+C to stop when you've seen it work.**

## What just happened

Open [`generate-key.js`](./generate-key.js) and [`watch-balance.js`](./watch-balance.js).

**Three concepts:**

1. **Private key → address.** A private key is a 256-bit random number. The address is derived from it deterministically. Anyone with the private key controls everything sent to that address — that's why mainnet keys belong in wallets, not files.

2. **Faucets.** A faucet is just an account someone funds with testnet ETH and lets the public drip from. Testnet ETH is intentionally worthless — you can't trade it for anything — which is what makes it safe to give away.

3. **Polling.** `watch-balance.js` calls `getBalance` every 5 seconds in a loop. This is the simplest way to "watch" chain state. Later, more efficient: use viem's `watchBlocks` or WebSocket transports — but polling is fine for learning.

## Reference (only when you need it)

- viem accounts: https://viem.sh/docs/accounts/local/privateKeyToAccount
- viem `generatePrivateKey`: https://viem.sh/docs/accounts/local/generatePrivateKey
- Base Sepolia chain info: https://docs.base.org/chain/network-information

## Things that might break

| Symptom | Likely cause | Fix |
|---|---|---|
| `Couldn't read .env` | You skipped Step 2 | `cp .env.example .env`, fill in the values, retry |
| Faucet says "rate-limited" | They're protecting against farming | Try a different faucet from the list above, or wait the cooldown |
| Faucet says "captcha failed" | Some faucets require a connected wallet or a small mainnet balance | Use Coinbase Developer Platform faucet — usually most permissive |
| Balance never changes | Faucet sent to mainnet by accident, or you pasted a wallet address that's on a different network | Check your address on https://sepolia.basescan.org/. If you see the incoming tx, you're fine — `watch-balance.js` will catch up. |
| Loop just keeps printing the same balance | The faucet hasn't sent yet, or its tx hasn't confirmed | Wait. Most faucets land within 30s; some take a few minutes. |

## After it works

1. **Write down what you saw.** Especially: did the lag between "faucet says sent" and "balance changes" surprise you? Did anything about the key/address split feel weird?
2. **Look up your address on Sepolia Basescan** (https://sepolia.basescan.org/). You'll see the incoming transaction from the faucet. Click into it. Notice: gas, block number, timestamp, the faucet's address.
3. **Why you can do this on testnet but not mainnet:** think through what would happen if you printed your private key like `generate-key.js` does, but with mainnet ETH inside. Anyone who saw your screen, your terminal scrollback, or your shell history would own that ETH.

## What's next (Lesson 4 preview)

You have an address with testnet ETH. Lesson 4: **send a transaction.** You'll send a tiny amount of your faucet ETH to another address, wait for the receipt, and view your transaction on Sepolia Basescan. That's the moment you go from "reader" to "writer" on Base.
