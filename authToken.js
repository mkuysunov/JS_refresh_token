// get
export const getTokens = () => {
  try {
    const tokens = JSON.parse(localStorage.getItem("authToken"));
    if (tokens && typeof tokens === "object" && !Array.isArray(tokens)) {
      return tokens;
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
};

// set
export const setToken = (data) => localStorage.setItem("authToken", JSON.stringify(data));
// remove
export const removeToken = () => localStorage.removeItem("authToken");
