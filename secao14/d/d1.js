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
const car1=new car('BMW',120)
const car2=new car('Mercedes',95)
car1.accelerate();
car1.accelerate();
car1.brake();
car1.accelerate();

car2.accelerate();
car2.accelerate();
car2.brake();
car2.accelerate();