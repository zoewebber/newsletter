import { MigrationInterface, QueryRunner } from "typeorm";

export class HardenSubscription1720520000000 implements MigrationInterface {
  name = "HardenSubscription1720520000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "subscription" (
        "id" SERIAL NOT NULL,
        "email" character varying(200) NOT NULL,
        "unsubscribe_token" character varying(64),
        CONSTRAINT "PK_subscription_id" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "subscription"
      ALTER COLUMN "email" TYPE character varying(200)
    `);
    await queryRunner.query(`
      ALTER TABLE "subscription"
      ADD COLUMN IF NOT EXISTS "unsubscribe_token" character varying(64)
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "IDX_subscription_email_unique"
      ON "subscription" ("email")
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "IDX_subscription_unsubscribe_token_unique"
      ON "subscription" ("unsubscribe_token")
      WHERE "unsubscribe_token" IS NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_subscription_unsubscribe_token_unique"
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_subscription_email_unique"
    `);
    await queryRunner.query(`
      ALTER TABLE "subscription"
      DROP COLUMN IF EXISTS "unsubscribe_token"
    `);
  }
}
