# 同步全节点数据

### 成为数据节点或者挖矿节点

需要先同步 MixinNetwork 全节点数据。

1. 从 GitHub 下载 Mixin 最新的版本 https://github.com/MixinNetwork/mixin/releases, 里面包含配置文件和执行程序
2. 创建一个目录来存储 Mixin 节点数据 `mkdir ~/.mixin`
3. 把主网的配置 genesis.json, nodes.json, config.example.toml 放入 ~/.mixin 目录
4. 运行 `./mixin creataddress -public` 生成一个新的主网账号
5. 修改 config.example.toml 重命名为 config.toml, 需要修改其中的几个配置
   - signer-key 设置为上一步生成的账号的 spend key
   - listener 修改为本机的 IP:7239
6. 防火墙打开 UDP 7239 端口，TCP 8239 端口
7. 启动 `./mixin kernel -d ~/.mixin`

### FAQ

- badger LOG Compact FAILED with error: too many open files

  增加 Linux 打开文件数量到 65535，可以通过 `ulimit -n` 查看

- failed to sufficiently increase receive buffer size (was: 208 kiB, wanted: 2048 kiB, got: 416 kiB). See https://github.com/lucas-clemente/quic-go/wiki/UDP-Receive-Buffer-Size for details.

  `sudo sysctl -w net.core.rmem_max=8388608`

  `sudo sysctl -w net.core.wmem_max=8388608`

- 测试端口是否连通

  `nc -zuv mixin-node 7239`

  `nc -zv mixin-node 8239`
