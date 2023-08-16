'use strict';
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let map,mapEvent


class workOut{
    date=new Date()
    id= (Date.now()+'').slice(-10)//o id vai ser as 10 ultimas letras da data
    constructor(coords,distance,duration){
        this.coords=coords
        this.distance=distance
        this.duration=duration
    }
    _description(){
        const months=['january','february','March','April','May','June','July','August','September','October','November','December']
        return `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }
}
class Running extends workOut{
    type='running'
    constructor(coords,distance,duration,cadence){
        super(coords,distance,duration)
        this.cadence=cadence
        this.calcPace()
        this._description()
    }
    calcPace(){// min/km
        this.pace=this.duration/this.distance
    }
}
class Cycling extends workOut{
    type='cycling'
    constructor(coords,distance,duration,elevation){
        super(coords,distance,duration)
        this.elevation=elevation
        this.calcSpeed()
        this._description()
    }
    calcSpeed(){// km/min
        this.speed=this.distance/(this.duration/60)
    }
}
class App{
    #map
    #mapEvent
    #workout=[]
    constructor(){
        this._getPosition()
        form.addEventListener('submit',this._newWorkout.bind(this))
        inputType.addEventListener('change',()=>{
            inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
            inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
        })
        containerWorkouts.addEventListener('click',this._findPopup.bind(this))
        
    }
    _getPosition(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),
            function(){
                alert('counl not get your position')
            })
        
        }
    }
    _loadMap(poisicao){
        const {latitude}=poisicao.coords
            const {longitude}=poisicao.coords
            const coords=[latitude, longitude]
            this.#map = L.map('map').setView(coords, 13);
        
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {//diferentes stilos https://leaflet-extras.github.io/leaflet-providers/preview/ 
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);
        
            /* L.marker(coords).addTo(map)
            .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup(); */
        this.#map.on('click',this._showForm.bind(this))
        this._getlogalstorage()
    }
    _showForm(mapE){
        form.classList.remove('hidden')
                    inputDistance.focus()
                    this.#mapEvent=mapE
                    console.log(this.#mapEvent)
    }
    _toggleELevationFiel(){}
    _newWorkout(e){
        e.preventDefault()
        function isValid(...inputs){
            return inputs.every(inp=>Number.isFinite(inp) && inp>0)
        }
        
        //pegar os dados do forms
        const type=inputType.value
        const distance= +inputDistance.value
        const duration= +inputDuration.value
        const {lat,lng}=this.#mapEvent.latlng
        let workout
        //checar se os dados são validos

        //se for corrida criar um running
        if(type==='running'){
            const cadence= +inputCadence.value
            if(!isValid(duration,distance,cadence) ) return alert('Inputs devem ser numeros positivos')
            workout=new Running([lat,lng],distance,duration,cadence)
        }
        //caso contrario
        if(type==='cycling'){
            const elevation= +inputElevation.value
            if(!isValid(duration,distance,elevation) ) return alert('Inputs devem ser numeros positivos')
            workout=new Cycling([lat,lng],distance,duration,elevation)
        }
        //add o obj ao array do workout 
        this.#workout.push(workout)
        //render
        this._renderAll(workout)
        console.log(this.#mapEvent)
        this._setlocalstorage()
        
    }
    _hideForm(){
        inputCadence.value=inputDistance.value=inputDuration.value=inputElevation.value=''
        form.style.display='none'
        form.classList.add("hidden")
        setTimeout(() => form.style.display='grid', 1000);
    }
    _renderAll(work){
        this._rendermarker(work)
        this._rendercontentmaker(work)        
        this._hideForm()
    }
    _rendermarker(work){
        L.marker(work.coords).addTo(this.#map).bindPopup(
            L.popup({//marker é o local q se cria o aviso,addto é em qual mapa,bind popup é pra fazer o popup e o popup é alterações
            maxWidth:250,
            minWidth:100,
            autoClose:false,
            closeOnClick:false,
            className:`${work.type}-popup`
            })
        )
        .setPopupContent(`${work.type==='running'?'🏃‍♂️':'🚴‍♀️'} ${work._description()}`)
        .openPopup();
    }
    _rendercontentmaker(work){
        let html=`
        <li class="workout workout--${work.type}" data-id="${work.id}">
        <h2 class="workout__title">${work._description()}</h2>
        <div class="workout__details">
          <span class="workout__icon">${work.type==='running'? '🏃‍♂️':'🚴‍♀️'}</span>
          <span class="workout__value">${work.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${work.duration}</span>
          <span class="workout__unit">min</span>
        </div>`
        if(work.type==='running'){
            html+=
          `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${work.pace}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${work.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`
        }
        else{
            html+=`
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${work.speed}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${work.elevation}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>` 
        }
        form.insertAdjacentHTML('afterend',html)
    }
    _findPopup(e){
        const workoutEl=e.target.closest('.workout')
        if(!workoutEl) return
        const work=this.#workout.find(work=>work.id===workoutEl.dataset.id)
        this.#map.setView(work.coords,13,{
            animate:true,
            pan:{
                duration:1
            }
        })
    }
    _setlocalstorage(){
        localStorage.setItem('workouts',JSON.stringify(this.#workout))
    }
    _getlogalstorage(){
        const data=JSON.parse(localStorage.getItem('workouts'))

        if(!data)return

        this.#workout=data
        this.#workout.forEach(w=>this._renderAll(w))
    }
}
const app=new App()
