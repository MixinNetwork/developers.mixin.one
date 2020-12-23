# 提交资产图标

所有 ERC-20、TRC-10、TRC-20 和 EOS 代币充值进 Mixin 网络就能直接使用，但是有的币没有图标，开发者可以联系 Mixin 团队补充图标，如果您是项目方请按步骤提交图标：

### 准备代币图标
  
- 520x520 像素， png 图片。
- 图标必须是圆形且背景不能是透明白色。
- 图标清晰，品牌识别明显。

### 获取资产编号

- 将代币先充值到 Mixin 钱包，到账后从钱包找到充值记录并复制`交易编号`。
- 打开 Mixin 区块浏览器 https://mixin.one/snapshots 输入 `交易编号` 点搜索。
- 复制转账详情底部代币名称的链接并截取链接最后的字符串，例如 `https://mixin.one/snapshots/c94ac88f-4671-3976-b60a-09064f1811e8` 中 `c94ac88f-4671-3976-b60a-09064f1811e8` 就是资产编号。

### 提交图标

- 登录你的 GitHub 账号并克隆 `asset-profile` 的项目代码：

  `git clone git@github.com:MixinNetwork/asset-profile.git`

- 切换到 `asset-profile` 目录并新建代币分支

- 准备提交的文件
  
  在 `assets` 目录下新建一个文件夹，文件夹的名字与当前资产编号一致，将图标拷贝到该文件夹下并改名为 "icon.png"，然后再新建一个 `index.json` 文件格式如下：

  ```
  {
    "asset_id": "7b55bf4e-3f37-3cfa-bca5-3d30d72ab820",
    "chain_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "cmc_id": ""
  }
  ```

  `chain_id` 表示所属公链编号，如果是以太坊 ERC 20 代币固定写 `43d61dcd-e413-450d-80b8-101d5e903357`，波场 TRC-10 或 TRC-20 代币固定写 `25dabac5-056a-48ff-b9f9-f67395dc407c`，EOS 代币固定写 `6cfe566e-4aad-470b-8c9a-2fd35b49c68d`，其他参考[文档](../concepts/chain)。

  `cmc_id` 您的资产如果没有被 coinmarketcap 收录这里直接设置空字符串即可。 

- 提交申请

  将准备好的图标和配置文件附带简要介绍一并提交，然后点 `Create pull request` 即可，Mixin 开发团队将进行前置审核然后再提交节点审核，确认没有问题就会部署生效。

---
更多说明请参考 https://github.com/MixinNetwork/asset-profile 工程首页介绍，还可参考其他人的提交[记录](https://github.com/MixinNetwork/asset-profile/commit/37c50161cbb0d9cdfd2387b1adb5837a601260a6)。
