'use strict';

//O CALL O APPLY E O BIND TB PODEM SETAR UMA VARIAVEL DO OBJ


// 133.Call e apply
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function() {}
    book(flightNum, name) {
      console.log(
        `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
      );
      this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
  };
  //add normal
  lufthansa.book(239, 'Jonas Schmedtmann');
  lufthansa.book(635, 'John Smith');
  const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
  };
  const book = lufthansa.book;
  // book(23, 'Sarah Williams') Não funciona pois o this perde seu contexto
  // Arrumando isso com o call
  book.call(eurowings, 23, 'Sarah Williams');//o primeiro argumento é pra onde o this vai apontar,por isso pode mudar
  console.log(eurowings);
  book.call(lufthansa, 239, 'Mary Cooper');
  console.log(lufthansa);
  const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
  };
  book.call(swiss, 583, 'Mary Cooper');
  // Arrumando com o apply,a diferença é que com ele se passa um array como argumento
  const flightData = [583, 'George Cooper'];
  book.apply(swiss, flightData);
  console.log(swiss);
  book.call(swiss, ...flightData);

  //134
  // The bind Method,ele seta os argumentos da função de forma fixa.O this passa a apontar sempre pra aquele objeto tb
// book.call(eurowings, 23, 'Sarah Williams');
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams');
const bookEW23 = book.bind(eurowings, 23);//pode-se setar mais de um valor
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');
// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));//foi usado o bund pq esta se passando a ufunção como argumento,n a chamando como no call
// Partial application é setar valores comuns como a taxa em um país
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
//criação de uma nova função com um valor fixo usando a função antiga como base
const addVAT = addTax.bind(null, 0.23);//o null é ncessario pq o primeiro elemento é sempre pra onde o this deve apontar
// addVAT = value => value + value * 0.23;
console.log(addVAT(100));
console.log(addVAT(23));
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
//const addVAT2 = addTaxRate(0.23);
console.log(addTaxRate(0.23)(100));
console.log(addTaxRate(0.23)(23));

//136.funções de invocação instantanea

(function(){
  console.log('this will never run again')
}
)()
