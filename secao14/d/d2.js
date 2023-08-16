class car{
    constructor(make,speed){
        this.make=make
        this.speed=speed
    }
    set speedUS(s){
        this.speed=s*1.6
    }
    get speedUS(){
        return this.speed/1.6
    }
    accelerate=function(){
        this.speed+=10
        console.log(this.speed +'km/h')
    
    }
    brake=function(){
        this.speed-=5
        console.log(this.speed + 'km/h')
    }
}
const ford = new car('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUS = 50;
console.log(ford);
