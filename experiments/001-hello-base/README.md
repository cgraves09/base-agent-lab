# Experiment 001 — Hello, Base

> **Status: not started.** This is a placeholder for the first hands-on experiment. The slot exists to make the structure visible; nothing has been built yet.

## Goal

The simplest possible end-to-end experiment that proves the dev environment can talk to Base Sepolia. The exact shape (a script that reads a block? a tiny contract deploy? an agent that calls an RPC?) will be decided when the experiment actually starts.

## What this folder will contain

- `README.md` — what the experiment is, how to run it, what was learned (this file, expanded)
- Source files for whatever the experiment turns out to be
- Any scripts needed to reproduce it
- Notes on what broke and how it was fixed

## How experiments are written here

Each experiment is self-contained: someone should be able to clone the repo, `cd` into the experiment folder, follow the README, and reproduce the result on testnet. No reliance on local-only state. No fabricated outputs.

If the experiment fails partway through, that's still a valid writeup — the failure mode is the lesson.
