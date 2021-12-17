import { Migration } from '@mikro-orm/migrations';

export class Migration20211217083244 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "hotel" add constraint "hotel_name_unique" unique ("name");');

    this.addSql('drop index "users_properties_user_property_user_id_user_property_hotel_id_i";');

    this.addSql('create index "users_properties_user_property_user_id_user_property_hotel_id_index" on "users_properties" ("user_property_user_id", "user_property_hotel_id");');
  }

}
