import { getLocalStorage, setLocalStorage } from './chrome-api';

export const setStorageDirectoryData = async directoryData => {
  await setLocalStorage({ directoryData });
};

export const getStorageDirectoryData = async () => {
  return await getLocalStorage('directoryData');
};

export const setStorageDirectoryItemData = async (
  activeDirectoryId,
  directoryItemData,
) => {
  console.log('setStorageDirectoryData', activeDirectoryId, directoryItemData);
  const data = await getStorageDirectoryData();
  const directoryData = data.directoryData;
  const newDirectoryData = directoryData.reduce((prev, data) => {
    if (data.id === activeDirectoryId) {
      data.item = directoryItemData;
      prev.push(data);
    } else {
      prev.push(data);
    }
    return prev;
  }, []);
  console.log('setStorageDirectoryData', newDirectoryData);
  await setLocalStorage({ directoryData: newDirectoryData });
};
