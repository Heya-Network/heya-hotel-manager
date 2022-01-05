// import { InputType, Int, Field } from '@nestjs/graphql';

// @InputType()
// export class CreateRoomTypeInput {
//   @Field(() => Int, { description: 'Example field (placeholder)' })
//   propertyId: number;

//   @Field(() => String, { description: 'Example field (placeholder)' })
//   name: string;
// }
export class CreateRoomTypeInput {
  /**
   * The user ID of the owner of the hotel
   */
  propertyId: number;
  name: string;
}
