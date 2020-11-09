# Mixin Trusted Group

Mixin Kernel is a badly simple distributed ledger which handles only basic UTXO transactions, no smart or stupid contracts, not even scripts complicated as Bitcoin. This simplicity makes Mixin Kernel the fastest decentralized solution for transferring digital assets. In the original whitepaper we proposed the Domain Extensions to make trusted computation possible for Mixin Network, now two years later, with the experience in building trusted financial systems, I have another proposal, a multisig group.


I prefer to call it Mixin Trusted Group or MTG. The old Domain Extensions proposal is very flexible and has the potential to support endless of features to fulfill most of the real life needs. However, opposed to the simplicity of Mixin Kernel, Domain Extensions’ flexibility prevent them from being in used, and indeed they are over complicated to implement correctly, thus sacrifice security without the governance of the strong Mixin Kernel PoS ledger. The Mixin Trusted Group is the result of simplifying Domain Extensions, it reduces the feature set to a multisig custodian, and is an open source program runs by several selected participants.


Unlike every smart contract is executed by the huge state machine in all Ethereum or EOS nodes, MTG is only running by nodes selected by the program respectively. The solution is very similar to what those Ethereum folks have been planning for years, sharding Ethereum, every MTG is as a shard to Ethereum, and it’s also interesting that MTG is a second layer solution to Mixin Kernel, while the Kernel is already a second layer to many other distributed ledgers like Bitcoin or Ethereum.


To make Mixin Trusted Group easier to implement, the program may use the API provided by Mixin Messenger, to loop all their multisig transactions. For every UTXO belongs to their multisig group, they should save the UTXO in their local storage to make it easier for further query, then they do whatever they need to do with the memo associated with UTXO. A simple decentralized AMM similar to Uniswap could be implemented in below Golang snippet.

```go
// this is a simple Mixin Trusted Group to do decentralized AMM
checkpoint := readCheckPointFromLocalStorage()
for {
    // loop all the multisig UTXOs belong to the group
    path := fmt.Sprintf("/multisigs?offset=%s&limit=100", checkpoint)
    utxos := requestAPI("GET", path) 

    for _, utxo := range utxos {
        // parse the UTXO to make sure it's valid
        res := parseUTXO(utxo)
        if !res.ValidForThisGroup {
            // also good to refund it if possible
            continue
        }
        // save the UTXO to local storage for further query
        writeUTXOToLocalStorage(utxo)

        switch res.Action {
        case "ADD-LIQUIDITY":
            // do liquidity calculation and return the liquidity provider token
            lp := doAddLiquidity(utxo.AssetId, utxo.Amount, res.ToAssetId)
            // the LP token also managed by MTG, send LP to the UTXO sender
            multi := signMultisigRequest(res.FromUserId, lp.AssetId, lp.Amount)
            // if the multisig request finished by enough signers, send out
            if len(multi.Signers) == utxo.Threshold {
                sendRawTransaction(multi.Raw)
            }
        case "SWAP":
            // do swap calculation and return the amount swapped out
            amount := doSwap(utxo.AsestId, utxo.Amount, res.ToAssetId)
            // the swapped asset also managed by MTG
            multi := signMultisigRequest(res.FromUserId, utxo.AssetId, amount)
            // if the multisig request finished by enough signers, send out
            if len(multi.Signers) == utxo.Threshold {
                sendRawTransaction(multi.Raw)
            }
        }
    }
}
```

After the program pass all tests, the owner should select some trusted nodes to help them run the program. The selected nodes should do full audit of the code to make sure its security, then the nodes will run the program in isolated secure environment, after all selected up, a Mixin Trusted Group is running. Thereafter, all users of the MTG can ensure their cryptocurrencies won’t be stolen by anyone unless most of these nodes are cheaters, they can safely use the MTG like they trust an Ethereum smart contract. Compared to Ethereum smart contract, a Mixin Trusted Group is more likely to be audited by experts, and more importantly, MTG is always faster and cheaper to use than any smart contracts.


Finally those selected nodes running Mixin Trusted Groups will get continuous income from the Group owners as the nodes spent their efforts on ensuring the security of their programs. Nodes make money, and Groups are trusted by people and they use them more and the groups make more money, and people have their money secured, all benefit.