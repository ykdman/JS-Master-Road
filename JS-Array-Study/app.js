const persons = [
  { name: 'peter1', age: 24 },
  { name: 'peter2', age: 12 },
];

const newPersons = persons.map((person) => {
  return { name: person.name, age: person.age };
});

persons[0].age = 13;

console.log(persons);
console.log(newPersons);
