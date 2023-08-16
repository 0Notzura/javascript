"use strict";
let totais=[]
let tips=[]
let contas=[]
let i
function calctips(conta){
    if(50<=conta && conta<=300)
        return conta*0.15
    return conta*0.2
}
for(i=0;i<10;i++){
    contas.push(parseFloat((Math.random()*200).toFixed(2)))
    tips.push(parseFloat(calctips(contas[i]).toFixed(2)))
    totais.push(parseFloat((contas[i]+tips[i]).toFixed(2)))
}
