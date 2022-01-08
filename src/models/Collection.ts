import axios, { AxiosResponse } from "axios";

import { User, UserProps } from "./User";
import { Eventing } from "./Eventing";

export class Collection<T, K> {
  //Type to be used for T and type to be used for K
  //this type of initialization of properties wont work with short syntax
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deseralize:(parsedData:K) => T){}

  get on() {
    return this.events.on;
  }

  get trigger(){
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response:AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deseralize(value));
      });

      this.trigger('change');
    });
  }
}