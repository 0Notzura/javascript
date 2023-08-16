"use strict";
const player1=document.querySelector("#score--0")
const player2=document.querySelector("#score--1")
const back1=document.querySelector(".player--0")
const back2=document.querySelector(".player--1")

const current1=document.querySelector("#current--0")
const current2=document.querySelector("#current--1")
const dice=document.querySelector(".dice")
const roll=document.querySelector(".btn--roll")
const hold=document.querySelector(".btn--hold")
const new_game=document.querySelector(".btn--new")

new_game.addEventListener("click",reset)
hold.addEventListener("click",pass)
roll.addEventListener("click",roll_dice)

let scores=[0,0],dice_score,turn=0

function roll_dice(){
    dice_score=Math.ceil(Math.random()*6)
    dice.src=`img/dice-${dice_score}.png`
    if(dice_score==1){
        scores[turn]=0
        changes(turn)
        scores[turn]=0
        turn=Number(!turn)
    }
    else{
        scores[turn]+=dice_score
        turn==0 ? current1.innerHTML=`${scores[turn]}`: current2.innerHTML=`${scores[turn]}`
    }
    if(scores[turn]>=100){
        setTimeout(win,500)
    }
}
function changes(t){
    if(t==0){ 
        current1.innerHTML='0' 
        player1.innerHTML='0' 
        scores[turn]=0
        back1.classList.remove("player--active")
        back2.classList.add("player--active")
    }
    else{
        current2.innerHTML='0'
        player2.innerHTML='0'
        scores[turn]=0
        back2.classList.remove("player--active")
        back1.classList.add("player--active")
    }
}

function win(){
    alert(`parabens jogador ${turn+1}, voce ganhou!`)
    reset()
}

function pass(){
    if(turn==0){
        player1.innerHTML=`${parseInt(player1.innerHTML)+scores[turn]}`
        back1.classList.remove("player--active")
        back2.classList.add("player--active")
    }
    else{
        player2.innerHTML=`${parseInt(player2.innerHTML)+scores[turn]}`
        back2.classList.remove("player--active")
        back1.classList.add("player--active")
    }
    current1.innerHTML='0'
    current2.innerHTML='0'
    scores[turn]=0
    turn=Number(!turn)
    
}

function reset(){
    current1.innerHTML='0'
    current2.innerHTML='0'
    player1.innerHTML='0'
    player2.innerHTML='0'
    back1.classList.add("player--active")
    back2.classList.remove("player--active")
    dice.src='img/dice-5.png'
    turn=0
    scores.forEach((score)=>{
        score=0
    })
}