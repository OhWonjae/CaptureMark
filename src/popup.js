import './styles/base.scss';
import { PopupTitle } from './components/popup-title';
import { DirectoryContent } from './layout/directory-content';

let directoryData = [
  {
    text: '미적용스트미적미',
  },
  { text: '미적용스트미적미' },
  { text: '' },
  { text: '' },
  { text: '' },
  { text: '' },
  { text: '' },
  { text: '' },
];

setTimeout(() => {
  directoryData = [
    { text: 'abc' },
    { text: '' },
    { text: 'asdf' },
    { text: '' },
    { text: '' },
    { text: '23f2' },
    { text: '' },
    { text: '' },
  ];
  console.log('directory data');
  directoryContent.setState({ children: directoryData });
}, 1000);

const root = document.querySelector('.popup');
new PopupTitle({
  root,
  initialState: {
    title: 'Capture Mark',
    logoSrc: 'public/assets/logo/captureMark48.png',
  },
});
const directoryContent = new DirectoryContent({
  root,
  initialState: {
    children: directoryData || [],
  },
});
