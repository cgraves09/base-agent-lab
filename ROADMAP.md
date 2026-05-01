# Roadmap

High-level milestones for `base-agent-lab`. These are goals, not a schedule — each one will be marked done when there's real, checked-in evidence of completion.

## Milestones

- [ ] **M0 — Repo scaffolded.** Public repo exists with a clear structure, README, roadmap, and a private companion repo for raw working material. _(this commit)_
- [ ] **M1 — Base basics understood.** A short, honest writeup of what Base is, the L2 model, and how it relates to Ethereum. Lives in [`docs/01-base-basics.md`](./docs/01-base-basics.md).
- [ ] **M2 — First experiment runs locally.** A hands-on "hello, Base" experiment under [`experiments/001-hello-base/`](./experiments/001-hello-base/) that another builder can clone and run on a testnet. No mainnet, no real value at risk.
- [ ] **M3 — First contract deployed to Base Sepolia.** Verifiable contract address and a writeup of the process, including what broke.
- [ ] **M4 — First agent that interacts with Base.** A working agent that reads from (and ideally writes to) Base via testnet.
- [ ] **M5 — First public guide.** A polished `guides/` entry written for other builders, distilled from the experiments above.
- [ ] **M6 — First shippable app.** A small but real Base app that someone other than me would actually use.

## Principles

- Walk before running. Each milestone builds on the last.
- Testnet first, mainnet only when there's a clear reason.
- Honest writeups beat impressive-looking ones.
- If something doesn't work, that's the writeup.
