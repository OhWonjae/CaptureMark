import './styles/base.scss';
import { PopupTitle } from './components/popup-title';
import { DirectoryContent } from './layout/directory-content';
import { getStorageDirectoryData, setStorageDirectoryData } from './utils/data';
import { DirectoryItemContent } from './layout/directory-item-content';
import { findPropertyFromTarget } from './utils/common';
import { DotPagination } from './components/dot-pagination';

function App() {
  const data = {
    directoryData: [
      {
        id: 'a',
        text: 'abc',
        item: [
          {
            id: 'aa',
            image: '/public/assets/thumnail/thumnail1.png',
            title: 'title1',
            url: 'https://www.figma.com/file/PPIrJa2KmdIUUAOTFINvCc/CaptureMark?type=design&node-id=0-1&mode=design&t=59czoRMgdDT9l7oG-0',
          },
          {
            id: 'bb',
            image: '/public/assets/thumnail/thumnail2.png',
            title: 'title2',
            url: 'https://www.figma.com/file/PPIrJa2KmdIUUAOTFINvCc',
          },
          {
            id: 'cc',
            image: '/public/assets/thumnail/thumnail3.png',
            title: 'title2',
            url: 'https://www.figma.com/file/PPIrJa2KmdIUUAOTFINvCc',
          },
          {
            id: 'dd',
            image: '/public/assets/thumnail/thumnail4.png',
            title: 'title2',
            url: 'https://www.figma.com/file/PPIrJa2KmdIUUAOTFINvCc',
          },
          {
            id: 'ee',
            image: '/public/assets/thumnail/thumnail5.png',
            title: 'title2',
            url: 'https://www.figma.com/file/PPIrJa2KmdIUUAOTFINvCc',
          },
          {
            id: 'hh',
            image: '/public/assets/thumnail/thumnail1.png',
            title: 'title1',
            url: 'https://www.figma.com/file/PPIrJa2KmdIUUAOTFINvCc/CaptureMark?type=design&node-id=0-1&mode=design&t=59czoRMgdDT9l7oG-0',
          },
          {
            id: 'ii',
            image: '/public/assets/thumnail/thumnail2.png',
            title: 'title2',
            url: 'https://www.figma.com/file/PPIrJa2KmdIUUAOTFINvCc',
          },
          {
            id: 'jj',
            image: '/public/assets/thumnail/thumnail3.png',
            title: 'title2',
            url: 'https://www.figma.com/file/PPIrJa2KmdIUUAOTFINvCc',
          },
          {
            id: 'kk',
            image: '/public/assets/thumnail/thumnail4.png',
            title: 'title2',
            url: 'https://www.figma.com/file/PPIrJa2KmdIUUAOTFINvCc',
          },
          {
            id: 'll',
            image: '/public/assets/thumnail/thumnail5.png',
            title: 'title2',
            url: 'https://www.figma.com/file/PPIrJa2KmdIUUAOTFINvCc',
          },
        ],
        paging: { totalNumbers: 10 },
      },
      { id: 'b', text: '', item: [], paging: { totalNumbers: 0 } },
      { id: 'c', text: '', item: [], paging: { totalNumbers: 0 } },
      { id: 'd', text: '', item: [], paging: { totalNumbers: 0 } },
      {
        id: 'e',
        text: 'abc',
        item: [
          {
            id: 'ff',
            image: '/public/assets/thumnail/thumnail6.png',
            title: 'title1',
            url: 'https://www.figma.com/file/PPIrJa2KmdIUUAOTFINvCc/CaptureMark?type=design&node-id=0-1&mode=design&t=59czoRMgdDT9l7oG-0',
          },
          {
            id: 'gg',
            image: '/public/assets/thumnail/thumnail2.png',
            title: 'title2',
            url: 'https://www.figma.com/file/PPIrJa2KmdIUUAOTFINvCc',
          },
        ],
        paging: { totalNumbers: 2 },
      },
      { id: 'f', text: '', item: [], paging: { totalNumbers: 0 } },
      { id: 'g', text: '', item: [], paging: { totalNumbers: 0 } },
      { id: 'h', text: '', item: [], paging: { totalNumbers: 0 } },
    ],
  };

  setStorageDirectoryData(data.directoryData);
  const root = document.querySelector('.popup');
  // const testTarget1 = document.createElement('div');
  // const testTarget2 = document.createElement('div');
  // const testTargetTarget1 = document.createElement('div');
  // root.appendChild(testTarget1);
  // root.appendChild(testTarget2);
  // testTarget1.appendChild(testTargetTarget1);
  // testTarget1.setAttribute('data-id', 123);
  // testTarget1.className = 'data-id';
  // console.log(
  //   'attributes',
  //   root,
  //   findPropertyFromTarget(testTargetTarget1, 'data-id'),
  //   root.getAttribute('data-id'),
  //   root.getElementsByClassName('data-id'),
  // );
  // Directory에는 그 하위 아이템 데이터 필요없음
  console.log('popup opne!!!');
  new PopupTitle({
    root,
    initialState: {
      title: 'Capture Mark',
      logoSrc: 'public/assets/logo/captureMark48.png',
    },
  });
  this.activeDirectoryId = data.directoryData[0].id;
  const changeActiveDirectory = async id => {
    if (this.activeDirectoryId !== id) {
      const fetchedData = await getStorageDirectoryData();
      const idx = fetchedData.directoryData.findIndex(v => v.id === id);

      directoryItemContent.setState({
        directoryItemData: fetchedData.directoryData[idx].item,
        activeDirectoryId: id,
      });
      this.activeDirectoryId = id;
      changeActivePage(1);
    }
  };

  new DirectoryContent({
    root,
    initialState: {
      directoryData: data.directoryData,
    },
    changeActiveDirectory,
  });

  const directoryItemContent = new DirectoryItemContent({
    root,
    initialState: {
      activeDirectoryId: this.activeDirectoryId,
      directoryItemData: data.directoryData.filter(
        d => d.id === this.activeDirectoryId,
      )[0].item,
    },
  });

  const changeActivePage = async clickedPage => {
    const fetchedData = await getStorageDirectoryData();
    console.log('fetchedData', fetchedData.directoryData);
    const allItem = fetchedData.directoryData.filter(
      d => d.id === this.activeDirectoryId,
    )[0].item;

    const startIdx = 6 * (clickedPage - 1);
    console.log('allItem1', allItem);
    directoryItemContent.setState({
      directoryItemData: allItem.slice(startIdx, startIdx + 6),
    });
    console.log('allItem2', allItem);
    dotPagination.setState({
      totalNumbers: allItem.length || 0,
      currentPage: clickedPage,
    });
  };
  const dotPagination = new DotPagination({
    root,
    initialState: { totalNumbers: 0, onClick: changeActivePage },
  });
  changeActivePage(1);
}
new App();
