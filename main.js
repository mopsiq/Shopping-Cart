"use strict";

const block = document.querySelectorAll('.block__inner');
const blockList = document.querySelectorAll('.block__item');
const orderList = document.querySelector('.orders__inner');
const btn = document.querySelectorAll('.block__btn');
const btnClose = document.querySelectorAll('.button__close');
const btnCartClear = document.querySelector('.order__btn');

let arrayItems = [];

function creatingObject(itemsList) {
    let objectInList = new Object();
    objectInList.a = itemsList.className;
    objectInList.b = itemsList.getAttribute('order-state');
    objectInList.c = itemsList.getAttributeNames();
    objectInList.d = itemsList.textContent;
    return objectInList;
}

function createProductInCart(object, block) {
    let newResultInBlock = [];
    for(let i = 0; i < object.length; i++) {
        let div = document.createElement('div');
        let bt = document.createElement('span')

        div.className = object[i].a.split(' ')[0];
        div.textContent = object[i].d;
        div.setAttribute(object[i].c[1], object[i].b)

        bt.className = 'button__close';
        bt.style.visibility = 'visible'

        bt.addEventListener('click', () => {
            singleRemoveItem(div, object)
            div.remove()
        })
        div.append(bt)

        newResultInBlock.push(div)
    }
    block.append(...newResultInBlock)
}

function checkingBlock(data, blockParent) {
    let storageData = JSON.parse(data);
    let attributeValueInArray = [];
    if(storageData !== null) {
        for(let i of Object.values(storageData)) {
            attributeValueInArray.push(i.b)
        }
    } 

    blockParent.forEach((item) => {
         attributeValueInArray.forEach((elem) => {
             if(item.getAttribute('order-state') == elem) {
                item.className += ' hidden'
                item.firstElementChild.lastElementChild.style.visibility = 'visible'
             }
         })
    })
};

function singleRemoveItem(block, itemsInArray) {
    let currentItemBlock = block.getAttribute('order-state')
    for(let i in itemsInArray) {
        if(itemsInArray[i].b === currentItemBlock) {
            let target = itemsInArray.indexOf(itemsInArray[i])
            itemsInArray.splice(target, 1);
        }
    }
    window.localStorage.setItem('product', JSON.stringify(itemsInArray))
}

document.addEventListener('DOMContentLoaded', (e) => {

    checkingBlock(window.localStorage.getItem('product'), blockList) 
        if(document.location.href.slice(22) === 'index.html') {

            
            btn.forEach((item) => {
                let currentBlock = item.closest('.block__item');

                btnClose.forEach((item) => {
                    item.addEventListener('click', () => {
                        singleRemoveItem(item.closest('.block__item'), arrayItems)
                    });
                });
    

                if(currentBlock.classList.contains('hidden')) {
                    arrayItems.push(creatingObject(currentBlock))
                    item.setAttribute("disabled", "disabled");
                };

                item.addEventListener('click', () =>  {
                    arrayItems.push(creatingObject(currentBlock))
                        if(!currentBlock.classList.contains('hidden')) {
                            currentBlock.classList.add('hidden')
                            item.setAttribute("disabled", "disabled");
                            item.nextElementSibling.style.visibility = 'visible';
                        } 
                    
                    console.log(arrayItems);
                    window.localStorage.setItem('product', JSON.stringify(arrayItems));
                });

            });

        };

    
    
        if(document.location.href.slice(22) === 'cart.html') {
            
            let storage = window.localStorage.getItem('product');
            let storageJSON = JSON.parse(storage);
            console.log(storageJSON);
            createProductInCart(storageJSON, orderList);

            btnCartClear.addEventListener('click', () => {
                while(orderList.children.length !== 0) {
                    let i = 0;
                    orderList.children[i].remove()
                    i++;
                };
                localStorage.clear('product')
            });
        };
    
});


