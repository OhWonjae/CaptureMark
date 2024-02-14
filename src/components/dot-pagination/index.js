import './dot-pagination.scss';

const _initialState = {
  totalNumbers: 0,
  currentPage: 1,
  onClick: clickedPage => {
    console.info('clickedPage', clickedPage);
  },
};
export function DotPagination({ root, initialState = _initialState }) {
  this.state = { ..._initialState, ...initialState };
  this.target = document.createElement('div');
  this.target.className = `dot-pagination`;
  root.appendChild(this.target);

  this.setState = newState => {
    this.state = { ...this.state, ...newState };
    console.log('setState result', this.state);
    this.render();
  };
  this.target.onclick = ev => {
    if (Array.from(ev.target.classList).includes('dot')) {
      const clickedPage = parseInt(ev.target.getAttribute('data-id')[0]);
      this.state = { ...this.state, currentPage: clickedPage };
      this.state.onClick(clickedPage);
    }
  };
  this.render = () => {
    const totalPages =
      this.state.totalNumbers % 6 === 0
        ? Math.floor(this.state.totalNumbers / 6)
        : Math.floor(this.state.totalNumbers / 6) + 1;
    const dots = new Array(totalPages).fill('').reduce((acc, curV, curIdx) => {
      acc += `<span data-id="${curIdx + 1}" class="dot ${curIdx + 1 === this.state.currentPage ? 'active' : ''}"></span>`;
      return acc;
    }, '');
    this.target.innerHTML = dots;
  };
  this.render();
}
