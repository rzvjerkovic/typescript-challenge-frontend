type StorageItem = 'stopSelection'

const add = (item: StorageItem, value: string) => {
  localStorage.setItem(item, value)
}

const remove = (item: StorageItem) => {
  localStorage.removeItem(item)
}

const get = (item: StorageItem): string => {
  return localStorage.getItem(item)
}
export const localStorageService = {
  add,
  remove,
  get,
}
