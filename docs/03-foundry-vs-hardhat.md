# Lesson 5 prep — Foundry vs Hardhat

Lessons 1–4 didn't need a contract framework. Lesson 5 (deploy your first contract) does. There are two real choices:

- [**Foundry**](https://book.getfoundry.sh/) — Solidity-native toolchain. Tests are written in Solidity. Fast.
- [**Hardhat**](https://hardhat.org/) — JavaScript/TypeScript-native toolchain. Tests are written in JS/TS. Mature.

Both deploy to Base Sepolia just fine. Both work with viem. Both have great Base-specific docs. Picking is more about which language you want to live in.

## At-a-glance

| | Foundry | Hardhat |
|---|---|---|
| Install | `curl -L https://foundry.paradigm.xyz | bash` then `foundryup` | `npm install --save-dev hardhat` (per project) |
| Primary language | Solidity (tests too) | JS/TS (tests in JS/TS) |
| Speed | Famously fast — Rust-based | Slower, Node-based |
| Tooling | `forge`, `cast`, `anvil` | `npx hardhat ...` plus a plugin ecosystem |
| Mental load | Mostly Solidity. Learn `forge` commands. | JS + Solidity + Hardhat config. More moving parts. |
| Best fit | "I want to think in Solidity and ship contracts fast." | "I already live in JS/TS and want my contract code to feel like the rest of my stack." |

## Recommendation

If you're going to build agents that interact with contracts and the agent code is JS/TS already (as in our lessons), **Hardhat keeps everything in one language** and one toolchain. Less context-switching, easier to wire up.

If you're going to be writing nontrivial Solidity and you care about contract-side test coverage, **Foundry is the modern default** and most Base examples use it. The Solidity-first path forces you to think like a contract author from day one, which pays off later.

For this repo specifically — where the goal is teaching how to *build on Base*, not specifically teaching contract authorship — **Hardhat is the lower-friction choice** because it keeps the lessons inside the JS world we've already established. Foundry would mean a parallel toolchain to learn alongside contract concepts.

But this isn't a one-way door. The contract source itself is portable. If you start with Hardhat and later want Foundry's speed for testing, the `.sol` files come along.

## Decision checkpoint

This is a real fork. Your call before we draft Lesson 5:

- **A. Hardhat** — JS/TS-native, lower friction, fits the existing lessons. Recommended unless you want the Solidity-first experience.
- **B. Foundry** — Solidity-native, faster, what most modern Base tutorials use. Pick this if you'd rather learn the way most working contract devs work today.
- **C. Both, eventually** — start with one, port to the other later as a guide entry once you understand contracts. Fine, but pick a starting one.

When you've decided, I'll draft Lesson 5 in that flavor: a "hello world" ERC-20 (or maybe a simple greeter contract — also a real call) deployed to Base Sepolia, verified on Basescan, then read + written to from a viem script that builds on Lesson 4.
