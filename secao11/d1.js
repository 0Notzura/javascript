'use strict'
function checkdog(ju,kate){
    const ju2=ju.slice(1).slice(0,-2)
    const fused=ju2.concat(kate)
    fused.forEach((e,i) => {
        if(e>3){
            console.log(`Dog number ${i} is an adult, and is ${e} years old`)
        }
        else{
            console.log(`Dog number ${i} is an puppy, and is ${e} years old`)
        }
    });
}
checkdog([3, 5, 2, 12, 7],[4, 1, 15, 8, 3]) 
checkdog([9, 16, 6, 8, 3],[10, 5, 6, 1, 4])