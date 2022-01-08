import { Model } from "./Model"
import { Attributes } from "./Attributes";
import { APISync } from "./APISync";
import { Eventing } from "./Eventing";
import { Collection } from "./Collection";

export interface UserProps {
  //optional with question mark the property dont require both
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users'

export class User extends Model<UserProps>{
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new APISync<UserProps>(rootUrl)
    )
  }
  //can add on methods to customize the user
  // isAdminUser(): boolean {
  //   return this.get('id') === 1;
  // }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (parsedData: UserProps) => User.buildUser(parsedData));
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({age});
  }
}