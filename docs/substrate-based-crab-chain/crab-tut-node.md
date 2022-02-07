---
id: crab-tut-node
title: How to run a node
sidebar_label: How to Run a node
sidebar_position: 7
---

## Clone and Build

The [darwinia-network/darwinia](https://github.com/darwinia-network/darwinia) repo's master branch contains the latest Darwinia code.

```sh
$ git clone https://github.com/darwinia-network/darwinia.git
$ cd darwinia && cargo build --release
```
Alternatively, if you wish to use a specific release, you can download the binary from release page.(`v0.11.4` in the example below):

```sh
$ wget https://github.com/darwinia-network/darwinia/releases/download/v0.11.4/darwinia-x86_64-linux-gnu.tar.bz2
```

## Run


### Linux / MacOS

```sh
$ ./darwinia --name my-crab-node --chain crab
```

Add the `--ws-external` and `--rpc-cors all` options if you want to [remotely connect to this node](https://wiki.polkadot.network/docs/en/maintain-wss):

```sh
$ ./darwinia --name my-crab-node --chain crab --ws-external --rpc-cors all
```

### Docker

```sh
$ docker run -it -v node-data:/darwinia/data quay.io/darwinia-network/darwinia:v0.11.4 --base-path /darwinia/data --name my-crab-node --chain crab
```

Add the `--ws-external` and `--rpc-cors all` options and map out the rpc ports if you want to [remotely connect to this node](https://wiki.polkadot.network/docs/en/maintain-wss):


```sh
$ docker run -it -v node-data:/darwinia/data quay.io/darwinia-network/darwinia:v0.11.4 --base-path /darwinia/data -p 9933:9933 -p 9944:9944 --name my-crab-node --chain crab --ws-external --rpc-cors all
```
#### View all parameter descriptions:

```sh
$ ./darwinia --help
```

> It is recommended to use systemctl, pm2, tmux, screen and other tools to maintain the process.

