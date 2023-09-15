export const bonusProcessor = (items, bonuses, itemWrapperProcessor) => {
  items = JSON.parse(JSON.stringify(items));
  console.log("Bonuses: " + bonuses);
  console.log(bonuses);
  bonuses
  ?.filter(it => it?.isGlobal)
  .filter(it => it?.type === 'itemWrapper')
  .map(it => it?.data)
  .forEach(itemWrapper => {
    console.log("Item wrapper: ")
    console.log(itemWrapper)
    items
    .filter(item => {
      console.log("item")
      console.log(item)
      return item.tags?.some(tag => itemWrapper.tags.includes(tag));
    })
    .filter(item => item.count >= itemWrapper.countToWrap)
    .forEach(item => {
      itemWrapperProcessor(item, itemWrapper, items);
    })
  })
  return items;
}