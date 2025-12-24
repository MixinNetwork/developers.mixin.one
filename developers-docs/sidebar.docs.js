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
      ]
    },
    {
      label: "Assets",
      type: 'category',
      collapsed: true,
      items: [
        "api/tokens/intro",
        "api/tokens/token",
        "api/tokens/list",
        "api/tokens/fee",
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
            'api/messages/transfer',
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
        'api/codes',
        'api/pin/logs',
        'api/error-codes',
      ]
    },
    "js-bridge",
    "schema",
  ],
  docs: [
    "introduction",
    {
      type: 'category',
      label: 'app',
      collapsed: false,
      items: [
        "app/mixin-applications",
        {
          label: 'Getting Started',
          type: 'category',
          items: [
            'app/getting-started/create-app',
            'app/getting-started/oauth',
            'app/getting-started/read-info',
            'app/getting-started/messages',
          ]
        },
        {
          label: 'Guide',
          key: 'app-guide',
          type: 'category',
          items: [
            'app/guide/create-network-user',
            'app/guide/message-loop',
            'app/guide/generate-jwt-token',
          ]
        },
        {
          label: 'Design Guide',
          type: 'category',
          items: [
            'app/design/overview',
            'app/design/user-interaction',
            'app/design/title-bar',
            'app/design/floating-menu',
            'app/design/color',
            'app/design/immersive-mode',
            'app/design/dark-mode',
            'app/design/sticker',
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
