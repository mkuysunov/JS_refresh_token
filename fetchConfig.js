import { getTokens, setToken, removeToken } from "./authToken";

let refreshRequest = null;

async function fetchConfig(url, params = {}, responseType) {
  try {
    const { access_token } = getTokens();
    let response = await fetch(url, {
      ...params,
      headers: { Authorization: access_token, ...params.headers },
    });

    // refresh token / logout
    if (response.status === 401) {
      if (!refreshRequest) {
        refreshRequest = sendRefreshRequest();
      }

      await refreshRequest;

      const { access_token } = getTokens();
      if (access_token) {
        response = await fetch(url, {
          ...params,
          headers: { Authorization: access_token, ...params.headers },
        });
      }
    }

    // returning response data
    if (response.ok) {
      let responseData = null;
      switch (responseType) {
        case "text":
          responseData = await response.text();
          break;
        case "formData":
          responseData = await response.formData();
          break;
        case "blob":
          responseData = await response.blob();
          break;
        case "arrayBuffer":
          responseData = await response.arrayBuffer();
          break;
        default:
          responseData = await response.json();
          break;
      }
      return responseData;
    }

    // returning error message
    const responseJSON = await response.json();
    throw new Error(responseJSON.message);
  } catch (error) {
    throw error;
  }
}

function sendRefreshRequest() {
  const { access_token, refresh_token } = getTokens();
  return fetch(baseURL("refresh"), {
    headers: { Authorization: access_token, "Refresh-Authorization": refresh_token },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      removeToken();
    })
    .then((jsonData) => {
      if (jsonData) {
        setToken({
          access_token: `Bearer ${jsonData.access_token}`,
          refresh_token: `Bearer ${jsonData.refresh_token}`,
        });
      }
      refreshRequest = null;
    });
}

export { fetchConfig };
