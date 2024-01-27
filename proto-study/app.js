class AgedPerson {
  constructor() {
    this.Aname = 'AgedPerson';
  }
  printAge() {
    console.log('AgedPerson!');
  }
}

class Person extends AgedPerson {
  constructor() {
    super();
    this.name = 'Person';
  }
  printPerson() {
    console.log('person');
  }
}

const p = new Person();
console.log();
