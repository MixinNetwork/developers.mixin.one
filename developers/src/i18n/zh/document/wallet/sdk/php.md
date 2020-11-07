# PHP SDK

本 SDK 基于 Composer，要求 PHP 版本在 7.0 或以上。

### 安装

```
$ composer require exinone/mixin-sdk-php -vvv
```

### 例子

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

// 生成用户并注册到 Mixin 网络
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

// 设置初始密码
$res = $mixinSdk->use('userConfig')->pin()->updatePin('', '123456');
var_dump($res);

// 读取用户个人信息
$self = $mixinSdk->use('userConfig')->user()->readProfile();
var_dump($self);

// 获取用户资产列表
$assets = $mixinSdk->use('userConfig')->wallet()->readAssets();
var_dump($assets);

?>
```

更多例子例子参见 SDK [examples](https://github.com/ExinOne/mixin-sdk-php/tree/master/tests/Feature)。

---
本 SDK 由 Exin 团队开发和维护，使用有问题可以通过 Mixin Messenger 搜索 26930 联系我们提供帮助。