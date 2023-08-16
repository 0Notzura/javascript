'use strict'
function calcAverageHumanAge(dogs){
    /*  const fusion=ju.concat(kate) */
    let hage=dogs.map((e)=>{
        return e>2?e*4+16:e*2
    }) 
    console.log(hage)
    let m18=hage.filter((e)=>{
        return e>18
    })
    console.log(m18)
    let media=m18.reduce((acc,e)=>{
        return acc+e/m18.length
    },0)
    console.log(media)
    return media
}
let result=calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
result=calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])
