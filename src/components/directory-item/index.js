import './directory-item.scss';

const _initialState = {
  title: '',
  image: undefined,
  url: '',
};
export function DirectoryItem({ root, initialState = _initialState }) {
  this.state = { ..._initialState, ...initialState };
  this.target = document.createElement('div');
  this.target.className = `directory-item`;
  this.target.setAttribute('data-id', this.state.id);
  this.target.innerHTML = `<div class="directory-item-thumbnail"><img src="${this.state.image}"/></div>
<div class="directory-item-info">
  <div class="directory-item-title">
    북마크 타이틀
    <img class="directory-item-close" src="/public/assets/close-button.png"/>
  </div>
  <div class="directory-item-url">${this.state.url || ''}</div>
</div>`;
  root.appendChild(this.target);

  this.setState = newState => {
    this.state = newState;
    this.render();
  };
  this.render = () => {
    // //console.log('setState', this.state.text);
    // this.target.className = `directory-button idx-${this.state.id} ${this.state.active ? 'active' : ''} ${this.state.edit ? 'edit' : ''} `;
    // this.target.children[0].className = `btn-input-text idx-${this.state.id} ${this.state.active ? 'active' : ''} ${this.state.edit ? 'edit' : ''}`;
    // this.target.children[0].value = this.state.text;
    //
    // this.target.children[1].className = `btn-text idx-${this.state.id} ${this.state.active ? 'active' : ''} ${this.state.edit ? 'edit' : ''}`;
    // this.target.children[1].textContent = this.state.text;
    // if (this.state.edit) {
    //   this.target.children[0].style.display = '';
    //   this.target.children[1].style.display = 'none';
    //   this.target.children[0].focus();
    // } else {
    //   this.target.children[0].style.display = 'none';
    //   this.target.children[1].style.display = '';
    // }
  };
  this.render();
}
