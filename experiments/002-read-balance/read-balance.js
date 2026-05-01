// Lesson 2 — read an account's balance on Base Sepolia.
//
// In Lesson 1 we asked the network "what's the latest block?" Now we ask
// it "how much ETH does this address have?" Same client, same transport,
// different question.

import { createPublicClient, http, formatEther } from "viem";
import { baseSepolia } from "viem/chains";

const client = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

// A few addresses to read. The first is the "zero address" — every chain
// has it, and people send tokens here when they want to permanently burn
// them. The second is a placeholder you can swap for any address you find
// on the Sepolia explorer (https://sepolia.basescan.org/).
const addresses = [
  "0x0000000000000000000000000000000000000000", // zero / burn address
  "0x4200000000000000000000000000000000000006", // Base WETH9 contract — has activity on Sepolia
];

for (const address of addresses) {
  // getBalance returns wei (a BigInt). 1 ETH = 10^18 wei.
  // formatEther converts wei → a human-readable ETH string.
  const wei = await client.getBalance({ address });
  const eth = formatEther(wei);

  console.log(`${address}`);
  console.log(`  raw wei: ${wei}`);
  console.log(`  in ETH:  ${eth}`);
  console.log();
}
