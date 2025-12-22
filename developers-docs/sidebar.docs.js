module.exports = {
  api: [
    'api-overview',
    {
      label: 'Getting Started',
      type: 'category',
      collapsed: false,
      items: [
        'api/guide',
        'api/sequencer/registration',
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
      label: 'Users',
      type: 'category',
      collapsed: false,
      items: [
        'api/users/intro',
        'api/users/profile',
        'api/users/user',
        'api/users/users',
        'api/users/contacts',
        'api/users/search',
        'api/users/sessions',
        'api/users/relationships',
        'api/users/network-user',
        'api/shared-bots',
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
      label: 'Transactions',
      type: 'category',
      collapsed: false,
      items: [
        'api/sequencer/outputs',
        'api/sequencer/snapshots',
        'api/sequencer/transactions',
        'api/sequencer/deposit',
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
        'api/sequencer/multisigs',
        'api/inscription',
        'api/sequencer/client-integration',
      ]
    },
    {
      label: 'Utilities',
      type: 'category',
      collapsed: true,
      items: [
        {
          label: 'External',
          type: 'category',
          items: [
            'api/external/fiats',
            'api/external/address',
          ]
        },
        'api/codes',
        'api/pin/tip',
        'api/pin/logs',
        'api/error-codes',
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
