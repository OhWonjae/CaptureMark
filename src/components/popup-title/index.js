import './popup-title.scss';
export function PopupTitle({ root, title, logoSrc }) {
  let target = document.createElement('div');
  target.className = 'popup-title';
  root.appendChild(target);
  let state = undefined;
  function setState(newState) {
    state = newState;
    render();
  }
  setState({ title, logoSrc });
  function render() {
    target.innerHTML = `<div class="title-group"><img src="${state.logoSrc || ''}"/><span class="title-text">${state.title || ''}</span></div>`;
  }
  render();
}
