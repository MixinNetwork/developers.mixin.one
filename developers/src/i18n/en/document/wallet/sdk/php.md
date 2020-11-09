# PHP SDK

### Requirement

- `Composer`

- `PHP` >= 7.0

### Installation

```
$ composer require exinone/mixin-sdk-php -vvv
```

### Example

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

// Generate user and register to the Mixin Network
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

$res = $mixinSdk->use('userConfig')->pin()->updatePin('', '123456');
var_dump($res);

$self = $mixinSdk->use('userConfig')->user()->readProfile();
var_dump($self);

$assets = $mixinSdk->use('userConfig')->wallet()->readAssets();
var_dump($assets);

?>
```

Fo more examples, see [examples](https://github.com/ExinOne/mixin-sdk-php/tree/master/tests/Feature)。

---
This SDK is developed by the Exin team. If you have any questions, you can search for 26930 through Mixin Messenger and contact us for help.