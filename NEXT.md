# Next

What's on deck for `base-agent-lab`. This is the public-facing queue — concrete, polished, honest. Speculative ideas and brainstorms live in a private companion notebook.

## Done

- [x] **Lesson 1 — Hello, Base.** → [`experiments/001-hello-base/`](./experiments/001-hello-base/)
- [x] **Lesson 2 — Read an account's balance.** → [`experiments/002-read-balance/`](./experiments/002-read-balance/)
- [x] **Lesson 3 — Faucet drip + watch your balance change.** → [`experiments/003-faucet-drip/`](./experiments/003-faucet-drip/)
- [x] **Lesson 4 — Send your first transaction.** → [`experiments/004-first-tx/`](./experiments/004-first-tx/) (includes a section on nonce orchestration once multiple agents share a key)

## Active — decision needed before drafting

- [ ] **Lesson 5 — Deploy your first contract.** Pick a contract framework first: see [`docs/03-foundry-vs-hardhat.md`](./docs/03-foundry-vs-hardhat.md). Lesson 5 will be drafted in whichever you pick.

## On deck

- [ ] **Lesson 6 — Read from a contract** (call a `view` function via viem's `readContract`).
- [ ] **Lesson 7 — Write to a contract** (call a state-changing function via viem's `writeContract`).
- [ ] **Lesson 8 — A minimal agent that reacts to onchain events.** First glimpse of what makes Base interesting for agents.
- [ ] First `guides/` entry — polished walkthrough of Lessons 1–4 for beginners.
- [ ] First `prompts/` entry — distilled from any prompts that proved teaching-worthy across Lessons 1–4.

## Format

When an item is finished, the artifact (a doc, a guide, or an experiment) is the proof — checkboxes here are just navigation.
