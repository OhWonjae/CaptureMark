import { screenshot } from './screenshot';
import { register } from './register';
import { getLocalStorage, setLocalStorage } from './utils/chrome-api';

chrome.runtime.onInstalled.addListener(async function () {
  chrome.contextMenus.create({
    id: 'CaptureMark',
    title: 'CaptureMark',
    contexts: ['page'],
  });
});
chrome.contextMenus.onClicked.addListener(async function (info) {
  if (info.menuItemId == 'CaptureMark') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log('capturemark tab', tabs[0].id);
      chrome.scripting
        .executeScript({
          target: { tabId: tabs[0].id, allFrames: true },
          func: screenshot,
        })
        .then(() => {
          console.log('screenshot scripting!!');
        });
    });
  }
});

chrome.runtime.onMessage.addListener(async function (request, sender) {
  if (request.action === 'captureSelectedArea') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.captureVisibleTab(tabs[0].windowId, {}, function (imageUrl) {
        // 여기에서 imageUrl을 사용하여 무언가를 할 수 있습니다.
        console.log(imageUrl); // 콘솔에 이미지 URL을 출력합니다.
        const tabId = tabs[0].id;
        // 예를 들어, 새 탭에서 이미지를 열 수 있습니다.
        chrome.scripting
          .executeScript({
            target: { tabId: tabId, allFrames: true },
            func: register,
          })
          .then(() => {
            console.log('register scripting!!');
          });
      });
    });
  }
});

chrome.runtime.onConnect.addListener(port => {
  console.log('connect', port);
  port.postMessage({ message: 'hi' });
});
