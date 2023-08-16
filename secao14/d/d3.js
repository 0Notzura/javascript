'use strict'
const car=function(make,speed){
    this.make=make
    this.speed=speed

}
car.prototype.accelerate=function(){
    this.speed+=10
    console.log(this.speed +'km/h')

}
car.prototype.brake=function(){
    this.speed-=5
    console.log(this.speed + 'km/h')
}

const eletric=function(make,speed,ev){
    car.call(this,make,speed)
    this.ev=ev
}
eletric.prototype=Object.create(car.prototype)

eletric.prototype.chargeBattery=function(chargeTo){
    this.ev=chargeTo
}
eletric.prototype.accelerate=function(){
    this.speed+=20
    this.ev-=1
    console.log(`'${this.make} going at ${this.speed} km/h, with a charge of ${this.ev}%`)
}
const car1=new eletric('tesla',120,23)
car1.chargeBattery(90);
console.log(car1);
car1.brake();
car1.accelerate();