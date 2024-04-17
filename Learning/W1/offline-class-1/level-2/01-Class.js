
class Animal {
  constructor(name, legCount) {
    this.name = name
    this.legCount = legCount
  }
  describe() {
    return `${this.name} has ${this.legCount} legs`
  }
}

class Cars {
  constructor(namez, age){
    this.name = namez
    this.age = age
  }

show_detail(){
  return `${this.name} and age is ${this.age}`
}
}

const myCar = new Cars("Toyota", 3);

console.log(myCar.show_detail()); 
