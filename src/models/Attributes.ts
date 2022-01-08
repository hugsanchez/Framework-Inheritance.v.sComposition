import { UserProps } from "./User";

export class Attributes <T> {
    constructor(private data: T) {}
    //type union return either a string or a number
    get = <K extends keyof T>(key: K): T[K] => {
      //extends sets up the constraints K can only be one of the types of T
      return this.data[key];
      // because of arrow function 'this' now always equals instance of attributes
    }
  
    set(update: T): void {
      Object.assign(this.data, update);
    }

    getAll(): T{
      return this.data;
    }
}  

/* Testing generic constraints */

const attrs = new Attributes<UserProps>({
  id:5,
  age:69,
  name:'correct'
});

const name = attrs.get('name');
const age = attrs.get('age');
const id = attrs.get('id');
//UserProps is what holds the object type thing where we use the T[K]
// value to get the specific type per the specific key

/* Example of creating a types */

// type BestName = 'Hugo';

// const printName = (name: BestName): void => {};

//printName('Fer'); would not work cause it only accepts the specific type
// of string that is the name 'Hugo'

//printName('Hugo') would WORK cause it matches the specific type we put in place