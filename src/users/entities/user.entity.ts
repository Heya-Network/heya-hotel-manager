import { BaseEntity, Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserProperty } from "./user-property.entity";

/**
 * table is named 'users' because it conflicts with postgres' reserved user table
 */
@Entity()
export class Users extends BaseEntity<Users, 'id'> {
    @PrimaryKey()
    id!: number;

    @Property({ nullable: true })
    polkadotSs58?: string;

    @Property({ nullable: true })
    metamaskHex?: string;

    @Property()
    password: string;

    @Property({ unique: true })
    email: string;

    @ManyToMany({ entity: 'UserProperty', fixedOrder: false })
    properties = new Collection<UserProperty>(this);

    constructor(dto: CreateUserDto) {
        super();
        this.polkadotSs58 = dto.polkadotSs58;
        this.metamaskHex = dto.metamaskHex;
        this.email = dto.email;
    }
    
}
