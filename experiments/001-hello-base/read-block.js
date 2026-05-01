// Lesson 1 — say hello to Base Sepolia.
//
// Goal: prove your machine can talk to Base. No wallet, no contract, no spend.
// We just ask the network "what's the latest block?" and print the answer.
//
// If this works, you've crossed the first real hurdle: your code is reading
// state from a live blockchain. Everything else is built on top of this.

import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";

// A "public client" is a read-only connection to a blockchain.
// `baseSepolia` is Base's testnet — fake ETH, no real money at risk.
// `http()` with no URL uses viem's default public RPC for that chain.
const client = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

// Ask the network for the latest block number.
// `getBlockNumber()` returns a BigInt because block numbers can exceed JS's
// safe integer range — that's why we convert with String() before printing.
const blockNumber = await client.getBlockNumber();

console.log(`✅ Connected to ${baseSepolia.name} (chain id ${baseSepolia.id})`);
console.log(`   Latest block: ${String(blockNumber)}`);
