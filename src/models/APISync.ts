import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

export class APISync<T extends HasId> {
  //added generic constraint with interface so that we say it will have id
  //dont worry that its not there just yet

  constructor(public rootUrl: string){}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`)
  }

  save(data: T): AxiosPromise {
    const {id} = data;

    if(id){
      return axios.put(`${this.rootUrl}/${id}`,data)
    } else {
      return axios.post(this.rootUrl, data)
    }
  }
}