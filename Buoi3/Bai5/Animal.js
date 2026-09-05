class Animal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    console.log(`${this.name} đang phát ra tiếng kêu...`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  bark() {
    console.log(`${this.name} (${this.breed}) sủi: Gâu gâu!`);
  }
}

const myDog = new Dog('Gâu Đần', 'Golden');
myDog.makeSound();
myDog.bark();