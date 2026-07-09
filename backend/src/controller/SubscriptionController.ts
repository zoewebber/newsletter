import * as crypto from "crypto";
import { Subscription } from "../entity/Subscription";
import { AppDataSource } from "../data-source";

export class SubscriptionController {
  private static subscriptionRepository =
    AppDataSource.getRepository(Subscription);

  static async save(email: string) {
    const existingSubscription = await this.subscriptionRepository.findOneBy({
      email,
    });

    if (existingSubscription) {
      return null;
    }

    const subscription = this.subscriptionRepository.create({
      email,
      unsubscribeToken: crypto.randomBytes(32).toString("hex"),
    });

    try {
      return await this.subscriptionRepository.save(subscription);
    } catch (error) {
      if (error && error["code"] === "23505") {
        return null;
      }

      throw error;
    }
  }

  static async remove(id: number, unsubscribeToken: string) {
    const subscriptionToRemove = await this.subscriptionRepository.findOneBy({
      id,
      unsubscribeToken,
    });
    if (subscriptionToRemove) {
      return this.subscriptionRepository.remove(subscriptionToRemove);
    }
    return null;
  }
}
