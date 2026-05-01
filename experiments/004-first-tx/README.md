# Experiment 004 — Send your first transaction

> **Lesson 4.** Sign and broadcast your first transaction on Base Sepolia. You go from "reader" to "writer." ~10 minutes. Requires Lesson 3 done first (you need testnet ETH in an address you control).

## What you'll learn

- The difference between a **public client** (reads) and a **wallet client** (signs + sends).
- What actually goes into a transaction: nonce, gas, value, recipient, signature.
- That broadcasting and confirming are two different things — `sendTransaction` returns a hash immediately, but the network has to *include* and *finalize* the tx before the state actually changes.
- What a **receipt** is and why you wait for one.
- That **gas** is real even on testnet — every transaction costs something, deducted from your balance.

## Run it

### Step 1 — wire up `.env`

```bash
cp .env.example .env
```

Edit `.env`:
- `PRIVATE_KEY` — the testnet key from Lesson 3.
- `TO_ADDRESS` — anywhere you want to send to. Easiest options:
  - The zero address `0x0000000000000000000000000000000000000000` (burn it — fine for learning)
  - A second address you generate with Lesson 3's `generate-key.js`
  - Your real wallet's address (just to receive — totally fine)
- `AMOUNT_ETH` — optional, defaults to `0.0001`. Keep it tiny so one faucet drip lasts many lessons.

### Step 2 — send

```bash
npm install
npm start
```

Expected output:
```
From:   0xabc...
To:     0x000...
Amount: 0.0001 ETH

Current balance: 0.05 ETH

Sending...
✅ Broadcast. Tx hash: 0xdeadbeef...
   View it: https://sepolia.basescan.org/tx/0xdeadbeef...

Waiting for confirmation...
✅ Confirmed in block 16234999
   Status:   success
   Gas used: 21000

New balance: 0.0498... ETH
(Spent: 0.0001... ETH — that's 0.0001 sent + gas.)
```

Open the Basescan link. **You just made a permanent record on a public blockchain.** It's on testnet, so it doesn't matter — but the mechanics are exactly the same as mainnet.

## What just happened

Open [`send-tx.js`](./send-tx.js).

**Five concepts:**

1. **Account.** `privateKeyToAccount(key)` wraps the raw private key in an object that knows how to sign. The account has methods like `signMessage`, `signTransaction`. You almost never call these directly — viem does it for you.

2. **Two clients.** `createPublicClient` for reads (no key needed), `createWalletClient` for writes (account required). Same chain, same transport, different abilities. This separation is intentional: most of your code only needs read access, and you don't want to accidentally mix signing capability into places that don't need it.

3. **`sendTransaction`.** Takes `{ to, value }` at minimum. viem fills in:
   - **nonce** — your account's transaction counter (prevents replay)
   - **gas** — estimated automatically
   - **chainId** — comes from the wallet client's chain config
   - **signature** — produced by the account
   It returns a **hash** immediately. The hash is just an identifier — the tx hasn't necessarily landed yet.

4. **`waitForTransactionReceipt`.** Polls the network until the tx is included in a block AND confirmed. Returns the **receipt**: status (`success` / `reverted`), block number, gas actually used, logs emitted, etc. Anything that happened *because of* your tx is in the receipt.

5. **Gas.** Every transaction costs something — even a simple ETH transfer (always 21,000 gas units). The "gas price" on Base is currently very low, so on testnet your spend is microscopic. Still, you'll see your balance decrease by `amount + gas`. Mainnet works the same way; the price is just real.

## Reference (only when you need it)

- viem `sendTransaction`: https://viem.sh/docs/actions/wallet/sendTransaction
- viem `waitForTransactionReceipt`: https://viem.sh/docs/actions/public/waitForTransactionReceipt
- viem wallet clients: https://viem.sh/docs/clients/wallet
- Base Sepolia explorer: https://sepolia.basescan.org/

## Things that might break

| Symptom | Likely cause | Fix |
|---|---|---|
| `❌ Not enough balance` | Faucet hasn't landed yet, or you set `AMOUNT_ETH` higher than your drip | Wait, or lower `AMOUNT_ETH` in `.env` |
| `❌ .env must include...` | You skipped Step 1 | `cp .env.example .env`, fill values, retry |
| `Invalid private key` | Missing `0x` prefix, or wrong length | Private key is `0x` + 64 hex chars (66 chars total) |
| Transaction broadcasts but never confirms | Public RPC is slow or congested | `waitForTransactionReceipt` will keep waiting; usually under 30s. If much longer, check the hash on Basescan directly. |
| Receipt status is `reverted` | The network executed your tx and rejected it | Look at the failed tx on Basescan — it'll show why. For a simple ETH send, the only way this happens is if you sent to a contract that refuses ETH. |
| `nonce too low` error | Two scripts ran simultaneously and one used your nonce | Just retry — viem will fetch the new nonce. |

## After it works

1. **Write down what you saw.** The lag between "broadcast" and "confirmed" is worth a sentence. So is the gas cost — was it more or less than you expected?
2. **Read the tx on Basescan.** Click the link from the script output. Look at all the fields. There's a "Logs" section (empty for plain ETH sends — it'll fill in once you start interacting with contracts in later lessons).
3. **Send a second one.** Run the script again. Notice the nonce has incremented. Look at your address on Basescan — you now have two outgoing txs.
4. **Try a tiny variation.** Send to a different address. Send a different amount. Each variation is real.

## When nonce stops being something viem hides from you

In this lesson, viem fetches your nonce automatically. That works because exactly one script is signing from your key at a time. The moment you have **multiple processes (or agents) signing from the same private key in parallel**, that comfort disappears.

The rule: every transaction from an account has a strictly increasing nonce. If you broadcast nonce 10 before nonce 9 has landed, the network holds nonce 10 in the mempool and refuses to include it until nonce 9 shows up. If nonce 9 never arrives, nonce 10 hangs forever.

The failure modes get nasty fast:

- **Two agents read the same nonce, both sign, one wins.** The loser's tx is stuck or replaced. Money/state is lost depending on what the tx did.
- **An agent gets nonce 11 while nonce 10 is still pending.** Nonce 11 sits in mempool until 10 confirms — looks like the network is "slow" but it's actually waiting.
- **One agent crashes mid-broadcast, leaving a gap.** Every later tx hangs until you backfill the gap (often by sending a 0-ETH self-transfer at the missing nonce).

There are a few standard ways to deal with it, in increasing order of complexity:

1. **One signer per key.** Serialize all signing through a single process. Simple, slow, doesn't scale.
2. **Centralized nonce manager.** Hold the nonce in shared state (Redis, a DB) and have every agent atomically increment it before signing. You're now the source of truth, not the chain.
3. **One key per agent.** Skip the contention entirely — give each agent its own funded key. Trades coordination cost for fund-management cost.
4. **A signer service.** Delegate signing to a single service (e.g. a KMS-backed transaction broker) so the nonce never leaves one process. This is what production multi-agent systems usually end up doing.

For the lessons in this repo you'll only have one signer at a time, so viem's automatic nonce handling is fine. But if you ever scale to "multiple agents transacting from the same key" — keep this section in mind. The chain doesn't forgive nonce gaps.

## What's next

You've now read state, written state, watched real-time updates, and sent transactions. That's the full "EOA on Base" skill set.

Lesson 5 is the next big jump: **deploy your first smart contract.** That requires picking a framework (Foundry vs Hardhat) and getting comfortable with Solidity basics. Worth a fresh check-in before starting — there are real choices to make there.
