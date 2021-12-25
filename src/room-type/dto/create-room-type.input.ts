import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoomTypeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  propertyId: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  
}
