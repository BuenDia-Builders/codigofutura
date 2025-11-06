# Stellar Smart Contract Template

This repository contains a template for developing smart contracts. It includes example contract logic, deployment scripts, and tests to help you get started quickly.

## Features

- Template for writing custom smart contracts
- Sample contract with basic functionality
- Pre-configured testing environment
- Easy to extend and customize

## Table of Contents

- [Prerequisites](#prerequisites)
- [Optional (VSCode)](#optional-vscode)
- [Getting Started](#getting-started)
  1.  [Clone the Repository](#1-clone-the-repository)
  2.  [Compile the Contract](#2-compile-the-contract)
  3.  [Optimize the Contract](#3-optimize-the-contract)
  4.  [Run Tests](#4-run-tests)
  5.  [Deploy the Contract](#5-deploy-the-contract)
  6.  [Wasm File Installation](#6-wasm-file-installation)
- [Project Structure](#project-structure)

## Prerequisites

Make sure you have the following installed before getting started:

- Rust: rustup and cargo - [Docs](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup)
- Stellar SDK - [Docs](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup#install-the-stellar-cli)
- Docker: Optional, for running test environments - [Docs](https://developers.stellar.org/docs/tools/developer-tools/quickstart) - [QuickStart](https://github.com/stellar/quickstart)

## Optional (VSCode)

If you're using Visual Studio Code (VSCode) for development, the following extensions will improve your experience by adding linting, formatting, and dependency management support. [Docs](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup#configure-an-editor)

- [Rust Analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) for Rust language support.
- [CodeLLDB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) for step-through-debugging.
- [BetterTOML](https://marketplace.visualstudio.com/items?itemName=bungcip.better-toml) for syntax highlighting, autocompletion, and linting for Cargo.toml and other .toml files.

## Getting Started

### 1. Clone the Repository

#### HTTPS:

```bash
git clone https://github.com/bigger-tech/template-stellar-smart-contract.git .
cd template-stellar-smart-contract
```

#### SSH:

```bash
git clone git@github.com:bigger-tech/template-stellar-smart-contract.git .
cd template-stellar-smart-contract
```

### 2. Compile the Contract (v23)

To compile the smart contract, use the following command:

```bash
stellar contract build
```

This will generate the contract's binary in the **target** directory. You can find it inside:

```text
target/wasm32v1-none/release/base_contract.wasm
```

### 3. Optimize the Contract (optional)

To optimize the smart contract, use the following command:

```bash
stellar contract optimize --wasm target/wasm32v1-none/release/base_contract.wasm
```

> Building optimized contracts is only necessary when deploying to a network with fees or when analyzing and profiling a contract to get it as small as possible. If you're just starting out writing a contract, these steps are not necessary.

##### Output

```text
Reading: target/wasm32v1-none/release/base_contract.wasm (3452 bytes)
Optimized: target/wasm32v1-none/release/base_contract.optimized.wasm (2877 bytes)
```

> The size in bytes may vary depending on each contract developed.

### 4. Run Tests

You can run the pre-configured tests to verify your contract logic:

```bash
cargo test
```

For more advanced tests, modify the test cases in the **src/tests/** directory.

### 5. Deploy the Contract

Make sure your environment is set up (e.g., testnet). Then, deploy your contract using the provided deployment script:

```bash
stellar contract deploy --wasm target/wasm32v1-none/release/base_contract.wasm --network testnet --source S... -- --admin G...
```

> When deploying a contract to the **mainnet** or any network with fees, ensure you deploy the `.optimized.wasm` version. Check [Optimize the contract](#3-optimize-the-contract)

##### Output

```text
CCJGTFIZMCS7CD3D5DHDJXAF6GWLGQKO7YUVGDYDFQ5KEGCTSCWZFJY3
```

### 6. Wasm file installation

If you need to install the already builded **.wasm** file you can do it running the next command:

```bash
stellar contract install --wasm target/wasm32v1-none/release/base_contract.wasm --network testnet --source S... -- --admin G...
```

> When installing a contract on the **mainnet** or any network with fees, ensure you install the `.optimized.wasm` version. Check [Optimize the contract](#3-optimize-the-contract)

This can be helpful if you want to have multiple instances of the same smart contract deployed.

##### Output

```text
695da0050d5481fe1a1dc0edc94792223b4a152b80f8a1e360ec05a773c06196
```

## Project Structure

```text
template-stellar-smart-contract/
├── src/
│   ├── lib.rs          # Smart contract entry point (main library)
│   ├── contract.rs     # Core smart contract logic
│   ├── events/         # Definitions for contract events
│   ├── methods/        # Implementation of contract methods/functions
│   ├── storage/        # Data structures and storage logic for the contract
│   ├── tests/          # Test logic for the smart contract
│   │   ├── config/     # Setup files for the test configuration
│   │   └── ...         # Unit tests files for testing individual functions
├── Cargo.toml          # Rust project dependencies and settings
└── README.md           # Project documentation
```

## Contract Methods

### Admin Functions

#### Set Admin

Assigns a new administrator address for the contract. Only the current admin can execute this operation, enforcing proper access control and authority transfer.

```bash
stellar contract invoke \
  --id CONTRACT_ID \
  --source CURRENT_ADMIN_SECRET_KEY \
  --network testnet \
  -- \
  set_admin \
  --admin NEW_ADMIN_ADDRESS
```

### User Operations

#### Transfer

Transfers tokens from one address to another. This method automatically updates the sender's transfer amount tracking before executing the token transfer.

```bash
stellar contract invoke \
  --id CONTRACT_ID \
  --source SENDER_SECRET_KEY \
  --network testnet \
  -- \
  transfer \
  --from SENDER_ADDRESS \
  --to RECIPIENT_ADDRESS \
  --token TOKEN_ADDRESS \
  --amount TOKEN_AMOUNT
```

#### Get User

Retrieves user information for a given address, including their transaction history and account details.

```bash
stellar contract invoke \
  --id CONTRACT_ID \
  --source SECRET_KEY \
  --network testnet \
  -- \
  get_user \
  --address USER_ADDRESS
```
