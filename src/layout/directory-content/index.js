import './directory-content.scss';
import { DirectoryButton } from '../../components/directory-button';
import { getIdxFromClassList } from '../../utils/common';
export function DirectoryContent({ root, initialState = { children: [] } }) {
  this.target = document.createElement('div');
  this.target.className = `directory-content`;
  root.appendChild(this.target);
  this.state = initialState;
  this.childrenInstance = [];

  this.setState = newState => {
    this.state = newState;
    this.render();
  };
  this.clicked = undefined;

  this.target.onclick = ev => {
    const $idx = getIdxFromClassList(ev.target.classList);
    if ($idx === undefined || $idx === null || $idx < 0) {
      return;
    }
    const newChildren = this.state.children.map((c, idx) => {
      const newChild = { ...c };
      if ($idx === idx) {
        newChild.active = true;
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
          newChild.edit = true;
        }

        return newChild;
      } else {
        newChild.active = false;
        newChild.edit = false;
        return newChild;
      }
    });
    this.setState({ children: newChildren });
  };
  this.target.addEventListener('change', event => {
    console.log('Input chang evnet', event.target.value);
    //다시 edit이전 상태로 돌아가기
    const $idx = getIdxFromClassList(event.target.classList);
    const newChildren = this.state.children.map((child, idx) => {
      const newChild = { ...child };
      if (idx === $idx && event.target.classList[0] === 'btn-input-text') {
        newChild.text = event.target.value;
        return newChild;
      } else {
        return newChild;
      }
    });
    this.setState({ children: newChildren });
  });
  this.target.addEventListener('focusout', event => {
    console.log('Input lost focus', event.target, event);
    // 다시 edit이전 상태로 돌아가기
    const $idx = getIdxFromClassList(event.target.classList);
    const newChildren = this.state.children.map((child, idx) => {
      const newChild = { ...child };
      if (idx === $idx && event.target.classList[0] === 'btn-input-text') {
        newChild.edit = false;
        console.log('newChild', idx, newChild);
        return newChild;
      } else {
        return newChild;
      }
    });
    this.setState({ children: newChildren });
  });

  this.render = () => {
    if (this.state.children && this.state.children.length > 0) {
      const isNoneActive = !this.state.children.some(c => c.active);
      this.state.children.forEach((child, idx) => {
        let cState = { ...child, id: idx };
        if (isNoneActive) {
          cState = { ...child, id: idx, active: idx === 0 };
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
