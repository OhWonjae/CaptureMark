export const screenshot = () => {
  const closeButtonDir = chrome.runtime.getURL(
    '/public/assets/close-button.png',
  );

  const CloseCapture = () => {
    const overalls = document.body.getElementsByClassName('capture_mark')[0];
    if (overalls) {
      document.body.removeChild(overalls);
    }
  };

  const StartCapture = () => {
    let _overall = undefined;

    if (_overall) {
      document.body.removeChild(_overall);
    }
    _overall = document.createElement('div');
    _overall.classList = 'capture_mark';
    _overall.setAttribute(
      'style',
      `
    position: fixed;
    z-index: 2147483645;
    left: ${0}px;
    top: ${0}px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.3);
    border: 2px dashed #FFF;
  `,
    );
    const closeButton = document.createElement('img');
    closeButton.classList = 'capture_close';
    closeButton.setAttribute('src', `${closeButtonDir}`);
    closeButton.setAttribute(
      'style',
      ` position: fixed;
      cursor:pointer;
    z-index: 2147483647;
    right: 30px;
    top: 30px;
    width: 20px;
    height: 20px;`,
    );
    closeButton.onclick = CloseCapture;
    _overall.appendChild(closeButton);
    document.body.appendChild(_overall);

    document.addEventListener('mousedown', function onMouseDown(e) {
      let startX = e.pageX - window.scrollX;
      let startY = e.pageY - window.scrollY;
      console.log('startXY', startY, window.scrollY, e.pageY, e.offsetY);
      const subset = document.createElement('div');
      subset.setAttribute(
        'style',
        `
    position: fixed;
    z-index: 2147483646;
    left: ${startX}px;
    top: ${startY}px;
    width: 0;
    height: 0;
    background-color: rgba(0,0,0,0.7);
    border: 2px dashed #FFF;
  `,
      );
      _overall.appendChild(subset);

      function onMouseMove(e) {
        let currentX = e.pageX - window.scrollX;
        let currentY = e.pageY - window.scrollY;
        let width = Math.abs(currentX - startX);
        let height = Math.abs(currentY - startY);
        subset.style.width = `${width}px`;
        subset.style.height = `${height}px`;
        subset.style.left = `${Math.min(startX, currentX)}px`;
        subset.style.top = `${Math.min(startY, currentY)}px`;
      }

      function onMouseUp() {
        document.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        const rect = subset.style;
        _overall.removeChild(subset);
        CloseCapture();
        // 선택된 영역의 정보를 백그라운드 스크립트로 전송
        chrome.runtime.sendMessage({
          action: 'captureSelectedArea',
          rect: {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
          },
        });

        // console.log(getEventListeners(document));
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
    document.addEventListener('keypress', e => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        CloseCapture();
      }
    });
    return _overall;
  };
  var chromeRuntimePort = chrome.runtime.connect();
  chromeRuntimePort.onMessage.addListener(function () {
    if (document?.body) {
      CloseCapture();
      StartCapture();
    }
  });
  chromeRuntimePort.onDisconnect.addListener(() => {
    chromeRuntimePort = undefined;
    console.log('onDisConnect!!');
  });
};
