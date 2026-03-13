export const bonusProcessor = (items, bonuses, itemWrapperProcessor) => {
  items = JSON.parse(JSON.stringify(items));
  bonuses
  ?.filter(it => it?.isGlobal)
  .filter(it => it?.type === 'itemWrapper')
  .map(it => it?.data)
  .forEach(itemWrapper => {
    items
    .filter(item => {
      return item.tags?.some(tag => itemWrapper.tags.includes(tag));
    })
    .filter(item => item.count >= itemWrapper.countToWrap)
    .forEach(item => {
      itemWrapperProcessor(item, itemWrapper, items);
    })
  })
  return items;
}