'use strict';
const button_modal=document.querySelectorAll(".show-modal")
const modal=document.querySelector(".modal")
const overlay=document.querySelector(".overlay")
const close_modal=document.querySelector(".close-modal")

button_modal.forEach((button)=>{
    button.addEventListener('click',open)
})

close_modal.addEventListener('click',close)
overlay.addEventListener('click',close)
document.addEventListener('keyup',esc)

function open(){
    modal.classList.remove("hidden")
    overlay.classList.remove("hidden")
}

function close(){
    modal.classList.add("hidden")
    overlay.classList.add("hidden")
}

function esc(e){
    if(e.key==='Escape'){
        modal.classList.add("hidden")
        overlay.classList.add("hidden")
    }
}