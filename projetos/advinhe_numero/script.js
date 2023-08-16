"use strict";
var number=Math.floor(Math.random()*20)
const body=document.querySelector("body")
const box=document.querySelector(".number")
const pontos=document.querySelector(".score")
const pontosmax=document.querySelector(".highscore")
const mensagem=document.querySelector(".message")
let input = document.querySelector(".guess");

input.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        check(); 
    }
});

if(number<1)
    number=1

function win(){
    body.style.backgroundColor="#60b347"
    box.innerHTML=`${number}`
    mensagem.innerHTML='acertou!!! '
    if(parseInt(pontosmax.innerHTML)<parseInt(pontos.innerHTML))
        pontosmax.innerHTML=pontos.innerHTML

}

function check(){
    let tentativa=input.value
    if(number==tentativa){
        win()
        return 
    }
    pontos.innerHTML=parseInt(pontos.innerHTML)-1
    if (parseInt(pontos.innerHTML) === 0) {
        mensagem.innerHTML = 'Você perdeu! O número era ' + number;
        input.disabled = true; // Desabilita a entrada após perder
        return;
    }
    if(number<tentativa)
    {
        mensagem.innerHTML='muito alto'
        return
    }
    mensagem.innerHTML='muito baixo'
    return
}

function reset(){
    let input = document.querySelector(".guess");
    number=Math.floor(Math.random()*20)
    pontos.innerHTML='20'
    mensagem.innerHTML='Start guessing...'
    box.innerHTML='?'
    body.style.backgroundColor="#222"
    

}