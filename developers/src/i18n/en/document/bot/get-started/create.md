# Creating Bots

Download [Mixin Messenger](https://mixin-www.zeromesh.net/messenger), open [dashboard](/dashboard) and login by scanning the quad code. Click the `New App` button on the left side and create the bot by following the prompt. Below are descriptions of some of the important parameters.

- Category

  Please select a category for the bot, when the bot is placed at the navigation bar on the bottom of the Mixin Messenger homepage, the corresponding icon of the category will be displayed.

- Homepage Address

  Link to the homepage of the bot.

- Verification Page Address

  For the callback of OAuth authorization. 

- Domain Whitelist

  It is used to prevent fake bot links. When opening card and button type messages, it will check whether the linked domain name is in the whitelist. For APP_CARD or APP_BUTTON_GROUP, you need to ensure that the action is in the whitelist.


- Immersive Mode

  Turn on immersive mode to get more display space, refer to [Immersive Mode](../design/immersive-mode)document.

### Next Step

After saving the newly created bot, you can get the Mixin ID of the current bot. You can directly search for the ID at the top of the Mixin Messenger homepage to access your own bot.

- [Authorization](./oauth)

  Developers can read the user's personal, asset, transfer, and other information after authorization, and accordingly can provide users with a variety of more refined information and financial services.

- [Receiving Messages](./websocket)

  If you are developing news, images only, and other informational bots that do not need to read user info, all you need is to develop the front-end, and you are ready to go live. It is strongly recommended that developers provide tech support for the users.

