# Handling access and refresh tokens using fetch/axios methods

### How will be works written code

- If response status is equal to 401 will be send refresh request.
- Then if refresh response status is "ok".
- Will be update tokens from storage and will be re-send previous request/requests.
- Otherwise remove tokens and should doing logout (code of logout write it yourself)

### Demo

**sending request and parallel requsets**

<img align="center" width="200" height="200" src="https://github.com/mkuysunov/Dropzone-react-dropzone-/blob/main/images/demo-image.png">
