export const getIdxFromClassList = classList => {
  const idxClassList = Array.from(classList).filter(className =>
    className.startsWith('idx-'),
  );
  if (idxClassList.length === 0) {
    return undefined;
  }
  const idxClassName = idxClassList[0];
  const $idx = parseInt(idxClassName.slice(4, idxClassName.length));
  return $idx;
};
