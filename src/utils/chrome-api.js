export const setLocalStorage = async data => {
  return await chrome.storage.local.set(data);
};

export const getLocalStorage = async key => {
  return await chrome.storage.local.get([key]);
};

export const getCurrentTab = async () => {
  return await chrome.tabs.query({ active: true, lastFocusedWindow: true });
};

// url 예시 - http://www.naver.com
export const createNewTab = async url => {
  return await chrome.tabs.create({ url });
};
