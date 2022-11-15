import jwtDecode from "jwt-decode";

const setAccessToken = (value) => {
  localStorage.setItem("AccessToken", value);
};

const getAccessToken = () => {
  return localStorage.getItem("AccessToken");
};

const removeAccessToken = () => {
  localStorage.removeItem("AccessToken");
}

const getAuth = () => {
  const jwt = localStorage.getItem("AccessToken");

  try {
    const user = jwtDecode(jwt);
    // console.log("user :", user);
    return user;
  } catch (err) {
    return null;
  }
}

export default {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
  getAuth
};
