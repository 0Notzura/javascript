//desestruturando arrays:103
/* let ve=[10,11,12,13,[14,15]]
let [v1,,v2,,[v3,v4]]=ve
let [i,,j,,[k=1,l=1,m=1]]=ve

console.log(v1)
console.log(v2)

[v1,v2]=[v2,v1]
console.log(v1)
console.log(v2)
 */
//desestruturando objs:104
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  
    openingHours: {
      thu: {
        open: 12,
        close: 22,
      },
      fri: {
        open: 11,
        close: 23,
      },
      sat: {
        open: 0, // Open 24 hours
        close: 24,
      },
    },
    order(starterIndex, mainIndex) {
      return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },
  };     
  const {name,openingHours}=restaurant
  console.log(name,openingHours)
  
  const {name:nome,openingHours:horas}=restaurant
  console.log(nome,horas)

  const{menu=[],starterMenu:starter=[]}=restaurant
  console.log(menu,starter)

  const obj={a:9,b:4};
  let a=90;
  let b=40;
  ({a,b}=obj)//o parentes é necessario pra não dar erro,pois a e b n estão sendo dclarados,então o js espera um bloco de codigo por começar com {}
  const {fri:{open:o,close:c}}=openingHours;
  console.log(o,c)

//Spread operator "..." 105
const arr=[7,8,9]
const newarr=[4,5,...arr]
const str='gabriel'
const letras=[...str,' ','P']

const newrestaurant={...restaurant}//faz uma copia do obj 

//rest
const {sat,...semana}=restaurant.openingHours  

const [d,e,...resto]=[newarr]//precisa ser o ultimo elemento e só pd haver 1

function add(...numbers){
  let sum=0
  for(let i;i<numbers.length;i++){
    sum+=numbers[i]
  }
  console.log(sum)
}
add(2,3)
add(4,5,6,7)
add(1,8,9)
//111.looping array
const menu2=[...restaurant.mainMenu]
for(const item of menu2)
  console.log(item)
for(const [i,el] of menu2.entries())//pega o elemento e sua posição
  console.log(`${i+1}:${el}`)

//113.Optional chaining
console.log(restaurant.openingHours?.mon?.open)//O ? serve pra saber se o elemento até ali existe,pois assim se evita o erro de tentar tirar ua prop de um undefined

const days=['mon','tue','wed','thu','fri','sat','sun']

for(const day of days){
  const open=restaurant.openingHours[day]?.open??'só outro dia'
  console.log(`De ${day} o restauramte abre ${open}`)
}

console.log(restaurant.order?.(0,1)??"metodo nçao existe")

const users=[{name:"gab",age:21,email:"@gmail.com"}]
console.log(users[0].name??"array vazio ")
//114.looping objetos
const props=Object.keys(restaurant.openingHours)
let openstr=`a gente abre em ${props.length} dias:`
for(dia of props){
  openstr+=` ${dia},`
}
console.log(openstr)
const values=Object.values(restaurant.openingHours)
console.log(values)

const entries=Object.entries(restaurant.openingHours)//é o mesmo q o values mais o nome da variavel
console.log(entries)
for(const [day,{open,close}]of entries){
  console.log(`No ${day} nós abrimos as ${open} e fechamos as ${close}`)
}

//116.Sets->arr sem repetição
orderset=new Set(['macarrao','pizza','risotto','macarrao'])
console.log(new Set('jonas'))
console.log(orderset)
console.log(orderset.size)
console.log(orderset.has('pizza'))
console.log(orderset.has('pao'))
console.log(orderset.add('pao'))
console.log(orderset.add('pao'))
console.log(orderset.delete('pizza'))
console.log(orderset)
for(const order of orderset){
  console.log(order)
}
orderset.clear()
console.log(orderset)
const cargos=['faxina','cozinha','atendente','gerente','cozinha','atendente']
const cargosSemRep=new Set(cargos)
const cargosSemRepVet=[...cargosSemRep]
console.log(cargosSemRepVet)

//117.Maps
const map=new Map()

map.set('name','classico italiano')
map.set(1,'italia')
console.log(map.set(1,'portugal'))
map.set('categorias',['italiano','vegetariano','pizzaria','organico']).set('open',11)
.set('close',23).set(true,'estamos abertos')
.set(false,'estamos fechados')

console.log(map.get('name'))
console.log(map.get(true))
console.log(map.get(1))
const hora=20
console.log(map.get(hora>map.get('open')&&hora<map.get('close')))
console.log(map.has('categorias'))
map.delete(2)
const arrkey=[1,2]//precisa ser uma variavel porque o q vai ser comparado no get é a chave de enereço,então sem a var n teriamos como pega-lo
map.set(arr,'doidera')
map.set(document.querySelector('p'),'texto qualquer')
console.log(map)
console.log(map.size)
map.clear()

//118.Maps:Iterations
const quiz=new Map([
  ['questao','qual a melhor linguagem de progamaco'],
  [1,'c'],
  [2,'java'],
  [3,'js'],
  ['correto',3],
  [true,'correto'],
  [false,'errado'],
])
console.log([...quiz])
console.log([...quiz.keys()])
console.log([...quiz.values()] )

const hoursmap=new Map(Object.entries(restaurant.openingHours))
console.log(hoursmap)
//121.strings1
const airplane='TAP Air Portugal'
const plane='B737'

console.log(plane[0])
console.log(plane[1])
console.log(plane[2])
console.log('B737'.lenght)

console.log(airplane.indexOf('r'))
console.log(airplane.lastIndexOf('r'))
console.log(airplane.indexOf('Portugal'))
console.log(airplane.indexOf('portugal'))

console.log(airplane.slice(4))
console.log(airplane.slice(4,7))
console.log(airplane)

console.log(airplane.slice(0,airplane.indexOf(' ')))
console.log(airplane.slice(airplane.lastIndexOf(' ')+1))

console.log(airplane.slice(-2))
console.log(airplane.slice(1,-1))

//122.strings 2

//arrumando a capitalização
let n="gAbrieL"
n=n[0].toUpperCase()+n.slice(1).toLowerCase()

//conferindo email

let email='gpires494@gmail.com'
let loginemail='  GpireS494@gmaiL.COM   '
loginemail=loginemail.toLowerCase().trim()
//o metodo trim tira os espaços
console.log(email===loginemail)

//trocar
const precoBR='288,95R$'
const precoEU=precoBR.replace('R$','$').replace(',','.')

const gab='gabriel gabriel gabriel'
const sec=gab.replace(/gabriel/g,'segundo')//troca todos

//booleanos
console.log(sec.includes('segundo'))
console.log(sec.startsWith('se'))
console.log(sec.endsWith('se'))

//123.strings3
//split
console.log("Uma+boa+string".split('+'))

const[firstname,lastname]='Gabriel Pires'.split()
const newname=['Mr.',firstname,lastname].join(' ')

//capitalização
const nomecompleto='gabriel mansano pires'
function captalaze(nomes){
  const nomecaptalizado=[]
  for(const nome of nomes.split(' ')){
    nomecaptalizado.push(nome.replace(nome[0],nome[0].toUpperCase()))
  }
  console.log(nomecaptalizado.join(' '))
}
captalaze(nomecompleto)

//padding
const msg='mensagem';
console.log(msg.padStart(20, '-').padEnd(30, '-'));

//repeat
console.log(' mensagem repetida'.repeat(5))






