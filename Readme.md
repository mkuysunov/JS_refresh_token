# Handling access and refresh tokens using fetch/axios methods

### How will be works written code

- If response status is equal to 401 will be send refresh request.
- Then if refresh response status is "ok".
- Will be update tokens from storage and will be re-send previous request/requests.
- Otherwise remove tokens and should doing logout (code of logout write it yourself).

### Demo

**Belove images show how the structure will work for one requst and parallel request**

<img align="center" width="400" height="auto" src="https://github.com/mkuysunov/JS_refresh_token-/blob/master/demo_images/common.png">
