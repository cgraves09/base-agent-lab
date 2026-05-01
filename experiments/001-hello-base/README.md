# Experiment 001 — Hello, Base

> **Lesson 1.** Your goal: prove your machine can talk to Base Sepolia (Base's testnet). No wallet. No contract. No money. Just a script that reads one number off the chain. ~10 minutes.

## What you'll learn

- That "talking to a blockchain" is, mechanically, just an HTTP request to an **RPC endpoint**.
- The difference between **mainnet** (real money) and **Sepolia** (testnet — fake money, free).
- What [`viem`](https://viem.sh/) is and why we're using it instead of older libraries.

You will _not_ learn smart contracts, wallets, or transactions today. Those are later experiments. Today is dial tone.

## Run it

From this folder:

```bash
npm install
npm start
```

Expected output (your block number will be larger):

```
✅ Connected to Base Sepolia (chain id 84532)
   Latest block: 16234891
```

If you see a block number, **you're done.** You just read live state off Base. Go log it in [`base-agent-notes/daily/`](#after-it-works).

## What just happened

Open [`read-block.js`](./read-block.js). It's ~10 lines of real code. Three concepts to understand:

1. **`createPublicClient`** — a read-only connection. There's also a "wallet client" that can sign transactions, which we'll meet in a later experiment. Today we're just reading.
2. **`baseSepolia`** — viem ships with chain metadata for Base, Base Sepolia, Ethereum, and dozens more. This includes the chain ID (`84532` for Base Sepolia) and a default public RPC URL.
3. **`http()`** — the transport. By default it uses Base's public RPC. Public RPCs are rate-limited and fine for learning. Later, when you build something real, you'll swap in a paid provider (Alchemy, QuickNode, Coinbase Developer Platform).

That's the whole architecture for today: **your code → HTTP → a node → Base Sepolia.**

## Reference (only when you need it)

- viem `getBlockNumber`: https://viem.sh/docs/actions/public/getBlockNumber
- Base Sepolia chain info: https://docs.base.org/chain/network-information
- Base Sepolia explorer: https://sepolia.basescan.org/ — paste your block number into the search and see the block you just read.

## Things that might break

| Symptom | Likely cause | Fix |
|---|---|---|
| `Error: fetch failed` / `ECONNREFUSED` | No internet, or the public RPC is rate-limiting you | Wait 30s and retry. If it persists, swap to another public RPC (see Base docs above). |
| `Cannot use import statement outside a module` | Your Node is older than 20, or `package.json` got `"type": "module"` stripped | Run `node --version` (need ≥20). Verify `package.json` still has `"type": "module"`. |
| `Cannot find package 'viem'` | `npm install` didn't run or failed | Run `npm install` in this folder. |
| Block number doesn't change between runs | Cache or you ran them within a few seconds — Base blocks are ~2s apart | Wait 5s and re-run. |

If something breaks in a way that's not above — that's the lesson. Open `base-agent-notes/daily/YYYY-MM-DD.md`, write what happened, and we debug together.

## After it works

Don't move on yet. Do this first:

1. **Log it.** Copy `base-agent-notes/daily/TEMPLATE.md` → `base-agent-notes/daily/2026-04-30.md` (use today's date). Answer the prompts, especially:
   - *What surprised me?* (e.g. "I expected this to be harder")
   - *What didn't make sense?* (e.g. "why is the block number a BigInt?")
2. **Look at the block on the explorer.** Copy the block number from your output and paste it into https://sepolia.basescan.org/. Look around. What's in a block?
3. **One small modification.** Change `read-block.js` to also print the block's **timestamp** and the number of **transactions** in it. (Hint: `client.getBlock()` instead of `getBlockNumber()`.) Don't look up the answer first — try, fail, then look it up. The failure is the lesson.

## What's next (Lesson 2 preview)

Now that you can read **a** block, the next lesson reads a **specific account's balance**. Then we'll get you a free Sepolia ETH faucet drip and watch a balance change in real time. Then we'll send your first transaction. Each step is one new concept.
