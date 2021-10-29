---
id: crab-tut-node
title: How to run a node
sidebar_label: Running a node
sidebar_position: 3
---

## Initial Setup

> Choose one of the following 3 ways to obtain an executable file

### 1. Compile from source

- Compiler environment configuration. Refer to https://github.com/darwinia-network/darwinia#41-hacking-on-darwinia
- Enter the darwinia root directory
- cargo build --release
- The compiled executable file darwinia (.exe) can be found under darwinia/target/release

### 2. Download the compiled executable file

- https://github.com/darwinia-network/darwinia/releases

### 3. Docker

```sh
$ docker pull quay.io/darwinia-network/darwinia:vx.x.x
```

## Run


### Linux / MacOS

```sh
$ ./darwinia --name "My node's name" --chain crab
```

Add the `--ws-external` and `--rpc-cors all` options if you want to [remotely connect to this node](https://wiki.polkadot.network/docs/en/maintain-wss):

```sh
$ ./darwinia --name "My node's name" --chain crab --ws-external --rpc-cors all
```

### Docker

$ docker run -it -v node-data:/darwinia/data -p 9933:9933 -p 9944:9944 quay.io/darwinia-network/darwinia:v0.11.4 --base-path /darwinia/data/01 --name "My node's name" --chain crab --validator --rpc-methods=Unsafe --rpc-external --rpc-cors all

```sh
$ docker run -it -v node-data:/darwinia/data quay.io/darwinia-network/darwinia:v0.11.4 --base-path /darwinia/data/01 --name "My node's name" --chain crab
```

Add the `--ws-external` and `--rpc-cors all` options and map out the rpc ports if you want to [remotely connect to this node](https://wiki.polkadot.network/docs/en/maintain-wss):


```sh
$ docker run -it -v node-data:/darwinia/data quay.io/darwinia-network/darwinia:v0.11.4 --base-path /darwinia/data/01 --name "My node's name" --chain crab --ws-external --rpc-cors all
```
#### View all parameter descriptions:

```sh
$ ./darwinia --help
```

> It is recommended to use systemctl, pm2, tmux, screen and other tools to maintain the process.

