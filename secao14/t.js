// Definindo a função construtora Animal
function Animal(name, sound) {
    this.name = name;
    this.sound = sound;
  }
  
  // Adicionando um método ao protótipo de Animal
  Animal.prototype.makeSound = function() {
    console.log(this.sound);
  };
  
  // Definindo a função construtora Cat, que herda de Animal
  function Cat(name, sound, breed) {
    Animal.call(this, name, sound); // chama o construtor de Animal
    this.breed = breed;
  }
  
  // Fazendo a herança de Animal para Cat
  Cat.prototype = Object.create(Animal.prototype);
  Cat.prototype.constructor = Cat;
  
  // Adicionando um método ao protótipo de Cat
  Cat.prototype.meow = function() {
    console.log("Meow!");
  };
  
  // Criando uma instância de Cat
  const myCat = new Cat("Whiskers", "Purr", "Siamese");
  
  // Chamando os métodos
  myCat.makeSound(); // Output: Purr
  myCat.meow();