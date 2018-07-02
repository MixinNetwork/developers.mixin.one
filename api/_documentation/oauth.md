---
title: Oauth Scopes
position: 11
parameters:
  - name:
    content:
content_markdown: |-
  Mixin allows developers use OAuth to get authorized access to some of users' information.

  | Scopes | Description |
  | --- | --- |
  | PROFILE:READ | all public user profile, including the Mixin ID, name and profile photo. |
  | PHONE:READ | the phone number of Mixin user. |
  | CONTACTS:READ | get the friends, contacts and blocking_users of a Mixin user. |
  | ASSETS:READ | all the assets list, balances and transaction histories. |

right_code_blocks:
  - code_block: |-
      E.g.: https://mixin.one/oauth/authorize?client_id=CLIENT_ID&scope=PROFILE:READ+ASSETS:READ&response_type=code
    title: Example
    language: CURL

---
