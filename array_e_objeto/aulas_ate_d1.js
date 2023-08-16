//32
'use strict';
//33

/*function world(){
    console.log("Hello world");
}
world();
world();
world();

function frutas(apple,orange){
    console.log(apple,orange);
    let juice=`suco com ${apple} maças e ${orange} laranjas`;
    return juice;
}
let suco=frutas(5,4);
console.log(suco);

let suco2=frutas(2,4);
console.log(suco2);
*/


//34

/*
//const idade1=idade1f(2002); funciona pq declarações de função pd ser chamadas antes da declaração

function idade1f(ano){
    let idade=2023-ano;
    return idade;
}
const idade1=idade1f(2002);
//const idade2=idade2f(2002); não funciona pq expressões de função pd ser chamadas antes da declaração
const idade2f=function (ano){
    let idade=2023-ano;
    return idade;
}
const idade2=idade2f(2002);

console.log(idade2);
console.log(idade1);
*/


//35
const aposentaoria=(anonasce,nome)=>{
    let idade=2023-anonasce;
    let falta=65-idade;
    return `${nome} se aposentara em ${falta} anos`;

}
console.log(aposentaoria(2002,"gabriel"))