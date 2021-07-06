# Overview

The Mixin Messenger bot design guide aims to provide users with an easy-to-use, efficient and consistent user experience, to help developers better adapt the interface and make full use of the features supported by the container.

### Consistency

- Visual consistency.

  The fonts, colors, buttons, labels, etc. of the bot should be consistent.

- Functional consistency.

  The interaction methods and elements in each page of the bot should be consistent.

- Follow platform specifications.

  Follow the Android and iOS interface design specifications, and the design conforms to the interaction and look of platform users.


### Clear Highlights

Each page should have clear highlights and hierarchy so that users can quickly understand the content of the page and try to avoid elements that are irrelevant to the content.

![TODO: English Version IMG, Highlights](./overview-point.png)

### Minimizing Input
  
Minimize user input when designing the bot page, and use existing interfaces and some easy-to-operate selection controls to improve the user's input experience. For example, where you need to enter your mobile phone number, you can apply for authorization to save users from entering it again.

### Smooth Experience

- Avoid long time waiting for the page, and improve the access speed by optimizing the network and page performance.

- When the operation inevitably requires waiting, the animation effects of loading and waiting should be displayed to ease the user's emotions.

- If the waiting time is too long, a progress bar and a cancel button should be provided.

### Avoiding Bot Manu

The bot menu is fixed floating in the upper right corner. Developers should reserve space in this area when designing the interface to avoid interaction conflicts caused by occlusion.

![TODO: English Version IMG, Avoiding Bot Manu](./overview-nav-capsule.png)

### Avoiding Too Many Notifications

Only important information is notified to the user. Too many notifications will make the user disgusted and may mute or even block the current bot. If there is indeed a lot of information that needs to be notified, users should be allowed to choose the push types. 


### Next Step

A friendly design does not need deliberate guidance. Users can understand how to use it at a glance. It is our goal to let the interface meet user needs while providing a good experience.

- [User-bot Interaction](./user-interaction)

  Being familiar with the way the robot interacts with the user helps designers optimize the interactive experience.