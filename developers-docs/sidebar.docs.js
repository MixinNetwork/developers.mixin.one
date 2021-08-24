module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Mainnet',
      collapsed: false,
      items: [
        'mainnet/overview',
      ],
    },
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
            'api/multisigs/guide',
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
            'api/conversations/update',
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
