import { Entity, ManyToOne, PrimaryKeyType } from "@mikro-orm/core";
import { Hotel } from "../../hotels/entities/hotel.entity";
import { Users } from "./user.entity";

@Entity()
export class UserProperty {

  @ManyToOne({ primary: true })
  User: Users;

  @ManyToOne({ primary: true })
  Hotel: Hotel;

  // inverse side has to point to the owning side via `mappedBy` attribute/parameter
  // @ManyToMany(() => User, user => user.properties)
  // properties = new Collection<User>(this);

  [PrimaryKeyType]: [number, number];

  constructor(user: Users, hotel: Hotel) {
    this.User = user;
    this.Hotel = hotel;
  }

}