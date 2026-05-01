# Learned

A running log of distilled, generalizable takeaways from learning to build on Base. Each entry is meant to be useful to other builders, not a personal diary.

## Format

Each entry follows this shape:

```
## YYYY-MM-DD — <topic>

**What I learned:** one or two sentences.

**Why it matters:** one or two sentences on the broader implication.

**Source / context:** link to the doc, experiment, or commit where this came from.
```

Items get added here only after they've been validated in practice — either by an experiment in this repo or by a real reference I can point at. Aspirational claims don't go here.

## Entries

### 2026-04-30 — viem is the modern way to talk to EVM chains from JS

**What I learned:** [viem](https://viem.sh/) is a modern, TypeScript-first library for talking to Ethereum and Ethereum-compatible chains (including Base). It ships chain metadata for Base Sepolia and Base mainnet out of the box, so connecting is a one-liner: `createPublicClient({ chain: baseSepolia, transport: http() })`. No RPC URL needed for read-only learning — viem uses the chain's default public RPC.

**Why it matters:** viem replaces older libraries (ethers, web3.js) with a smaller, faster, more strongly-typed API. If you're starting fresh on Base in 2026, this is the default choice. The Base docs themselves use viem in most examples. Older tutorials using ethers still work but you'll feel the wind in your face.

**Source / context:** [`experiments/001-hello-base/`](./experiments/001-hello-base/) — first hands-on contact with Base Sepolia using `viem.getBlockNumber()`.
