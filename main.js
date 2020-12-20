"use strict";

const block = document.querySelectorAll('.block__inner');
const blockList = document.querySelectorAll('.block__item');
const orderList = document.querySelector('.orders');
const btn = document.querySelectorAll('.block__btn');
const btnTwo = document.querySelector('.order__btn');


function getStyle(className) {
    let variable = '';
    let classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
      for (let i = 0; i < classes.length; i++) {

          if (classes[i].selectorText == className) {
              (classes[i].cssText) ? variable += classes[i].cssText : variable += classes[i].style.cssText;
          }
          
      }

    return variable
}

function getDataInStorage(item) {
    let obj = getStyle('.' + item.className);
    console.log(item.attributes)
    window.localStorage.setItem('user', JSON.stringify(obj))
    console.log(obj)
}


document.addEventListener('DOMContentLoaded', (e) => {

// let getStorage = window.localStorage.setItem('user', JSON.stringify(obj));
// let storage = window.localStorage.getItem('user')
// let newObj = JSON.parse(storage)
// let newObj;

    if(btn) {
        
        btn.forEach((item) => {
          let currentBlock = item.parentElement.parentElement;
            item.addEventListener('click', () =>  {
                if(!currentBlock.classList.contains('hidden')) {
                  getDataInStorage(currentBlock)
                  currentBlock.classList.add('hidden')
                  currentBlock.setAttribute('disabled', 'disabled')
                } 

            })
        })

    } 
    
    if(btnTwo) {

        btnTwo.addEventListener('click', () => {
          let storage = window.localStorage.getItem('user');
          console.log(JSON.parse(storage))
        })

    }

})


