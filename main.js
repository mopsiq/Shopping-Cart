"use strict";

let block = document.querySelectorAll('.block');
let blockList = document.querySelectorAll('.block__item');
let orderList = document.querySelector('.orders');
let btn = document.querySelector('.block__btn');
let test = {
  name: 'Jack',
  age: 15
}
let getStorage = window.localStorage.setItem('user', JSON.stringify(test));


function getValueBlocks(item) {
  let count = [];
    for(let i = 0; i < item.children.length; i++) {
        count.push(item.children[i].getAttribute('order-state'));
    }
  return count.map(i => +i);
}

document.addEventListener('DOMContentLoaded', (e) => {
  let storage = window.localStorage.getItem('user')
  let newObj = JSON.parse(storage)
  console.log(newObj.name)

  btn.addEventListener('click', (e) => {

      block.forEach((item) => {
          console.log(getValueBlocks(item))
      })

  })
})
// console.log(document.querySelector('.block__item').getAttribute('order-state'));