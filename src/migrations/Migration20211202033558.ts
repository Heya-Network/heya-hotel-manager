import { Migration } from '@mikro-orm/migrations';

export class Migration20211202033558 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "hotel" ("id" varchar(255) not null, "name" varchar(255) null, "status" varchar(255) not null);');
    this.addSql('alter table "hotel" add constraint "hotel_pkey" primary key ("id");');
  }

}
