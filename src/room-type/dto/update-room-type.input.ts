// import { CreateRoomTypeInput } from './create-room-type.input';
// import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

// @InputType()
// export class UpdateRoomTypeInput extends PartialType(CreateRoomTypeInput) {
//   @Field(() => Int)
//   id: number;
// }

import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomTypeInput } from './create-room-type.input';

export class UpdateRoomTypeInput extends PartialType(CreateRoomTypeInput) {
  id: number;
}
