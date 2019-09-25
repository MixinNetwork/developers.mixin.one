---
title: APP User
category: Mixin Network
order: 40
---

Create a new Mixin Network user (like a normal Mixin Messenger user). You should keep PrivateKey which is used to sign an AuthenticationToken and encrypted PIN for the user.


###### POST /users
| session_secret | String: Base64 of RSA PUBLIC KEY |
| full_name | String: Name of An New User |

```
// cURL Example
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMjAyMzAsImlhdCI6MTUyNTM0NDIzMCwianRpIjoiNjEyZDRjYTQtOGUwNC00YTk3LTgwZTMtN2UwMjY0OGE5ZmQ0Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMTI3YWVhOWU3MmZhMDJiZWE0MDdhZGNiYTA0M2IzMmM0YTRhN2U2NGIzMDU0NzcyMGRlMjk3YjE2NGU5MWVhMiIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.g_sED63nqS_cf68FKh8Ow1-0B4Ew_ojYS76P52hhqcF-gjImI93vM7Q4PI0t8i4ddiePD9vT470pD3obtzpo7eHD1ECfDuQkxqJqvN8elRYLWPYHjzElu0JqHDDIXh1TCtzGLReR4ZmC9g9DkhxDhocP9srWdVDAU_FbJOjznOE" "https://api.mixin.one/users" -X POST --data '{"full_name":"Bot User","session_secret":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDMTuli9K9k7F+L7Rq34se23nQeV2yvjVGCZyRTbp8qNASnRq6N679ZflgVxNUsr2qkHN4eqvafrQ9IIcRXfofMlWWIU6MrgVVD0UEVyH4jKA5gUr4smU/SDnVLqb3TojYMELIKHgqnrjqDJ0b+vMUG1Iix4fi+CvjSiJzsWPOavQIDAQAB"}'
```
```
{{ site.data.user.data }}
```
For an app user, you can provide information on the following format to let him access his information (like assets), and also can be used by other dapp bases on Mixin Network.
```
// file name keystore.json
{
  "user_id":"06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
  "session_id":"a34c07a9-755d-4b54-94c5-e45e9a2dd43e",
  "pin_token":"brM63kx....1w6pFM=",
  "session_key":"-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQC+cgmjyrFoWUblxsldm2kxCJEwgLN89+rxV+dmZr0l6e4X7JpA
...
TvI+F9wH+FzB7USctTCSQR22asSDRiSsG8omvHbp+X2R
-----END RSA PRIVATE KEY-----"
}
```
