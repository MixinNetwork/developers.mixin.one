# PHP SDK

The SDK is based on Composer，it requires PHP version 7.0 or higher to work.

### Installation

```
$ composer require exinone/mixin-sdk-php -vvv
```

### Quick Start

```php
<?php

require 'vendor/autoload.php';

$appConfig = [
'mixin_id' => '',
'client_id' => '',
'client_secret' => '',
'pin_token' => '',
'session_id' => '',
'private_key' => <<<EOF
EOF
];

$mixinSdk = new \ExinOne\MixinSDK\MixinSDK();

$mixinSdk->setConfig('appConfig', $appConfig);

// Create a user, and register him on the Mixin Network.
$user = $mixinSdk->use('appConfig')->network()->createUser('fullname');
var_dump($user);

$userConfig = [
'client_id' => $user['user_id'],
'session_id' => $user['session_id'],
'pin_token' => $user['pin_token'],
'private_key' => $user['priKey']
];

$mixinSdk = new \ExinOne\MixinSDK\MixinSDK();
$mixinSdk->setConfig('userConfig', $userConfig);

// Set initial PIN.
$res = $mixinSdk->use('userConfig')->pin()->updatePin('', '123456');
var_dump($res);

// Read user info.
$self = $mixinSdk->use('userConfig')->user()->readProfile();
var_dump($self);

// Get asset list.
$assets = $mixinSdk->use('userConfig')->wallet()->readAssets();
var_dump($assets);

?>
```

Fo more examples, see [examples](https://github.com/ExinOne/mixin-sdk-php/tree/master/tests/Feature)。

---
This SDK is developed by the Exin team. To contact tech support, search for 26930 in Mixin Messenger.