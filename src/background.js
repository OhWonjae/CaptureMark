import { screenshot } from './screenshot';

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

chrome.runtime.onMessage.addListener(function (request, sender) {
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension',
  );
  if (request.action === 'captureSelectedArea') {
    console.log('rect!!', request.rect);
  }
});

chrome.runtime.onConnect.addListener(port => {
  console.log('connect', port);
  port.postMessage({ message: 'hi' });
});
