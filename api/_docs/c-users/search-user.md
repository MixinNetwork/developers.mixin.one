---
title: Search User
category: User
order: 6
---

Search user by `identity_number`, this is a limited api.

###### GET /search/:q

| q | String: Mixin Id or Phone Number |

```
// cURL Example
curl -i --header "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjgwODI4ODEsImlhdCI6MTUyODA4MjcwMSwianRpIjoiYWQyNDY5ZTMtOTk2NS00NzRlLTg5OTktYzhjNTIwYzViN2I2Iiwic2lkIjoiZTJiZjhkMjItZGM5My00MmVlLTk1NDUtMTZmMDVkMmU1ODBjIiwic2lnIjoiMzczMTNmZGJmMmNjNmIwYzgwYmU4NjY4NGY5YTQ4ZDNhY2I5YTM3ZmRiMWQ0MzRhMzE3ZTZhYWUwYTkyZjdkOSIsInVpZCI6Ijg5ZTBiZGVlLWMzNTUtNDdmMi05NDVhLWJlNDhiZTg3NTYwNiJ9.hmw2aL4Wy6vwzj9_qxSFcvMiyMpkTpD-UUXj8cOrJ3IspLhRKuATT2u5kTPMIEZnxQkPEpnbPUJ27F0eVWSbGLKANBS3bjehPEFmypb3TlY7wo063CNAXPiDi5Omroaq5ikgj8igNxDvXm4gznn26Y0W-h4cN1ERTxyRD-78QIQ" --header "Content-Type: application/json" --header "Content-length: 0" "https://api.mixin.one/search/7000"
```
```
{{ site.data.member.data }}
```
