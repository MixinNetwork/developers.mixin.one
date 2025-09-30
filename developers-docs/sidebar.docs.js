module.exports = {
  api: [
    'api-overview',
    {
      label: 'Getting Started',
      type: 'category',
      collapsed: false,
      items: [
        'api/guide',
        {
          label: 'Authentication',
          type: 'category',
          items: [
            'api/oauth/oauth',
            'api/oauth/scope',
          ]
        },
      ]
    },
    {
      label: 'Sequencer API',
      type: 'category',
      collapsed: false,
      items: [
        'api/sequencer/overview',
        'api/sequencer/registration',
        'api/sequencer/utxos',
        'api/sequencer/snapshots',
        'api/sequencer/deposit',
        'api/sequencer/transactions',
        'api/sequencer/multisigs',
        'api/sequencer/client-integration',
      ]
    },
    {
      label: 'Social',
      type: 'category',
      collapsed: false,
      items: [
        'api/users/intro',
        'api/users/profile',
        'api/users/user',
        'api/users/users',
        'api/users/sessions',
        'api/users/search',
        'api/users/contacts',
        'api/users/relationships',
        'api/users/network-user',
        {
          label: 'Circles',
          type: 'category',
          items: [
            'api/circles/list',
            'api/circles/list-items',
            'api/circles/create',
            'api/circles/update',
            'api/circles/add-to-remove-from-circles',
            'api/circles/single',
            'api/circles/delete',
          ]
        },
        'api/shared-bots',
      ]
    },
    {
      label: 'Messaging',
      type: 'category',
      collapsed: false,
      items: [
        {
          label: 'Messages',
          type: 'category',
          items: [
            'api/messages/category',
            'api/messages/send',
            'api/messages/attachment-upload',
            'api/messages/attachment-download',
            'api/messages/read',
            'api/messages/encrypted',
          ]
        },
        {
          label: 'Conversations',
          type: 'category',
          items: [
            'api/conversations/create',
            'api/conversations/read',
            'api/conversations/group',
          ]
        },
        'api/zip-album',
      ]
    },
    {
      label: 'Transfers',
      type: 'category',
      collapsed: false,
      items: [
        {
          label: 'Withdrawal',
          type: 'category',
          items: [
            'api/withdrawal/addresses',
            'api/withdrawal/address',
            'api/withdrawal/address-add',
            'api/withdrawal/address-delete',
          ]
        },
        {
          label: 'External',
          type: 'category',
          items: [
            'api/external/fiats',
            'api/external/address',
            'api/external/pending-deposits',
          ]
        },
        'api/inscription',
      ]
    },
    {
      label: 'Utilities',
      type: 'category',
      collapsed: false,
      items: [
        'api/codes',
        'api/error-codes',
        'api/session-secret-migration',
        'api/pin/logs',
        'api/pin/tip',
      ]
    },
    {
      label: 'Legacy network API',
      type: 'category',
      collapsed: false,
      items: [
        {
          label: 'Assets',
          type: 'category',
          items: [
            'api/assets/assets',
            'api/assets/asset',
            'api/assets/fee',
          ]
        },
        {
          label: 'Network',
          type: 'category',
          items: [
            'api/network/chains',
            'api/network/assets',
            'api/network/top',
            'api/network/ticker',
          ]
        },
        {
          label: 'Transfer',
          type: 'category',
          items: [
            'api/transfer/transfer',
            'api/transfer/payment',
            'api/transfer/raw-transfer',
            'api/transfer/snapshot',
            'api/transfer/snapshots',
          ]
        },
        {
          label: 'Snapshots',
          type: 'category',
          items: [
            'api/network/snapshots',
            'api/network/snapshot',
          ]
        },
        {
          label: 'Collectibles',
          type: 'category',
          items: [
            'api/collectibles/request',
            'api/collectibles/outputs',
          ]
        },
      ]
    },
    "mainnet-rpc",
    "js-bridge",
    "schema",
  ],
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
            'mainnet/concepts/tip',
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
          label: 'MVM',
          type: 'category',
          items: [
            'mainnet/mvm/setup',
            'mainnet/mvm/metamask',
            'mainnet/mvm/remix',
          ]
        },
        {
          label: 'Guide',
          key: 'mainnet-guide',
          type: 'category',
          items: [
            'mainnet/guide/full-node-join',
            'mainnet/guide/sync-full-node',
            'mainnet/guide/submit-asset-icon',
            'mainnet/guide/mtg-guide',
          ]
        },
      ],
    },
    {
      type: 'category',
      label: 'dApp',
      collapsed: false,
      items: [
        "dapp/mixin-applications",
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
          key: 'dapp-guide',
          type: 'category',
          items: [
            'dapp/guide/create-network-user',
            'dapp/guide/deposit-withdrawal',
            'dapp/guide/sync-snapshots',
            'dapp/guide/message-loop',
            'dapp/guide/generate-jwt-token',
            'dapp/guide/pin',
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
        }
      ]
    },
    {
      label: 'Resources',
      type: 'category',
      collapsed: false,
      items: [
        'resources/sdk',
      ]
    },
    {
      label: 'Community',
      type: 'category',
      collapsed: false,
      items: [
        'community/support',
        'community/articles',
        'community/contributing',
        {
          type: 'link',
          href: '/showcase',
          label: 'Showcases',
        },
      ]
    },
  ],
};
