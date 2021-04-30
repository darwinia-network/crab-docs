---
id: crab-tut-node
title: 如何运行一个全节点
sidebar_label: 运行节点
---

## 环境准备

> 以下三种获取可执行文件方式任选其一。

### 1. 源码编译

- 编译环境配置，[参考文档](https://github.com/darwinia-network/darwinia#41-hacking-on-darwinia)
- 启动终端
- 进入 darwinia 根目录
- cargo build --release
- 可以在 darwinia/target/release 下面找到编译好的可执行文件 darwinia(.exe)

### 2. 下载可执行文件

- https://github.com/darwinia-network/darwinia/releases

### 3. Docker

```sh
$ docker pull quay.io/darwinia-network/darwinia:vx.x.x
```

## 运行

### Linux / MacOS

```sh
$ ./darwinia --base-path <YOUR_DATA_DIR> --name <YOUR_NODE_NAME> --chain crab
```

如果你想 [远程连接节点](https://wiki.polkadot.network/docs/en/maintain-wss), 请在运行参数里增加 `--ws-external` and `--rpc-cors all`>

```
$ ./darwinia \
    --base-path <YOUR_DATA_DIR> \
    --name <YOUR_NODE_NAME> \
    --chain crab \
    --ws-external \
    --rpc-cors all
```

### Docker

```
$ docker run -it \
    -v <YOUR_DATA_DIR>:/data \
    quay.io/darwinia-network/darwinia:vx.x.x \
        --base-path /data \
        --name <YOUR_NODE_NAME> \
        --chain crab
```

如果你想 [远程连接节点](https://wiki.polkadot.network/docs/en/maintain-wss), 请在运行参数里增加 `--ws-external` and `--rpc-cors all` 并打开映射相关端口：

```
$ docker run -it \
    -v <YOUR_DATA_DIR>:/data \
    -p <YOUR_NODE_HTTP_PORT>:9933 \
    -p <YOUR_NODE_WSS_PORT>:9944 \
    quay.io/darwinia-network/darwinia:vx.x.x \
        --base-path /data \
        --name <YOUR_NODE_NAME> \
        --chain crab \
        --ws-external \
        --rpc-cors all
```

### 查看所有参数

```
$ ./darwinia --help
```

> 建议使用 systemctl，pm2，tmux，screen 等工具来维护进程。

