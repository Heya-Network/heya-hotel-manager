import { Migration } from '@mikro-orm/migrations';

export class Migration20211216113649 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "roles" text[] not null default \'{unverified}\';');

    this.addSql('drop index "users_properties_user_property_user_id_user_property_hotel_id_i";');

    this.addSql('create index "users_properties_user_property_user_id_user_property_hotel_id_index" on "users_properties" ("user_property_user_id", "user_property_hotel_id");');
  }

}
