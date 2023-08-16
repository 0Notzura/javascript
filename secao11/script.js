"use strict"

//142.Metodos simples

//slice
let arr=['a','b','c','d','e','f']
console.log(arr.slice(2))//aonde vai começar extraindo
console.log(arr.slice(2,4))
console.log(arr.slice(-2))
console.log(arr.slice(1,-2))
console.log(arr.slice())//cria uma copia raza como no [...arr]

//splice->tira a paprte extraiada do arra, usado muitas vezes pra tirar o ultimo elemento
console.log(arr.splice(1,1))//o segundo é o numero de elementos q queremos deletar
console.log(arr.splice(2))
console.log(arr)
console.log(arr.splice(-1))
console.log(arr)

//reverse
arr=['a','b','c','d','e','f']
let arr2=['j','i','h','g','f']
console.log(arr2.reverse())
console.log(arr2)

//concat
let letter=arr.concat(arr2)//é o mesmo que fazer [...arr,...arr2]
console.log(letter)

//join
console.log(letter.join('-'))

//143
const arr3=[23,11,64]
console.log(arr3.at(-1))

//144
const movements=[200,450,-400,3000,-650,-130,70,1300]

movements.forEach(function(mov,i,arr){
    if(mov>0){
        console.log(`Movimento ${i}:voce depositou ${mov}`)
    }
    else{
        console.log(`Movimento ${i}:voce sacou ${-mov}`)
    }
})

//145

const moedas=new Map([['usd','dollar'],['eur','euro'],['gbp','libra']])
moedas.forEach((value,key,map)=>{
    console.log(`${key}: ${value}`)
})

//150 metodo map
const doltoeur=1.1
const moveusa=movements.map(mov=>mov*doltoeur)
console.log(moveusa)

//153 reduce
const balance=movements.reduce((acm,e,i,arr)=>{//o primeiro valor é o acumulador
    return acm+e
},0)//o valor pós virgula é o valor inicial do acumulador,no caso 0

//157 metodo find

const retirada=movements.find(e=>e<0)//pega o primeiro que cumpre 
console.log(retirada)

//161
//some
console.log(movements.some(mov=>mov>0))
//every
console.log(movements.every(mov=>mov>0))

//162
//flat
const arr4=[[1,2,3],[1,2],1,2,3,4]
console.log(arr4.flat())
const arr5=[[[1,[2]],3],[1,2],1,2,3,4]
console.log(arr5.flat(3))//profundidade do flat
//flatmap->só tem profundidade 1

//163 sort

/* return<0 a,b
return>0 b,a */
/* movements.sort((a,b)=>{
    if(a>b)
        return 1
    else
        return -1
}) */
movements.sort((a,b)=>a-b)
console.log(movements)

