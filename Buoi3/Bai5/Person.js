class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Xin chào, tớ là ${this.name}, ${this.age} tuổi.`);
  }
}

const user1 = new Person('An', 22);
user1.sayHello();