calcavg=(p1,p2,p3)=>(p1+p2+p3)/3

avgdolphin1=calcavg(44,23,71)
avgkoalas1=calcavg(65,54,49)
avgdolphin2=calcavg(85,54,41)
avgkoalas2=calcavg(23,34,27)

function checkwinner(avgd,avgc){
    if(avgc>=avgd*2)
        return `koalas win for ${avgc}X${avgd}`
    else{
        if(avgd>=avgc*2)
            return `dolphins win for ${avgd}X${avgc}`
    }
    return "no team wins"
}

console.log(checkwinner(avgdolphin1,avgkoalas1))