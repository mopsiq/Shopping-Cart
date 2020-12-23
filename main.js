"use strict";

const block = document.querySelectorAll('.block__inner');
const blockList = document.querySelectorAll('.block__item');
const orderList = document.querySelector('.orders__inner');
const btn = document.querySelectorAll('.block__btn');
const btnTwo = document.querySelector('.order__btn');

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
        let from = object[i].a.search()
        object[i].a = object[i].a.slice(0, 11)
        div.className = object[i].a;
        div.textContent = object[i].d;
        div.setAttribute(object[i].c[1], object[i].b)
        result.push(div)
        console.log(object[i].a)
    }
    block.append(...result);
}

function testBlock(domen, block) {
    let storageFunction = JSON.parse(domen);
    let testArray = [];
    if(Object.keys(storageFunction) !== null) {
        for(let i of Object.values(storageFunction)) {
            testArray.push(i.b)
        }
    }

    block.forEach((item) => {
        for(let i = 0; i < block.length; i++) {
            if(item.getAttribute('order-state') == testArray[i]) {
                item.className += ' hidden'
            }
        }
    })
    console.log(testArray)
   
}

document.addEventListener('DOMContentLoaded', (e) => {
    console.log(arrayItems)
    if(document.location.href.slice(22) === 'index.html') {
        
        btn.forEach((item) => {
            let currentBlock = item.parentElement.parentElement;
            if(currentBlock.classList.contains('hidden')) {
                arrayItems.push(creatingObject(currentBlock))
            }
            console.log(arrayItems)
            testBlock(window.localStorage.getItem('product'), blockList) 

            item.addEventListener('click', () =>  {
                
                arrayItems.push(creatingObject(currentBlock))
                    if(!currentBlock.classList.contains('hidden')) {
                        currentBlock.classList.add('hidden')
                        currentBlock.setAttribute('disabled', 'disabled')
                        // window.localStorage.setItem('blocks', JSON.stringify(arrayItems))
                    }
                    console.log(arrayItems)
                window.localStorage.setItem('product', JSON.stringify(arrayItems))
                
            });

        });
        // console.log(checkingBlocks(window.localStorage.setItem('product', JSON.stringify(arrayItems))))
    };

    
    
    if(document.location.href.slice(22) === 'cart.html') {
        let storage = window.localStorage.getItem('product');
        let storageJSON = JSON.parse(storage)
        console.log(storageJSON)
        createProductInCart(storageJSON, orderList)
    }

})


