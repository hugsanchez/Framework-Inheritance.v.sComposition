import {User, UserProps} from '../models/User'
import { View } from './View';

export class UserForm extends View<User, UserProps> {
  //abstract class extends

  eventsMap(): {[key:string]: () => void} {
    return {
      'click:.set-age' : this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    };
  }

  onSetAgeClick = (): void => {
    //Bind the value of this inside the function by using the arrow function
    //the value of this in here should refer to view class of UserForm
    this.model.setRandomAge();
  }

  onSetNameClick = ():void => {
    const input = this.parent.querySelector('input');

    if(input){
      const name = input.value;
      this.model.set({name});
    } else {
      throw new Error('Error with input')
    }
  
  }

  onSaveClick = ():void => {
    this.model.save();
  }

  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get('name')}"/>
        <button class='set-name'>Change Name</button>
        <button class='set-age'>Set Random Age</button>
        <button class='save-model'>Save User</button>
      </div>
    `;
  }

 
}