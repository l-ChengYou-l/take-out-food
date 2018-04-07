'use strict'

function bestCharge(selectedItems) {
  let allItems = loadAllItems()
  let promotion = loadPromotions()
  let selItems = []
  let sel_message = []
  let discount2_name = []
  let output = '============= 订餐明细 =============\n'
  let temp1 = ''
  let discount1 = 0
  let discount2 = 0
  let originalPrice = 0
  for (let item of selectedItems){
    selItems.push(item.split('x'))
  }
  //获取选定菜品相关信息
  for(let item of selItems) {
    for (let i in allItems){
      if(item[0].trim() == allItems[i].id){
        sel_message.push({price:allItems[i].price,count:Number(item[1]),id:allItems[i].id,name:allItems[i].name})
      }
    }
  }
  for(let item of sel_message){
    let price = item.price*item.count
    originalPrice += price
    temp1 += item.name + ' x '+ item.count+' = ' + price + '元\n'
  }
  let amount1 = originalPrice - fullReduc(originalPrice)
  let amount2 = originalPrice - halfPrice(sel_message)
  return output.concat(temp1).concat(compare(originalPrice,amount1,amount2));

  function fullReduc(originalPrice){
    discount1 = Math.floor(originalPrice/30)*6
    return discount1
  }
  function halfPrice(sel_message){
    for(let ele of sel_message){
      if(promotion[1].items.includes(ele.id)){
        discount2 += ele.price/2*ele.count
        discount2_name.push(ele.name)

      }
    }
    return discount2
  }

  function compare(originalPrice,amount1,amount2){
    let temp2 = ''
    if(amount1>amount2 && originalPrice>amount2){
      temp2 = '-----------------------------------\n' +
        '使用优惠:' +
        '\n指定菜品半价('+ discount2_name.join('，')+')，省'+discount2+'元\n-----------------------------------\n总计：'+amount2+'元\n==================================='
    }else if(amount1<originalPrice){
      temp2 = '-----------------------------------\n' +
        '使用优惠:' +
        '\n满30减6元，省'+discount1+'元\n-----------------------------------\n总计：'+amount1+'元\n==================================='

    }else{
      temp2 = '-----------------------------------\n' +
        '总计：'+originalPrice+'元\n==================================='
    }
    return temp2
  }
}
