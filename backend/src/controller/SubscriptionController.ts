import { NextFunction, Request, Response } from "express";
import { Subscription } from "../entity/Subscription";
import { AppDataSource } from "../data-source";

export class SubscriptionController {
  private static subscriptionRepository =
    AppDataSource.getRepository(Subscription);

  static async save(request: Request, response: Response, next: NextFunction) {
    return this.subscriptionRepository.save(request.body);
  }

  static async remove(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    let subscriptionToRemove = await this.subscriptionRepository.findOneBy({
      id: Number(request.params.id),
    });
    if (subscriptionToRemove) {
      return this.subscriptionRepository.remove(subscriptionToRemove);
    }
    return null;
  }
}
