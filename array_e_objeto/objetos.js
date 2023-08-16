const gabriel={
    nome:'gabriel',
    sobrenome:'pires',
    idade:21,
    dirige:true,
    calcano:function(){
        this.ano=2023-this.idade//cria um novo campo no obj
        return this.ano},
}
const consolle=prompt("mensagem")
console.log(gabriel.nome)
console.log(gabriel['nome'])
console.log(gabriel[consolle])//ta pegando o q o prompt retorna pro consolle
//formas de adicionar campos no objeto
gabriel.país='brasil'
gabriel['cidade']='araçatuba'
console.log(gabriel.calcano())