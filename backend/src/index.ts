import * as express from "express";
import * as bodyParser from "body-parser";
import { Express, Request, Response, NextFunction } from "express";
import { AppDataSource } from "./data-source";
import { SubscriptionController } from "./controller/SubscriptionController";

const port = 3001;

AppDataSource.initialize()
  .then(async () => {
    const app: Express = express();
    app.use(bodyParser.json());

    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header("Access-Control-Allow-Methods", "POST, DELETE");
      next();
    });

    app.post(
      "/subscription",
      (req: Request, res: Response, next: NextFunction) => {
        const subscriptionData = req.body;
        if (!subscriptionData.email) {
          res.status(400).send({ error: "Missing email" });
        } else if (subscriptionData.email.length > 200) {
          res.status(400).send({ error: "Email too long" });
        } else if (
          !subscriptionData.email.match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ) {
          res.status(400).send({ error: "Email has wrong format" });
        } else {
          SubscriptionController.save(req, res, next).then((result) => {
            if (result !== null && result !== undefined) {
              res.send(result);
            } else {
              res.status(400).send({ error: "Something went wrong" });
            }
          });
        }
      }
    );

    app.delete(
      "/subscription/:id",
      (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        if (typeof id !== "string" || !id) {
          res.status(400).send({ error: "Missing id" });
        } else if (isNaN(Number(id))) {
          res.status(400).send({ error: "Invalid id" });
        } else {
          SubscriptionController.remove(req, res, next).then((result) => {
            if (result !== null && result !== undefined) {
              res.send(result);
            } else {
              res.status(400).send({ error: "Already unsubscribed" });
            }
          });
        }
      }
    );

    app.listen(port);
  })
  .catch((error) => console.log(error));
