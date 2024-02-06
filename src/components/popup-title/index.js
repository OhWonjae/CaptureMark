import './popup-title.scss';
export function PopupTitle({ root, initialState }) {
  this.target = document.createElement('div'); // root Element
  this.target.className = 'popup-title';
  root.appendChild(this.target);
  this.state = initialState;
  this.render = () => {
    this.target.innerHTML = `<div class="title-group"><img src="${this.state.logoSrc || ''}"/><span class="title-text">${this.state.title || ''}</span></div>`;
  };
  this.render();
}
