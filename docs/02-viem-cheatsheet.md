# viem cheatsheet

The lessons in this repo all use [viem](https://viem.sh/) to talk to Base. viem ends up being the main new surface area — Base itself is "just" a chain. This page collects every viem import and method used across the experiments so you don't have to re-derive them from each lesson's README.

> Use this as a reference, not a tutorial. Each entry links to viem's docs for the deep dive.

## Clients — your connection to a chain

| Import | What it does | First used in |
|---|---|---|
| [`createPublicClient`](https://viem.sh/docs/clients/public) | Read-only client. Reads balances, blocks, receipts. No signing capability. | [Lesson 1](../experiments/001-hello-base/) |
| [`createWalletClient`](https://viem.sh/docs/clients/wallet) | Signing client. Sends transactions. Requires an `account`. | [Lesson 4](../experiments/004-first-tx/) |
| [`http`](https://viem.sh/docs/clients/transports/http) | Default HTTP transport. Pass no URL → uses the chain's public RPC. | [Lesson 1](../experiments/001-hello-base/) |

## Chain metadata

| Import | What it does | First used in |
|---|---|---|
| [`baseSepolia`](https://github.com/wevm/viem/blob/main/src/chains/definitions/baseSepolia.ts) | Pre-built chain config: chain id `84532`, name, default public RPC, explorer URL. Imported from `viem/chains`. | [Lesson 1](../experiments/001-hello-base/) |
| `baseSepolia.id`, `baseSepolia.name` | Chain ID and human name — useful for status logging. | Lesson 1 |

## Reading state (public client methods)

| Method | What it returns | First used in |
|---|---|---|
| [`getBlockNumber()`](https://viem.sh/docs/actions/public/getBlockNumber) | Latest block number as `bigint`. | [Lesson 1](../experiments/001-hello-base/) |
| [`getBlock()`](https://viem.sh/docs/actions/public/getBlock) | Full block object — timestamp, tx count, gas used, etc. | Lesson 1 bonus |
| [`getBalance({ address })`](https://viem.sh/docs/actions/public/getBalance) | Address balance in wei (`bigint`). | [Lesson 2](../experiments/002-read-balance/) |
| [`getTransactionCount({ address })`](https://viem.sh/docs/actions/public/getTransactionCount) | The address's nonce — number of txs it has sent. | Lesson 2 bonus |
| [`waitForTransactionReceipt({ hash })`](https://viem.sh/docs/actions/public/waitForTransactionReceipt) | Polls until tx is included + confirmed; returns receipt with status, gas used, logs. | [Lesson 4](../experiments/004-first-tx/) |

## Writing state (wallet client methods)

| Method | What it does | First used in |
|---|---|---|
| [`sendTransaction({ to, value })`](https://viem.sh/docs/actions/wallet/sendTransaction) | Signs + broadcasts a transaction. Returns the tx hash. viem fills in nonce, gas, chain id, signature. | [Lesson 4](../experiments/004-first-tx/) |

## Accounts (signing)

| Import | What it does | First used in |
|---|---|---|
| [`generatePrivateKey()`](https://viem.sh/docs/accounts/local/generatePrivateKey) | Creates a fresh 256-bit random private key. **Testnet learning only.** | [Lesson 3](../experiments/003-faucet-drip/) |
| [`privateKeyToAccount(key)`](https://viem.sh/docs/accounts/local/privateKeyToAccount) | Wraps a private key in an `account` that knows how to sign. Has a `.address` property. | [Lesson 3](../experiments/003-faucet-drip/) |

## Unit conversion

| Function | What it does | First used in |
|---|---|---|
| [`formatEther(wei)`](https://viem.sh/docs/utilities/formatEther) | wei `bigint` → ETH `string` (e.g. `"0.05"`). For displaying balances. | [Lesson 2](../experiments/002-read-balance/) |
| [`parseEther("0.0001")`](https://viem.sh/docs/utilities/parseEther) | ETH `string` → wei `bigint`. For specifying transaction amounts. | [Lesson 4](../experiments/004-first-tx/) |

## Mental model

```
Public client  ──reads──►  Base Sepolia
                                ▲
Wallet client  ──writes──┘   (signs with an account)

Account  =  private key  +  address  +  signing methods

wei (bigint) ─── formatEther ──►  "ETH" (string)
"ETH" (string) ─── parseEther ──►  wei (bigint)
```

That's the whole surface for Lessons 1–4. Lesson 5 (smart contracts) will introduce a new chunk: ABIs, `readContract`, `writeContract`, and contract deployment. This page will grow then.
