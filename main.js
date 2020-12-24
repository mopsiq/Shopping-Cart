"use strict";

const block = document.querySelectorAll('.block__inner');
const blockList = document.querySelectorAll('.block__item');
const orderList = document.querySelector('.orders__inner');
const btn = document.querySelectorAll('.block__btn');
const btnClose = document.querySelectorAll('.button__close');
const btnCartClear = document.querySelector('.order__btn');

let arrayItems = [];

function creatingObject(value) {
    let obj = new Object();
    obj.a = value.className;
    obj.b = value.getAttribute('order-state');
    obj.c = value.getAttributeNames();
    obj.d = value.textContent;
    return obj;
}

function createProductInCart(object, block) {
    let result = [];
    for(let i = 0; i < object.length; i++) {
        let div = document.createElement('div');
        div.append(btnClose)
        div.className = object[i].a.split(' ')[0];
        div.textContent = object[i].d;
        div.setAttribute(object[i].c[1], object[i].b)
        result.push(div)
    }
    block.append(...result);
}

function checkingBlock(data, blockParent) {
    let storageData = JSON.parse(data);
    let array = [];
    if(Object.keys(storageData) !== null) {
        for(let i of Object.values(storageData)) {
            array.push(i.b)
        }
    }

    blockParent.forEach((item) => {
         array.forEach((elem) => {
             if(item.getAttribute('order-state') == elem) {
                item.className += ' hidden'
             }
         })
    })
    console.log(array)
   
}

document.addEventListener('DOMContentLoaded', (e) => {
    checkingBlock(window.localStorage.getItem('product'), blockList) 
    if(document.location.href.slice(22) === 'index.html') {
        btn.forEach((item) => {
            let currentBlock = item.parentElement.parentElement;
            
            if(currentBlock.classList.contains('hidden')) {
                arrayItems.push(creatingObject(currentBlock))
            }

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

    
    
    if(document.location.href.slice(22) === 'cart.html') {
        let storage = window.localStorage.getItem('product');
        let storageJSON = JSON.parse(storage)
        console.log(storageJSON)
        createProductInCart(storageJSON, orderList)

        btnCartClear.addEventListener('click', () => {
            while(orderList.children.length !== 0) {
                let i = 0;
                orderList.children[i].remove()
                i++;
            }
        })
    }
    
})


