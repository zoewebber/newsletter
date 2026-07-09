import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Index("IDX_subscription_email_unique", ["email"], { unique: true })
@Index("IDX_subscription_unsubscribe_token_unique", ["unsubscribeToken"], {
  unique: true,
  where: "\"unsubscribe_token\" IS NOT NULL",
})
@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  email: string;

  @Column({ name: "unsubscribe_token", length: 64, nullable: true })
  unsubscribeToken: string | null;
}
