let jhon={
    nome:'jhon B',
    altura:1.8,
    massa:85,
    calcIMC:function(){
        this.imc=this.massa/(this.altura**2)
        return this.imc
    }
}
let mark={
    nome:'mark A',
    altura:1.7,
    massa:75,
    calcIMC:function(){
        this.imc=this.massa/(this.altura**2)
        return this.imc
    }
}
console.log(mark.calcIMC())
console.log(jhon.calcIMC())