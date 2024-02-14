import './directory-content.scss';
import { DirectoryButton } from '../../components/directory-button';
import { copyObject, findPropertyUpwards } from '../../utils/common';
import { setStorageDirectoryData } from '../../utils/data';
export function DirectoryContent({
  root,
  initialState = { directoryData: [] },
  changeActiveDirectory,
}) {
  this.target = document.createElement('div');
  this.target.className = `directory-content`;
  root.appendChild(this.target);
  this.state = initialState;
  this.childrenInstance = [];

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
    this.render();
  };
  this.clicked = undefined;

  this.target.onclick = ev => {
    const $id = findPropertyUpwards(ev.target, 'data-id');
    if (!$id) {
      return;
    }
    const newDirectoryData = this.state.directoryData.map(d => {
      const newData = { ...d };
      if ($id === newData.id) {
        newData.active = true;
        changeActiveDirectory($id);
        // clicked가 없는데 클릭했으면 clicked 넣어주고 setTImeOut실행
        if (!this.clicked) {
          const clickTimeout = setTimeout(() => {
            this.clicked = undefined;
          }, 500);
          this.clicked = clickTimeout;
        } else {
          // clicked가 있는데 클릭했으면 더블클릭한 경우이므로 edit으로 바꿔주고 clearTimeout해주기
          clearTimeout(this.clicked);
          this.clicked = undefined;
          newData.edit = true;
        }

        return newData;
      } else {
        newData.active = false;
        newData.edit = false;
        return newData;
      }
    });
    this.setState({ directoryData: newDirectoryData });
  };
  this.target.addEventListener('change', async event => {
    console.log('Input chang evnet', event.target.value);
    //다시 edit이전 상태로 돌아가기
    const $id = findPropertyUpwards(event.target, 'data-id');
    const newDirectoryData = this.state.directoryData.map(d => {
      const newData = { ...d };
      if (
        newData.id === $id &&
        event.target.classList[0] === 'btn-input-text'
      ) {
        newData.text = event.target.value;
        return newData;
      } else {
        return newData;
      }
    });
    this.setState({ directoryData: newDirectoryData });
  });

  this.target.addEventListener('focusout', async event => {
    console.log('Input lost focus', event.target, event);
    //다시 edit이전 상태로 돌아가기
    const $id = findPropertyUpwards(event.target, 'data-id');
    const newDirectoryData = this.state.directoryData.map(d => {
      const newData = { ...d };
      if (
        newData.id === $id &&
        event.target.classList[0] === 'btn-input-text'
      ) {
        newData.edit = false;
        return newData;
      } else {
        return newData;
      }
    });
    this.setState({ directoryData: newDirectoryData });
  });

  this.render = () => {
    if (this.state.directoryData && this.state.directoryData.length > 0) {
      const isNoneActive = !this.state.directoryData.some(c => c.active);
      this.state.directoryData.forEach((d, idx) => {
        let cState = { ...d };
        if (isNoneActive) {
          cState = { ...d, active: idx === 0 };
        }
        if (this.childrenInstance.length > idx && this.childrenInstance[idx]) {
          this.childrenInstance[idx].setState(cState);
        } else {
          const directoryButton = new DirectoryButton({
            root: this.target,
            initialState: cState,
          });
          this.childrenInstance.push(directoryButton);
        }
      });
    }
  };
  this.render();
}
