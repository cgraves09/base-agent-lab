// Lesson 3 — poll your balance on Base Sepolia and print when it changes.
//
// Reads the ADDRESS from .env and prints the balance every 5 seconds.
// When you go drip from a faucet, you'll see the balance jump — usually
// within ~10 seconds of the faucet's transaction confirming.

import { createPublicClient, http, formatEther } from "viem";
import { baseSepolia } from "viem/chains";
import { readFileSync } from "node:fs";

// --- Tiny .env loader (no extra dependency) -------------------------------
// Reads KEY=value lines from .env and returns them as an object.
// We don't use dotenv here because pulling in a dep for ~10 lines is overkill.
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
    console.error("❌ Couldn't read .env. Did you run `npm run generate` and copy the values into .env?");
    process.exit(1);
  }
}
// --------------------------------------------------------------------------

const env = loadEnv();
const address = env.ADDRESS;
if (!address) {
  console.error("❌ ADDRESS not set in .env. See README.md.");
  process.exit(1);
}

const client = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

console.log(`Watching ${address} on Base Sepolia.`);
console.log(`Polling every 5s. Ctrl+C to stop.\n`);

let lastWei = -1n;
while (true) {
  const wei = await client.getBalance({ address });
  if (wei !== lastWei) {
    const eth = formatEther(wei);
    const stamp = new Date().toISOString().slice(11, 19); // HH:MM:SS
    const delta = lastWei === -1n ? "" : ` (Δ ${formatEther(wei - lastWei)} ETH)`;
    console.log(`[${stamp}] ${eth} ETH${delta}`);
    lastWei = wei;
  }
  await new Promise((r) => setTimeout(r, 5000));
}
