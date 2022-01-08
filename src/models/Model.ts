import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T>{
  set(value:T):void;
  getAll(): T;

  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T>{
  fetch(id:number): AxiosPromise;
  save(data: T): AxiosPromise;
}

type Callback = () => void;

interface Events {
  on(eventName: string, callback: Callback):void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ){}
    //Implementing pass-through methods
  //Composoition type approach the get and other reference methods
  // get on() {
  //   return this.events.on;
  // }

  //shorter syntax for above
  on = this.events.on;
  //this format only works with the format described in constructor
  //otherwise it might be created beforehand and we would be referencing undefined
  //assignment of User.ts also triggers it early on

  //** use in some scenerios */

  // get trigger() {
  //   return this.events.trigger;
  // }
  trigger = this.events.trigger;

  // get get() {
  //   return this.attributes.get;
  // }
  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);

    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');

    if(typeof id !== 'number'){
      throw Error('Cannot fetch without an id')
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    })
  }

  save(): void {
    this.sync.save(this.attributes.getAll()).then((response:AxiosResponse):void => {
        this.trigger('save');
    }).catch(() => {
      this.trigger('error');
    })
  }
}