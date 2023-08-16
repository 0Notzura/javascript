console.log("kvflm")
const calcAverageHumanAge=dogs=>
dogs
.map((e)=>(e>2?e*4+16:e*2))
.filter((e)=> e>=18)
.reduce((acc,e,i,arr)=>acc+e/arr.length,0)

let media=calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
console.log(media)
media=calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])
console.log(media)
