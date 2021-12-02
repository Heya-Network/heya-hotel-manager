import { BaseEntity } from "@mikro-orm/core";
import { Entity, PrimaryKey, Property } from "@mikro-orm/core/decorators";

@Entity()
export class Hotel extends BaseEntity<Hotel, 'id'> {

    @PrimaryKey()
    id!: string;
    
    @Property({ nullable: true })
    name?: string;

    @Property()
    status!: string;

    constructor(ss58: string) {
        super();
        this.id = ss58;
        this.status = "PENDING";
    }
}