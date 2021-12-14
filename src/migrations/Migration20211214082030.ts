import { Migration } from '@mikro-orm/migrations';

export class Migration20211214082030 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "hotel" ("id" serial primary key, "name" varchar(255) not null, "status" varchar(255) not null);');

    this.addSql('create table "user" ("id" serial primary key, "polkadot_ss58" varchar(255) null, "metamask_hex" varchar(255) null);');

    this.addSql('create table "user_property" ("user_id" int4 not null, "hotel_id" int4 not null);');
    this.addSql('alter table "user_property" add constraint "user_property_pkey" primary key ("user_id", "hotel_id");');

    this.addSql('create table "user_properties" ("user_id" int4 not null, "user_property_user_id" int4 not null, "user_property_hotel_id" int4 not null);');
    this.addSql('alter table "user_properties" add constraint "user_properties_pkey" primary key ("user_id", "user_property_user_id", "user_property_hotel_id");');

    this.addSql('alter table "user_property" add constraint "user_property_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "user_property" add constraint "user_property_hotel_id_foreign" foreign key ("hotel_id") references "hotel" ("id") on update cascade;');

    this.addSql('alter table "user_properties" add constraint "user_properties_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_properties" add constraint "user_properties_user_property_user_id_user_property_hotel_id_foreign" foreign key ("user_property_user_id", "user_property_hotel_id") references "user_property" ("user_id", "hotel_id") on update cascade on delete cascade;');

    this.addSql('create index "user_properties_user_property_user_id_user_property_hotel_id_index" on "user_properties" ("user_property_user_id", "user_property_hotel_id");');
  }

}
