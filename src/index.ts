import { UserList } from "./views/UserList";
import { Collection } from "./models/Collection";
import { User, UserProps } from "./models/User";

const users = new Collection('http://localhost:3000/users', (parsedData:UserProps) => {
  return User.buildUser(parsedData);
});

users.on('change', () => {
  const root = document.getElementById('root');

  if(root) {
    new UserList(root, users).render();
  }
})

users.fetch();

// user.on('change', () => {
//   console.log(user)
// })
//Getting back a reference to the "on" method thats on the eventing class



/* Reminder on how 'this' works in JavaScript */
// const colors = {
//   color: 'red',
//   printColor() {
//     console.log(this.color);
//     //          colors.color
//   }
// }
// colors.printColor();
//    <-
//rule of thumb is that 'this' is going to be equal to whatever is to
//the left of the function call





// A quick reminder on Accesors

// class Person {
//   constructor(public firstName: string, public lastName: string) {}

//   get fullName(): string {
//     //get keyword sets up accessor invokes function for us
//     return `${this.firstName} ${this.lastName}`
//   }
// }

// const person = new Person('yo', 'dawg');
// console.log(person.fullName) //no function call here 