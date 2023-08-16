'use strict'

//O funcionamento de uma função construtora é que ao ser chamada com o metodo new ocorre 4 passos:
/* 
    Primeiramente o new cria um objeto vazio{}
    Depois ele troca o contexto to this da função pra apontar pro obj vazio
    O terceioro passo é criar um prototype ao qual o obj se liga
    Por fim ele retorna o objeto com as propriedades preenchidas e o prototype assume o nome da função 
*/


const person=function(nome,nascimento){//arrow function não funciona porque n tem seu prorpio this
    this.nome=nome
    this.nascimento=nascimento
    /* Nuca faça isso,pq dessa forma cada objeto vai ter uma copia dessa função,o que é ruim para o desempenho.A forma correta de faze-lo esta na linha 24
    this.calcidade(){
        console.log(2023-nascimento)
    } */
}
const gabriel=new person('gabriel',2002)
const rafael=new person('rafale',1998)
console.log(gabriel,rafael)
console.log(gabriel instanceof person)
//adicionando metodos da maneira correta
person.prototype.calcidade=function(){
    console.log(2023-this.nascimento)
}
gabriel.calcidade()
console.log(gabriel.__proto__)
console.log(gabriel.__proto__===person.prototype)//é o prototype dos objs q serão construidos com pessoa,n é o prototype de pessoa
person.prototype.especie='homo sapiens'

console.log(gabriel.hasOwnProperty('especie'))
console.log(gabriel.hasOwnProperty('nome'))

console.log(gabriel.__proto__)
console.log(gabriel.__proto__.__proto__)//o protoype de um prototype é o protoype object
console.log(gabriel.__proto__.__proto__.__proto__)//o prototype object n tem prototypes acima dele
console.log(gabriel.__proto__.constructor)

const ar=[1,2,3,4,5,1,2,3,4,5]
console.log(ar.__proto__)
console.log(ar.__proto__.__proto__)//volta pro prototype do obj

Array.prototype.unique=function(){//esta sendo adicionado um metodo para todos os arrays do codigo.NÃO É UMA BOA PRATICA,NÃO DEVE SER FEITO
    return[...new Set(this)]
}
/* console.log(ar.unique())
console.dir(document.querySelector('h1'))//tem varios prototypes
console.dir(x=>x+2)//Uma função tem o prototype de um obj */

//Construção de classes usando class
//Uma class é um tipo especial de função,ou seja,por baixo dos panos ela funciona como uma função
class personcl{
    constructor(nome,nascimento){
        this.nome=nome
        this.nascimento=nascimento
    }
    calcidade(){
        console.log(2023-this.nascimento)
    }
    greet(){
        console.log('Olá,meu nome é '+this.nome)
    }
    set nome(n){//O que o set faz é tomar ,ou criar caso n exista, o lugar do atributo,assim o this.nome no constructor passa a ser o set e no set uma nova propriedade é 
        //criada,por padrão é _nomeoriginal.A propriedade n pd ter o mesmo nome pq se não o constructor e o set vão estar mexendo na mesma prop e vai criar um loop
        //por fims a propriedade com mesmo nome do set n aparece mais no objeto,mas continua existindo
        if(n.includes(' '))this._nome=n
        else console.log('nome n aceito')
    }
    get nome(){//com o get é como se tivesse um atributo nome que tem o _nome 
        return this._nome
    }
    static hey(){//mesmo da linha 84
        console.log(this.hey)
    }
}
const julia=new personcl('julia 2',2000)
const wlater=new personcl('wlater',200)
console.log(wlater)
console.log(julia.__proto__===personcl.prototype)
console.log(julia)

//Static
person.hey=function (){
    console.log("hey")
}
person.hey()
//gabriel.hey()//não funciona,pois o hey é somente do person,como Number.parseInt

// Object.create
const PersonProto = {
    calcAge() {
      console.log(2037 - this.birthYear);
    },
    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    },
  };
  const steven = Object.create(PersonProto);
  console.log(steven);
  steven.name = 'Steven';
  steven.birthYear = 2002;
  steven.calcAge();
  console.log(steven.__proto__ === PersonProto);
  const sarah = Object.create(PersonProto);
  sarah.init('Sarah', 1979);
  sarah.calcAge();
  

//HERANÇA COM FUNÇÃO DE CONSTRUÇÃO
const student=function(nome,nascimento,course){
    person.call(this,nome,nascimento)//ele esta chamando a função construtora e setando seu this como o this de student
    this.course=course
}
student.prototype=Object.create(person.prototype)/* Essa parte do codigo serve pra linkar o prototipo de student com o de person,permitindo que student use os métodos de 
person.
É nessessario que esse link seja feito antes de adicionar os metodos de student pq ele retorna um elemento vazi,o q apagaria os metodos

*/

student.prototype.introduce=function(){
    console.log(`My name is ${this.nome} and I study ${this.course}`)

}
const mike=new student('mike',2000,'cs')
mike.introduce()
mike.calcidade()
console.log(mike.__proto__)
console.log(mike.__proto__.__proto__)
console.log(student.prototype.constructor)
student.prototype.constructor=student
console.log(student.prototype.constructor)
console.log(mike instanceof person) 

//HERANÇA NO MODO CLASS

class studentcl extends personcl{
    //se os atributos forem os mesmos n é nessessario fazer o construtor
    constructor(nome,nascimento,course){
        super(nome,nascimento)//o supe faz o papel de chamar a função construtora pai com o call
        this.course=course
    }
    introduce(){
        console.log(`My name is ${this.nome} and I study ${this.course}`)
    
    }
}
const marta=new studentcl('marta st',2000,'cs')
marta.introduce()
marta.calcidade()

// Inheritance Between "Classes": Object.create
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();

