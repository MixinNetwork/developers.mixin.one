# Syncing Data From Full Nodes

### Becoming a Data Node or Mining Node

You need to synchronize the data from the MixinNetwork full nodes first.

1. Get the latest release from https://github.com/MixinNetwork/mixin/releases .
2. Create a directory to store all data `mkdir ~/.mixin`.
3. Extract the downloaded release, then `cp genesis.json nodes.json config.example.toml ~/.mixin`.
4. Run `./mixin creataddress -public` to create a Mixin mainnet address.
5. Rename config.example.toml to config.toml, then make a few modifications:
   - signer-key set to the `spend key` from the previous step.
   - listener set to the current machine IP:7239
6. Ensure the firewall allows access to UDP port 7239 and TCP port 8239
7. Run `./mixin kernel -d ~/.mixin`

### FAQ

- How to fix 'badger LOG Compact FAILED with error: too many open files'?

  Increase the allowed open files to 65535, check with `ulimit -n`.

- How to fix 'failed to sufficiently increase receive buffer size (was: 208 kiB, wanted: 2048 kiB, got: 416 kiB). See https://github.com/lucas-clemente/quic-go/wiki/UDP-Receive-Buffer-Size for details.'?

  `sudo sysctl -w net.core.rmem_max=8388608`

  `sudo sysctl -w net.core.wmem_max=8388608`
  
- How to check if the ports are open?

  `nc -zuv mixin-node 7239`

  `nc -zv mixin-node 8239`
