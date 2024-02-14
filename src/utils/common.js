// 만약 요소의 속성값이 없을땐 부모로 올라가면서 찾기
export const findPropertyUpwards = (target, attrKey) => {
  // 속성값이 undefined거나 null이어도 속성 선언되어있으면 getNamedItem이 속성 반환함
  if (target.attributes && target.attributes.getNamedItem(attrKey)) {
    // 주의 : attr 값이 undefined나 null이라면 value값이 "undefiend", "null"로 들어옴
    const attrValue = target.attributes.getNamedItem(attrKey).value;
    return attrValue;
  }
  if (target.parentElement) {
    return findPropertyUpwards(target.parentElement, attrKey);
  } else {
    // 결국 못찾았을때
    return null;
  }
};

// 만약 요소의 클래스값이 없을땐 부모로 올라가면서 찾기
export const findClassNameUpwards = (target, className) => {
  if (target.classList && target.classList.length > 0) {
    console.log('target', target, target.classList);
    const classArray = Array.from(target.classList);
    if (classArray.includes(className)) {
      return target;
    }
  }
  if (target.parentElement) {
    return findClassNameUpwards(target.parentElement, className);
  } else {
    // 결국 못찾았을때
    return null;
  }
};

// 객체 깊은 복사시키기 (object, array, map, set, date 추가)
export const copyObject = obj => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  let copy = undefined;
  if (obj instanceof Array) {
    copy = [];
    for (const d of obj) {
      copy.push(d);
    }
    return copy;
  } else if (obj instanceof Object) {
    copy = {};
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = obj[key];
      }
    }
    return copy;
  } else if (obj instanceof Date) {
    return new Date(obj.getTime());
  } else if (obj instanceof Map) {
    copy = new Map();
    obj.forEach((value, key) => {
      copy.set(key, copyObject(value));
    });
    return copy;
  } else if (obj instanceof Set) {
    copy = new Set();
    obj.forEach(value => {
      copy.add(copyObject(value));
    });
    return copy;
  }

  throw new Error(`해당 Object(${obj})의 타입을 깊은 복사할수 없음. `);
};
