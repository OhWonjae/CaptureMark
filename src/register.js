export const register = async () => {
  //const titleUrl = chrome.runtime.getURL('./components/popup-title');
  //console.log('titleUl', titleUrl);

  // const OpenRegister = async () => {
  //
  // };
  //const { PopupTitle } = await import('./components/popup-title');
  let root = undefined;

  if (root) {
    document.body.removeChild(root);
  }
  root = document.createElement('div');
  root.classList = 'popup';
  root.setAttribute(
    'style',
    `
    position: fixed;
    z-index: 2147483645;
    left: ${0}px;
    top: ${0}px;
    width: 500px;
    height: 400px;
    background-color: rgba(30,10,0,1);
  `,
  );
  // new PopupTitle({
  //   root,
  //   initialState: {
  //     title: 'Capture Mark',
  //     logoSrc: 'public/assets/logo/captureMark48.png',
  //   },
  // });
  document.body.appendChild(root);
  //console.log('register!!!', PopupTitle);
  //return root;
  const chromeRuntimePort = chrome.runtime.connect();
  chromeRuntimePort.onMessage.addListener(function (msg) {
    console.log('onregister', msg);
    // if (document?.body) {
    //   OpenRegister();
    // }
  });
};
