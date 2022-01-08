import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K> {
  //<T> gives us a generic class

  regions: {[key:string]: Element} = {};
  // Some number of keys

  constructor(public parent: Element, public model: T){
    this.bindModel();
   }

   abstract template(): string;
   //abstract to say eventually you will have access to these type of values
   
   regionsMap(): {[key:string]: string} {
     return {};
   }

   eventsMap(): {[key:string]: () => void} {
     return {};
   }


   bindModel(): void {
     this.model.on('change', () => {
       this.render();
     })
   }

   bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for(let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      })
    }
  }

  mapRegions(fragment:DocumentFragment): void{
    const regionsMap = this.regionsMap();

    for(let key in regionsMap){
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if(element){
        this.regions[key] = element;
      } else {
        throw new Error('No element')
      }
    }
  }

  onRender(): void {
    
  }

  render(): void {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    //Document Fragment reference to what is going to be added on
    
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  }
}