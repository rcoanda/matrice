export function createItemsConfig(items, { fallback = false } = {}) {
  return {
    getAllItems: () => items,
    getAllKeys: () => items.map((i) => i.key),
    getItems: (keys) => (keys ? items.filter((i) => keys.includes(i.key)) : items),
    getItem: (key) =>
      fallback ? (items.find((i) => i.key === key) ?? items[0]) : items.find((i) => i.key === key),
  }
}