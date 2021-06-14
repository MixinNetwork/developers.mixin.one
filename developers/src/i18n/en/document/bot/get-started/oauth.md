# OAuth Authorization

To access the personal information, assets, and other data of Mixin Messenger users, the developer needs to apply for authorization from the user.

### Permission List

| Permission           |  Description                         |
|:------------------:|:----------------------------------|
| PROFILE:READ       | Get basic user information, such as user id, Mixin ID, name, and avatar.|
| ASSETS:READ        | Read user asset list and balance.            |
| PHONE:READ         | Read the user's mobile phone number.                   |
| CONTACTS:READ      | Read user contact list, banned list.                 |
| MESSAGES:REPRESENT | Allow bots to send messages on behalf of users.                    |
| SNAPSHOTS:READ     | Access user's transfer records, including deposits and notifications.        |

Application for authorization includes at least PROFILE:READ permission. Users may uncheck certain permissions when authorizing. It is recommended that developers only apply for necessary permissions and make proper guidance with GUI in the absence of permissions.

### Applying For Authorization

When the bot detects that the user is not authorized, it should jump to `https://mixin-www.zeromesh.net/oauth/authorize?client_id=b7347ca4-186e-4e54-9db6-755a4ab0b5d4&scope=PROFILE:READ+ASSETS:READ&response_type=code&return_to=` to apply authorization from the user. The parameters:

- client_id - Bot ID.
- scope - Apply for permissions.
- response_type - Set to `code` in order to get authorization code.
- return_to - Link to the current page, take the user back to this page after authorization.

After the authorization is successful, the page will automatically jump to the verification URL of the bot. The callback URL will be accompanied by the authorization code and return_to parameter. The developer then requests the token by authorization code:

// TODO: Is there an API to return messages in English?
```
POST https://mixin-api.zeromesh.net/oauth/token
{
    "client_id": "机器人唯一标识",
    "code": "授权成功回调返回的授权码",
    "client_secret": "机器人密钥"
}
```

The response:

```
{
    "access_token": "用户授权令牌",
    "scope": "用户同意的授权列表，例如'PROFILE:READ ASSETS:READ'"
}
```

It is recommended that the developer cache the access token, and then use the access token to call the API to access user data, which can determine whether the user is authorized.

### Cancelling Authorization

Developers can find the bot and cancel authorization in Mixin Messenger Settings, Privacy and Security, Authorization. Note that canceling authorization will also clear the cached information of the current bot on the client-side, such as cookies.


### Next Step

- [Getting User Data](./api)