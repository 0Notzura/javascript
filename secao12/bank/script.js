const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  
    movementsDates: [
      "2019-11-18T21:31:17.178Z",
      "2019-12-23T07:42:02.383Z",
      "2020-01-28T09:15:04.904Z",
      "2020-04-01T10:17:24.185Z",
      "2020-05-08T14:11:59.604Z",
      "2020-07-26T17:01:17.194Z",
      "2020-07-28T23:36:17.929Z",
      "2020-08-01T10:51:36.790Z",
    ],
    currency: "EUR",
    locale: "pt-PT", // de-DE
  };
  
  const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  
    movementsDates: [
      "2019-11-01T13:15:33.035Z",
      "2019-11-30T09:48:16.867Z",
      "2019-12-25T06:04:23.907Z",
      "2020-01-25T14:18:46.235Z",
      "2020-02-05T16:33:06.386Z",
      "2020-04-10T14:43:26.374Z",
      "2020-06-25T18:49:59.371Z",
      "2020-07-26T12:01:20.894Z",   
    ],
    currency: "USD",
    locale: "en-US",
  };
  
  const accounts = [account1, account2];

  

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

function displaydate(date){
  const gone=Math.floor(Math.abs(date-new Date())/(1000*3600*24))
  if(gone==0) return 'today'
  if(gone==1) return 'yesterday'
  if(gone<7)return `${gone} days ago`
  /* const day=`${date.getDate()}`.padStart(2,0)
  const month=`${date.getMonth()+1}`.padStart(2,0)
  const year=date.getFullYear()
  return `${day}/${month}/${year}` */
  return new Intl.DateTimeFormat(currentacc.locale).format(date)
}

function timer(){
  let time=300
  function tick(){
    let min=String(Math.floor(time/60)).padStart(2,0)
    let sec=String(time%60).padStart(2,0)
    labelTimer.textContent=`${min}:${sec}`
    time--
    if(time==0){
      clearInterval(timer_int)
      labelWelcome.textContent='Log in to get started'
      containerApp.style.opacity=0
    }
  }
  return setInterval(tick,1000)
}
function formatcur(locale,value,cur){
  return new Intl.NumberFormat(locale,{style:'currency',currency:cur}).format(value)
}

function displaymov(acc,sort=false){
  const moves=sort?acc.movements.slice().sort((a,b)=>a-b):acc.movements
    containerMovements.innerHTML=''
    moves.forEach((e,i) => {
        const type=e>0?'deposit':'withdrawal';
        const date=new Date(acc.movementsDates[i])
        const currentdate=displaydate(date)

        const ftd=formatcur(acc.locale,e,acc.currency)
        const nhtml=`<div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__date">${currentdate}</div>
        <div class="movements__value">${ftd}</div>
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
  const ftd=formatcur(acc.locale,incomes,acc.currency)
  labelSumIn.textContent = `${ftd}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const ftdout=formatcur(acc.locale,Math.abs(out),acc.currency)
  labelSumOut.textContent = `${ftdout}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
       console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  const ftdinteres=formatcur(acc.locale,Math.abs(interest),acc.currency)
  labelSumInterest.textContent = `${ftdinteres}`;
}; 

function calcDisplayBalance(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const ftd=formatcur(acc.locale,acc.balance,acc.currency)
  labelBalance.textContent = `${ftd}`;
};
function update(acc){
  displaymov(acc)
  calcDisplaySummary(acc)
  calcDisplayBalance(acc)
}

function createUsername(users){
  users.forEach((user)=>{
    user.username=user.owner.toLowerCase().split(' ').map(e=>e[0]).join('') 
  })
}
createUsername(accounts)

let currentacc,countdown
btnLogin.addEventListener('click',function(e){
  e.preventDefault()
  currentacc=accounts.find(acc=>
    acc.username==inputLoginUsername.value
  )
  console.log(currentacc)
  if(currentacc?.pin==inputLoginPin.value){
    /* const now=new Date()
    const day=`${now.getDate()}`.padStart(2,0)
    const month=`${now.getMonth()+1}`.padStart(2,0)
    const year=now.getFullYear() */
    if(countdown) clearInterval(countdown)
    countdown=timer()
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }
    labelDate.textContent=`${new Intl.DateTimeFormat(currentacc.locale,options).format(new Date())}`
    labelWelcome.textContent=`Welcome ${currentacc.owner}`
    containerApp.style.opacity=100
    inputLoginUsername.value=inputLoginPin.value=''

    update(currentacc)

  }
})  

btnTransfer.addEventListener('click',function(e){
  e.preventDefault()
  const accounttf=accounts.find(acc=>acc.username==inputTransferTo.value)
  const val=+(inputTransferAmount.value)
  if(val>0 && accounttf  && val<currentacc.balance  && accounttf.username!=currentacc.username ){
    inputTransferAmount.value=inputTransferTo.value=''
    setTimeout(()=>{
    currentacc.movements.push(-val)
    accounttf.movements.push(val)
    currentacc.movementsDates.push(new Date().toISOString())
    accounttf.movementsDates.push(new Date().toISOString())
    update(currentacc)},1000)
  }
})

btnClose.addEventListener('click',function(e){
  e.preventDefault()
  if(currentacc.username==inputCloseUsername.value && currentacc.pin==+(inputClosePin.value)){
    const i=accounts.findIndex(acc=>acc.username==currentacc.username)
    accounts.splice(i,1)
    containerApp.style.opacity=0 
    labelWelcome.textContent=`Log in to get started`  
  }
})

btnLoan.addEventListener('click',function(e){
  e.preventDefault()
  const amount=+(inputLoanAmount.value)  
  currentacc.movementsDates.push(new Date().toISOString())
  if(currentacc.movements.some(mov=>mov>amount*0.1)){
    inputLoanAmount.value=''
    setTimeout(()=>{
    currentacc.movements.push(amount)
    update(currentacc)
    },1000)

  }
})
let sorted=true
btnSort.addEventListener('click',function(){
  displaymov(currentacc,sorted)
  sorted=!sorted
}) 

currentacc=account1
update(currentacc)
containerApp.style.opacity=100