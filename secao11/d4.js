'use strict'
const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] }
  ];
//1
dogs.forEach((dog)=>dog.recommendedFood = Number((dog.weight ** 0.75 * 28).toFixed(2)) )

//2
const Sarahdog=dogs.find(dog=>dog.owners.some(name=>name='Sarah'))
if(Sarahdog.curFood>Sarahdog.recommendedFood*1.1)
  console.log('Ele esta comendo muito')
else if(Sarahdog.curFood>Sarahdog.recommendedFood*0.9)
  console.log('Ele esta comendo pouco')
else
  console.log('Ele esta comendo direito')
//3
let ownersEatTooMuch=dogs.filter((dog)=>(dog.curFood>dog.recommendedFood*1.1)).flatMap(dog=>dog.owners)
let ownersEatTooLittle=dogs.filter((dog)=>(dog.curFood<dog.recommendedFood*0.9)).flatMap(dog=>dog.owners)

//4
let msgTM=ownersEatTooMuch.join(' and ')+"'s dog are eaten too much"
console.log(msgTM)
let msgTL=ownersEatTooLittle.join(' and ')+"'s dog are eaten too little"
console.log(msgTL)

//5
console.log(dogs.some(dog=>dog.curFood==dog.recommendedFood))

//6
console.log(dogs.some(dog=>dog.curFood<dog.recommendedFood*1.1 && dog.curFood>dog.recommendedFood*0.9))

//7

let okay=dogs.filter((dog)=>(dog.curFood<dog.recommendedFood*1.1 && dog.curFood>dog.recommendedFood*0.9))

//8
let dogsort=dogs.slice().sort((a,b)=>a.recommendedFood-b.recommendedFood)
