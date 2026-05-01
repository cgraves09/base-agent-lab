// Lesson 4 — send your first transaction on Base Sepolia.
//
// Reads PRIVATE_KEY and TO_ADDRESS from .env, signs a small ETH transfer,
// broadcasts it, waits for the receipt, and prints the tx hash + a link
// to view it on Sepolia Basescan.
//
// ⚠️ TESTNET ONLY. The private key in .env should be the throwaway one
// you generated in Lesson 3, never a real-money key.

import {
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  formatEther,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { readFileSync } from "node:fs";

// Tiny .env loader (same as Lesson 3 — no extra dep).
function loadEnv() {
  try {
    const raw = readFileSync(new URL("./.env", import.meta.url), "utf8");
    const out = {};
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      out[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
    }
    return out;
  } catch {
    console.error("❌ Couldn't read .env. See README.md.");
    process.exit(1);
  }
}

const env = loadEnv();
if (!env.PRIVATE_KEY || !env.TO_ADDRESS) {
  console.error("❌ .env must include PRIVATE_KEY and TO_ADDRESS. See .env.example.");
  process.exit(1);
}

// AMOUNT_ETH defaults to a tiny send so a single faucet drip lasts forever.
const amountEth = env.AMOUNT_ETH ?? "0.0001";

// An "account" wraps a private key and knows how to sign.
const account = privateKeyToAccount(env.PRIVATE_KEY);

// Two clients: a public one for reads (balances, receipts) and a wallet
// one for writes (signing + sending). Both point at the same chain.
const publicClient = createPublicClient({ chain: baseSepolia, transport: http() });
const walletClient = createWalletClient({ account, chain: baseSepolia, transport: http() });

console.log(`From:   ${account.address}`);
console.log(`To:     ${env.TO_ADDRESS}`);
console.log(`Amount: ${amountEth} ETH`);

// Sanity check: do we have enough?
const balance = await publicClient.getBalance({ address: account.address });
console.log(`\nCurrent balance: ${formatEther(balance)} ETH`);
if (balance < parseEther(amountEth)) {
  console.error("❌ Not enough balance. Drip from a faucet first (Lesson 3).");
  process.exit(1);
}

// Sign + broadcast. viem fills in nonce, gas, etc. automatically.
console.log("\nSending...");
const hash = await walletClient.sendTransaction({
  to: env.TO_ADDRESS,
  value: parseEther(amountEth),
});
console.log(`✅ Broadcast. Tx hash: ${hash}`);
console.log(`   View it: https://sepolia.basescan.org/tx/${hash}`);

// Wait for the network to actually include + confirm the transaction.
// "Receipt" = the post-execution record: did it succeed, how much gas
// did it actually use, what block was it in.
console.log("\nWaiting for confirmation...");
const receipt = await publicClient.waitForTransactionReceipt({ hash });
console.log(`✅ Confirmed in block ${receipt.blockNumber}`);
console.log(`   Status:   ${receipt.status}`);
console.log(`   Gas used: ${receipt.gasUsed}`);

const newBalance = await publicClient.getBalance({ address: account.address });
console.log(`\nNew balance: ${formatEther(newBalance)} ETH`);
console.log(`(Spent: ${formatEther(balance - newBalance)} ETH — that's ${amountEth} sent + gas.)`);
