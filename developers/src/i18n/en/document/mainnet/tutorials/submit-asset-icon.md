# Submitting Asset Icons

All ERC-20, TRC-10, TRC-20, and EOS tokens can be used directly after depositing into the Mixin network, but some coins do not have an icon. Developers can contact the Mixin team to submit the icon. If you want to do this, please follow the following steps.

### Token Icon Format
  
- 520x520 pixels, png.
- Must be round and the background cannot be transparent or white.
- Clear and great brand recognition.

### Getting Asset ID

- Deposit the tokens to the Mixin wallet first, find the deposit record from the wallet and copy the `transaction ID`.
- Open the Mixin block explorer https://mixin.one/snapshots, enter the transaction ID and click search.
- Copy the link of the token name at the bottom of the transfer details and intercept the string at the end of the link, for example, if you get `https://mixin.one/snapshots/c94ac88f-4671-3976-b60a-09064f1811e8`, then `c94ac88f-4671-3976-b60a-09064f1811e8` is the asset ID.

### Submitting Icon

- Log in to your GitHub account and clone the code of project `asset-profile`:

   `git clone git@github.com:MixinNetwork/asset-profile.git`

- Switch to the `asset-profile` directory and create a token branch

- Documents to be submitted
  
  Create a new directory in the `assets` directory, the name of the directory is the current asset ID, copy the icon to the directory and rename it to "icon.png", and then create a new `index.json` The file format is as follows :

  ```
  {
    "asset_id": "7b55bf4e-3f37-3cfa-bca5-3d30d72ab820",
    "chain_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "cmc_id": ""
  }
  ```

  `chain_id` is the public chain ID, if it is an Ethereum ERC 20 token, always set it to `43d61dcd-e413-450d-80b8-101d5e903357`, and if TRON TRC-10 or TRC-20 token, always `25dabac5-056a-48ff -b9f9-f67395dc407c`, for EOS tokens `6cfe566e-4aad-470b-8c9a-2fd35b49c68d`, for others, refer to [document](../concepts/chain).

  `cmc_id` If your asset is not included by coinmarketcap, just set an empty string here.

- Application

  Submit the prepared icon and configuration file together with a brief introduction, and then click `Create pull request`. The Mixin development team will conduct a pre-review and then pass it to the nodes to review. If there is no problem, the icon will be deployed.

---
For more instructions, please refer to https://github.com/MixinNetwork/asset-profile project homepage introduction, and also refer to other the earlier submission [Record](https://github.com/MixinNetwork/asset-profile/commit/37c50161cbb0d9cdfd2387b1adb5837a601260a6 ).

