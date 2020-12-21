"use strict";

const block = document.querySelectorAll('.block__inner');
const blockList = document.querySelectorAll('.block__item');
const orderList = document.querySelector('.orders');
const btn = document.querySelectorAll('.block__btn');
const btnTwo = document.querySelector('.order__btn');

function creatingObject(value) {
    let obj = new Object();

    obj.a = value.className;
    obj.b = value.getAttribute('order-state');

    return obj;
}

function createProductInCart(object) {
    
}

document.addEventListener('DOMContentLoaded', (e) => {

    if(btn) {
        let arrayItems = [];

        btn.forEach((item) => {
          let currentBlock = item.parentElement.parentElement;
            item.addEventListener('click', () =>  {

                arrayItems.push(creatingObject(currentBlock))
                    if(!currentBlock.classList.contains('hidden')) {
                        currentBlock.classList.add('hidden')
                        currentBlock.setAttribute('disabled', 'disabled')
                    } 
                console.log(arrayItems)
                window.localStorage.setItem('product', JSON.stringify(arrayItems))

            });
        });

    };
    
    if(btnTwo) {

        btnTwo.addEventListener('click', () => {
          let storage = window.localStorage.getItem('product');
          let storageJSON = JSON.parse(storage)
          console.log(storageJSON)
          for(let i in storageJSON) {
              console.log(storageJSON[i].a)
              console.log(storageJSON[i].b)
          }
        })

    }

})


