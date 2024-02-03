import './styles/base.scss';
import { PopupTitle } from './components/popup-title';

const root = document.querySelector('.popup');
PopupTitle({
  root,
  title: 'Capture Mark',
  logoSrc: 'public/assets/logo/captureMark48.png',
});
