import { BaseEntity } from "@mikro-orm/core";
import { Entity, PrimaryKey, Property } from "@mikro-orm/core/decorators";
import { CreateHotelDto } from "../dto/create-hotel.dto";

@Entity()
export class Hotel extends BaseEntity<Hotel, 'id'> {

    @PrimaryKey()
    id!: number;
    
    @Property({ unique: true })
    name!: string;

    @Property()
    status!: string;

    constructor(dto: CreateHotelDto) {
        super();
        this.name = dto.name;
        this.status = "PENDING";
    }
}