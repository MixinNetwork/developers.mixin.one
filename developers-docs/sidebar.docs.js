module.exports = {
  docs: [
    "introduction",
    {
      type: 'category',
      label: 'Mainnet',
      collapsed: false,
      items: [
        'mainnet/overview',
        {
          label: 'Concepts',
          type: 'category',
          items: [
            'mainnet/concepts/how-it-works',
            'mainnet/concepts/xin',
            'mainnet/concepts/full-node',
            'mainnet/concepts/d3m-pin',
            'mainnet/concepts/multisig',
            'mainnet/concepts/chain',
            'mainnet/concepts/price',
          ]
        },
        {
          label: 'MTG',
          type: 'category',
          items: [
            'mainnet/mtg/overview',
            'mainnet/mtg/chains',
            'mainnet/mtg/lend',
            'mainnet/mtg/exchange',
            'mainnet/mtg/amm',
            'mainnet/mtg/stablecoin',
            'mainnet/mtg/wappercoin',
          ]
        },
        {
          label: 'Tutorials',
          type: 'category',
          items: [
            'mainnet/tutorials/full-node-join',
            'mainnet/tutorials/sync-full-node',
            'mainnet/tutorials/submit-asset-icon',
          ]
        },
      ],
    },
    {
      type: 'category',
      label: 'dApp',
      collapsed: false,
      items: [
        "dapp/overview",
        {
          label: 'Getting Started',
          type: 'category',
          items: [
            'dapp/getting-started/create-dapp',
            'dapp/getting-started/oauth',
            'dapp/getting-started/read-info',
            'dapp/getting-started/messages',
            'dapp/getting-started/transfer',
          ]
        },
        {
          label: 'Guide',
          type: 'category',
          items: [
            'dapp/guide/create-network-user',
            'dapp/guide/deposit-withdrawal',
            'dapp/guide/generate-jwt-token',
            'dapp/guide/pin',
            'dapp/guide/sync-snapshots',
            'dapp/guide/multisig-guide',
          ]
        },
        {
          label: 'Design Guide',
          type: 'category',
          items: [
            'dapp/design/overview',
            'dapp/design/user-interaction',
            'dapp/design/title-bar',
            'dapp/design/floating-menu',
            'dapp/design/color',
            'dapp/design/immersive-mode',
            'dapp/design/dark-mode',
            'dapp/design/sticker',
          ]
        },
        {
          label: 'SDK',
          type: 'category',
          items: [
            'dapp/sdk/overview',
            'dapp/sdk/go',
            'dapp/sdk/kotlin',
            'dapp/sdk/nodejs',
            'dapp/sdk/php',
            'dapp/sdk/ruby',
          ]
        },
      ]
    }
  ],
  api: [
    'api-overview',
    {
      label: 'API Reference',
      type: 'category',
      collapsed: false,
      items: [
        'api/guide',
        {
          label: 'OAuth',
          type: 'category',
          items: [
            'api/oauth/oauth',
            'api/oauth/scope',
          ]
        },
        {
          label: 'User',
          type: 'category',
          items: [
            'api/users/profile',
            'api/users/users',
            'api/users/user',
            'api/users/search',
            'api/users/contacts',
            'api/users/relationships',
            'api/users/network-user',
          ]
        },
        {
          label: 'PIN',
          type: 'category',
          items: [
            'api/pin/pin-update',
            'api/pin/pin-verify',
            'api/pin/logs',
          ]
        },
        {
          label: 'Assets',
          type: 'category',
          items: [
            'api/assets/assets',
            'api/assets/asset',
            'api/assets/fee',
            'api/assets/ticker',
            'api/assets/fiats',
          ]
        },
        {
          label: 'Transfer',
          type: 'category',
          items: [
            'api/transfer/transfer',
            'api/transfer/raw-transfer',
            'api/transfer/snapshots',
            'api/transfer/snapshot',
          ]
        },
        {
          label: 'Withdrawal',
          type: 'category',
          items: [
            'api/withdrawal/addresses',
            'api/withdrawal/address',
            'api/withdrawal/address-add',
            'api/withdrawal/address-delete',
            'api/withdrawal/withdrawal',
          ]
        },
        {
          label: 'Network',
          type: 'category',
          items: [
            'api/network/chains',
            'api/network/assets',
            'api/network/snapshots',
            'api/network/snapshot',
            'api/network/outputs',
            'api/network/pending-deposits',
          ]
        },
        {
          label: 'Multi-Signature',
          type: 'category',
          items: [
            'api/multisigs/request',
            'api/multisigs/outputs',
          ]
        },
        {
          label: 'Conversations',
          type: 'category',
          items: [
            'api/conversations/read',
            'api/conversations/create',
            'api/conversations/group',
          ]
        },
        {
          label: 'Messages',
          type: 'category',
          items: [
            'api/messages/guide',
            'api/messages/category',
            'api/messages/read',
            'api/messages/send',
            'api/messages/attachment-upload',
            'api/messages/attachment-download',
          ]
        },
        {
          label: 'Circles',
          type: 'category',
          items: [
            'api/circles/list',
            'api/circles/single',
            'api/circles/create',
            'api/circles/update',
            'api/circles/delete',
            'api/circles/add-to-remove-from-circles',
            'api/circles/list-items',
          ]
        },
        "api/shared-bots",
        "api/session-secret-migration",
        "api/error-codes",
      ]
    },
    "mainnet-rpc",
    "js-bridge",
    "schema",
  ],
};
