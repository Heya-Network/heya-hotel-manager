// import { BaseEntity, Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
// import { ObjectType, Field, Int } from '@nestjs/graphql';
// import { Hotel } from '../../hotels/entities/hotel.entity';

// @ObjectType()
// @Entity()
// export class RoomType extends BaseEntity<RoomType, "id">{
//   @PrimaryKey()
//   @Field(() => Int, { description: 'Primary key ID' })
//   id: number;

//   @Property({ nullable: false })
//   @Field(() => String, { description: "Room Type's Name" })
//   name: string;

//   @ManyToOne()
//   @Field(() => Number, { description: "ID of property that Room Type's belongs to" })
//   property!: Hotel;
// }

import { BaseEntity } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core/decorators';
import { CreateRoomTypeInput } from '../dto/create-room-type.input';
import { Hotel } from '../../hotels/entities/hotel.entity';

@Entity()
export class RoomType extends BaseEntity<RoomType, 'id'> {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: false })
  name!: string;

  @Property()
  property!: Hotel;

  constructor(dto: CreateRoomTypeInput) {
    super();
    this.name = dto.name;
  }
}
