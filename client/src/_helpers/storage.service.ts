const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const URL_FROM_KEY = "url_from";

/**
 *
 * @param key
 * @param value
 */
const setItem = (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value)
    localStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
};

/**
 *
 * @param key
 * @returns json object | null
 */
const getItem = (key: string) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : value;
  } catch (e) {
    return null;
  }
}

/**
 *
 * @param key
 */
const removeItem = (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    // remove error
  }
}

/**
 * Get access token from storage
 * @returns
 */
const getAccessToken = () => {
  return getItem(ACCESS_TOKEN_KEY)
}

/**
 *
 * @param value Set access token to storage
 * @returns
 */
const setAccessToken = (value: string) => {
  return setItem(ACCESS_TOKEN_KEY, value)
}

/**
 * Remove access token from storage
 * @returns
 */
const removeAccessToken = () => {
  return removeItem(ACCESS_TOKEN_KEY);
}

const getRefreshToken = () => {
  return getItem(REFRESH_TOKEN_KEY)
}

const setRefreshToken = (value: string) => {
  return setItem(REFRESH_TOKEN_KEY, value)
}

/**
 * Set url from (to redirect after login)
 * @param urlFrom
 * @returns
 */
const setUrlFrom = (urlFrom: string) => {
  return setItem(URL_FROM_KEY, urlFrom)
}

/**
 * Get url from to redirect
 * @returns
 */
const getUrlFromThenDel = () => {
  const urlFrom = getItem(URL_FROM_KEY)
  removeItem(URL_FROM_KEY)
  return urlFrom
}

/**
 * Clear all storage after logging out
 */
const clearStorage = () => {
  localStorage.clear();
}

export const storageService = {
  setUrlFrom,
  getUrlFromThenDel,
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  clearStorage,
  getRefreshToken,
  setRefreshToken
}
