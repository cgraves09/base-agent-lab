// Lesson 3 — generate a fresh, TESTNET-ONLY private key + address.
//
// READ THIS FIRST:
//
//   This key is for learning on Base Sepolia (testnet) ONLY. Do not send
//   real money to this address. Do not reuse this key on mainnet. When
//   you're done with the lessons, throw it away.
//
//   The right way to handle real keys is in a wallet (Coinbase Wallet,
//   Rabby, MetaMask, hardware wallet) — never in code, never in a file
//   committed to git. The point of generating one here is purely to give
//   you something to drip testnet ETH into without having to set up a
//   real wallet first.

import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

const privateKey = generatePrivateKey();
const account = privateKeyToAccount(privateKey);

console.log("=== Fresh testnet-only account ===\n");
console.log(`Address:     ${account.address}`);
console.log(`Private key: ${privateKey}`);
console.log("\n=== What to do next ===\n");
console.log("1. Copy these two values into a .env file in this folder:");
console.log("   (use .env.example as a template — .env is in .gitignore)\n");
console.log("   PRIVATE_KEY=" + privateKey);
console.log("   ADDRESS=" + account.address);
console.log("\n2. Send testnet ETH to the address from a Base Sepolia faucet.");
console.log("   See README.md for current faucet links.\n");
console.log("3. Run `npm run watch` to see your balance update as the drip lands.\n");
console.log("⚠️  TESTNET ONLY. Never put real ETH here.");
