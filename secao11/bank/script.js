'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'gabriel pires',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'luiz gonzaga',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'juliano rossi',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'luiza sales',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

function displaymov(move,sort=false){
  const moves=sort?move.slice().sort((a,b)=>a-b):move
    containerMovements.innerHTML=''
    moves.forEach((e,i) => {
        const type=e>0?'deposit':'withdrawal';
        
        const nhtml=`<div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__value">${e}</div>
        </div>`
        containerMovements.insertAdjacentHTML('afterbegin',nhtml)
    });
}

function displaycalcmove(move){
  const balance=move.reduce((acm,val)=>
    acm+val,0)
   labelBalance.textContent=`${balance} EUR`
}
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
       console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
}; 

function calcDisplayBalance(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
function update(acc){
  displaymov(acc.movements)
  calcDisplaySummary(acc)
  calcDisplayBalance(acc)
}

function createUsername(users){
  users.forEach((user)=>{
    user.username=user.owner.toLowerCase().split(' ').map(e=>e[0]).join('') 
  })
}
createUsername(accounts)

let currentacc
btnLogin.addEventListener('click',function(e){
  e.preventDefault()
  currentacc=accounts.find(acc=>
    acc.username==inputLoginUsername.value
  )
  console.log(currentacc)
  if(currentacc?.pin==inputLoginPin.value){
    labelWelcome.textContent=`Welcome ${currentacc.owner}`
    containerApp.style.opacity=100
    inputLoginUsername.value=inputLoginPin.value=''

    displaymov(currentacc.movements)
    calcDisplaySummary(currentacc)
    calcDisplayBalance(currentacc)

  }
})  

btnTransfer.addEventListener('click',function(e){
  e.preventDefault()
  const accounttf=accounts.find(acc=>acc.username==inputTransferTo.value)
  const val=Number(inputTransferAmount.value)
  if(val>0 && accounttf  && val<currentacc.balance  && accounttf.username!=currentacc.username ){
    currentacc.movements.push(-val)
    accounttf.movements.push(val)
    update(currentacc)
  }
  inputTransferAmount.value=inputTransferTo.value=''
})

btnClose.addEventListener('click',function(e){
  e.preventDefault()
  if(currentacc.username==inputCloseUsername.value && currentacc.pin==Number(inputClosePin.value)){
    const i=accounts.findIndex(acc=>acc.username==currentacc.username)
    accounts.splice(i,1)
    containerApp.style.opacity=0 
    labelWelcome.textContent=`Log in to get started`  
  }
})

btnLoan.addEventListener('click',function(e){
  e.preventDefault()
  const amount=Number(inputLoanAmount.value)
  if(currentacc.movements.some(mov=>mov>amount*0.1)){
    currentacc.movements.push(amount)
    update()
    inputLoanAmount.value=''

  }
})
let sorted=true
btnSort.addEventListener('click',function(){
  displaymov(currentacc.movements,sorted)
  sorted=!sorted
})  
