import { BaseEntity, Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Hotel } from '../../hotels/entities/hotel.entity';

@ObjectType()
@Entity()
export class RoomType extends BaseEntity<RoomType, "id">{
  @PrimaryKey()
  @Field(() => Int, { description: 'Primary key ID' })
  id: number;

  @Property({ nullable: false })
  @Field(() => String, { description: "Room Type's Name" })
  name: string;

  @ManyToOne() 
  @Field(() => Number, { description: "ID of property that Room Type's belongs to" })
  property!: Hotel;
}
