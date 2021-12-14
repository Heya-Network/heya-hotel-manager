import { BaseEntity, Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { UserProperty } from "./user-property.entity";

@Entity()
export class User extends BaseEntity<User, 'id'> {
    @PrimaryKey()
    id!: number;

    @Property({ nullable: true })
    polkadotSs58?: string;

    @Property({ nullable: true })
    metamaskHex?: string;

    @ManyToMany({ entity: 'UserProperty', fixedOrder: false })
    properties = new Collection<UserProperty>(this);

    constructor() {
        super();
    }
    
}
