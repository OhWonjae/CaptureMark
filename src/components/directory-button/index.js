import './directory-button.scss';

const _initialState = {
  text: '',
  active: false,
  id: 0,
  edit: false,
};
export function DirectoryButton({ root, initialState = _initialState }) {
  this.state = { ..._initialState, ...initialState };
  this.target = document.createElement('button');
  this.target.className = `directory-button ${this.state.active ? 'active' : ''} ${this.state.edit ? 'edit' : ''}`;
  this.target.setAttribute('data-id', this.state.id);
  this.target.innerHTML = `<input class="btn-input-text" type='text' maxlength='8' style="display:none" value="${this.state.text}"/>
    <div class="btn-text ">${this.state.text}</div>`;
  root.appendChild(this.target);

  this.setState = newState => {
    this.state = newState;
    this.render();
  };
  this.render = () => {
    //console.log('setState', this.state.text);
    this.target.className = `directory-button ${this.state.active ? 'active' : ''} ${this.state.edit ? 'edit' : ''}`;
    this.target.setAttribute('data-id', this.state.id);
    this.target.children[0].value = this.state.text;
    this.target.children[1].textContent = this.state.text;
    if (this.state.edit) {
      this.target.children[0].style.display = '';
      this.target.children[1].style.display = 'none';
      this.target.children[0].focus();
    } else {
      this.target.children[0].style.display = 'none';
      this.target.children[1].style.display = '';
    }
  };
  this.render();
}
