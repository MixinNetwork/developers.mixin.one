# User Interaction

Users interact with bots through web pages and chats.

### Web Page Interaction

Users can open the bot homepage for interaction through the following 4 ways:

- Homepage Super Entrance

  Telegram, Facebook Messenger, WeChat, and other chat software all support the function of bots (or mini-programs). As an extension of the basic chat functions, they all attach great importance to it. Mixin further delegates the right to the homepage navigation menu to the user, leaving the first-level entry to the bot development. Users can put their favorite and most commonly used bots on the homepage, and because bots are now first-level entrances, users are very likely to use them more.
  
  ![TODO: English Version IMG, Press and drag](./user-interaction-drag.png)

  Users can press and drag to pin the icon to the menu at the bottom of the homepage, then click the icon to open the bot homepage.
  
  **Starting from version 0.28.0, the bottom menu of the homepage supports 3 bot pins (the previous version supports 2).**

- Chat Bottom Menu

  ![Click On The Bot Icon](./user-interaction-chat-bot.png)

  When the user opens the conversation interface of the bot, click the bot icon at the bottom to open the bot homepage.

- Menu In The Lower Left Corner Of The Chat

  ![Tab + Icon](./user-interaction-chat-menu.png)

  When a bot is added as a group member or set as a shared bot by a user, it will show up if you click the menu in the lower-left corner of the chat interface. clicking the icon will take you to the bot homepage.

- Bot Popup

  ![TODO: English Version IMG, Click The Bot Icon](./user-interaction-profile.png)

  On the personal page of the bot, clicking the bot icon in the lower-left corner will open the homepage of the bot.

### Chat Window Interaction

Click on the bot from the chat list on the homepage or click on the conversation from the bot pop-up window to enter the interactive mode of the chat window. Usually, the user will leave a message and ask a question. The bot will automatically or manually reply to the user with text, pictures, cards, and other content. The following prompt will be displayed when the user opens the chat window with a bot for the first time:

![TODO: English Version Img, Welcome](./user-interaction-welcome.png)

Click the "Open Homepage" button to open the bot homepage, and click "Hello" to send a text message of `Hi` to the bot.

- Passive Response

  When the user adds the current bot as a contact, the bot will receive a message "Hello" from the system. The bot will reply with the introduction of itself and guide the user on how to use it. Furthermore, a paragraph of text, plus one or more buttons could be sent to the user, so that the user can click a button to open the bot homepage or get more introduction information, for example:

  ![TODO: English Version Img, Adding Bots](./user-interaction-add-bot.png)

  When a user encounters a problem and leaves a message to the bot, the bot should set some keywords to automatically reply. If the question cannot be answered with keywords, it should be forwarded to the customer service or the developer to help the user solve the problem.

  ![TODO: English Version Img, Reply](./user-interaction-reply.png)

  Bot Team Mixin 7000 is the official customer service bot for Mixin Messenger. If users have questions, they can leave a message, or send "download" to get automatic response content.

- Active Push

  Bots will push important notifications to users, such as new events or announcements:

  ![TODO: English Version Img, Notice](./user-interaction-notice.png)

  If the content is short, it is recommended to push text messages. If the content is long, it is recommended to push as a POST article message， which supports the markdown format. Send the markdown content to the 7000103014 bot to convert it to the POST article message format.
  
- Command Interaction

  Command interaction is cool, but it is a steep learning curve on the user side. Set the action of APP_BUTTON in the format `input:SOMETHING` to get the ability to automatically send messages by clicking the button, which is very practical. For example, the action of the current App Button is `input:subscribe`. When the user clicks this button, the client will automatically send a message with the text `subscribe` to the bot, and the developer can arbitrarily specify the text after `input`.

  ![TODO: English Version Img, Command interaction](./user-interaction-cmd.png)

  The actions of the above 4 buttons are `input:8 A`, `input:8 B`, `input:8 C`, and `input:8 D`. When the user clicks the button, the client will automatically send `8 A`, `8 B`, `8 C`, and `8 D`.
