# Experiment 002 — Read an account's balance

> **Lesson 2.** Build on Lesson 1 by asking a different question: not "what block are we on?" but "how much ETH does this address have?" ~10 minutes.

## What you'll learn

- That an **address** is the public, shareable handle for an account on Base.
- That balances are stored in **wei** — the smallest unit of ETH (1 ETH = 10^18 wei) — and the network always returns BigInts.
- That viem's `formatEther()` is the standard way to convert wei into a human-readable ETH string.
- The difference between an **EOA** (a regular wallet address) and a **contract** address — both have balances, both are read the same way.

## Run it

From this folder:

```bash
npm install
npm start
```

Expected output:

```
0x0000000000000000000000000000000000000000
  raw wei: 0
  in ETH:  0

0x4200000000000000000000000000000000000006
  raw wei: <some number>
  in ETH:  <some number>
```

The zero address will always be 0. The second address (Base's WETH9 contract on Sepolia) will probably have a non-zero balance because people interact with it.

## What just happened

Open [`read-balance.js`](./read-balance.js). New things since Lesson 1:

1. **`getBalance({ address })`** — same client, new method. Reads any address's balance in wei.
2. **wei vs ETH** — wei is the smallest unit. ETH is `wei / 10^18`. The network only knows about wei; humans only want to read ETH. Always convert at the boundary.
3. **`formatEther(wei)`** — viem's converter. Takes a BigInt of wei, returns a string like `"0.0001"`.

The mirror function is `parseEther("0.0001")` which goes the other way (ETH string → BigInt wei). You'll meet that in Lesson 4 when you start sending transactions.

## Reference (only when you need it)

- viem `getBalance`: https://viem.sh/docs/actions/public/getBalance
- viem `formatEther`: https://viem.sh/docs/utilities/formatEther
- Base Sepolia explorer: https://sepolia.basescan.org/ — paste either address from above to see what activity it has.

## Things that might break

| Symptom | Likely cause | Fix |
|---|---|---|
| `Invalid address` error | Address is missing the `0x` prefix or has a typo | Addresses are always 42 characters: `0x` + 40 hex digits. |
| Balance shows as `0` for an address you expected to have ETH | You're reading **Sepolia** but the address has ETH on **mainnet** | Same address, different chain, different balance. Check the address on https://sepolia.basescan.org/, not basescan.org. |
| `TypeError: Cannot mix BigInt and other types` | You did math like `wei / 1e18` instead of using `formatEther` | Use `formatEther(wei)` — JS won't let you mix BigInts and regular numbers. |

## After it works

1. **Write down what you saw.** Especially: did anything about wei vs ETH feel weird? That intuition gap is the lesson.
2. **Find your own address to read.** Go to https://sepolia.basescan.org/, click any recent transaction, copy a `From` or `To` address, paste it into the `addresses` array, and re-run.
3. **One small modification.** Change the script to also print the address's **transaction count** (also called the **nonce**). Hint: viem has `getTransactionCount({ address })`. Try first, look it up if stuck.

## What's next (Lesson 3 preview)

You've read balances of *other people's* addresses. Lesson 3: get **your own** address (either bring an existing wallet or generate a fresh testnet-only one in code), drip free testnet ETH from a faucet into it, and watch the balance change in real time. That's the first time you'll have skin in the game — even if it's fake skin.
