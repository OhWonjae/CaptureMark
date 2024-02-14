import './directory-item-content.scss';
import { findClassNameUpwards, findPropertyUpwards } from '../../utils/common';
import { DirectoryItem } from '../../components/directory-item';
import {
  getStorageDirectoryData,
  setStorageDirectoryData,
} from '../../utils/data';
import { createNewTab } from '../../utils/chrome-api';
export function DirectoryItemContent({
  root,
  initialState = { activeDirectoryId: undefined, directoryItemData: [] },
}) {
  this.target = document.createElement('div');
  this.target.className = `directory-item-content`;
  root.appendChild(this.target);
  this.state = initialState;
  this.childrenInstance = [];

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
    this.render();
  };
  const handleOnClick = async ev => {
    const $id = findPropertyUpwards(ev.target, 'data-id');
    if (!$id) {
      return;
    }
    if (ev.target.classList[0] === 'directory-item-close') {
      const newDirectoryItemData = this.state.directoryItemData.filter(
        d => d.id !== $id,
      );

      const res = await getStorageDirectoryData();
      const resultData = res.directoryData.reduce((acc, cur) => {
        if (cur.id === this.state.activeDirectoryId) {
          //이 부분 기존 아이템 개수에서 해당 페이지의 개수에서 빠진 만큼만 빼주기!!
          cur.item = cur.item.filter(d => d.id !== $id);
        }
        acc.push(cur);
        return acc;
      }, []);
      console.log('activeItemData', resultData);
      await setStorageDirectoryData(resultData);

      console.log('newData', resultData);
      this.setState({
        activeDirectoryId: this.state.activeDirectoryId,
        directoryItemData: newDirectoryItemData,
      });
    } else {
      const itemTarget = findClassNameUpwards(ev.target, 'directory-item');
      if (itemTarget) {
        const $id = findPropertyUpwards(itemTarget, 'data-id');
        const findItemData = this.state.directoryItemData.filter(
          d => d.id === $id,
        )[0];
        if (findItemData.url) {
          await createNewTab(findItemData.url);
        }
      }
    }
  };

  this.render = () => {
    const newChild = document.createElement('div');
    newChild.className = `directory-item-content`;
    newChild.onclick = handleOnClick;
    root.replaceChild(newChild, this.target);
    this.target = newChild;

    if (
      this.state.directoryItemData &&
      this.state.directoryItemData.length > 0
    ) {
      this.state.directoryItemData.forEach(d => {
        let cState = { ...d };
        new DirectoryItem({
          root: this.target,
          initialState: cState,
        });
      });
    }
  };
  this.render();
}
