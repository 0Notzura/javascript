"strict mode";
let contas=[125,555,44]
let tips=[]
let total=[]
function calctips(conta){
    if(50<=conta && conta<=300)
        return conta*0.15
    return conta*0.2
}
tips.unshift(calctips(contas[2]))
tips.unshift(calctips(contas[1]))
tips.unshift(calctips(contas[0]))

total.push(tips[0]+contas[0])
total.push(tips[1]+contas[1])
total.push(tips[2]+contas[2])

