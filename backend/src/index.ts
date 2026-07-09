import * as express from "express";
import * as bodyParser from "body-parser";
import { Express, Request, Response, NextFunction } from "express";
import { AppDataSource } from "./data-source";
import { SubscriptionController } from "./controller/SubscriptionController";

const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");

const port = Number(process.env.PORT) || 3001;
const allowedOrigins = (
  process.env.CORS_ORIGIN ||
  process.env.FRONTEND_URL ||
  "http://localhost:3000"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const unsubscribeTokenRegex = /^[a-f0-9]{64}$/;

const normalizeEmail = (email: unknown) => {
  if (typeof email !== "string") {
    return null;
  }

  const normalizedEmail = email.trim().toLowerCase();
  return normalizedEmail || null;
};

const isValidId = (id: string) => {
  const parsedId = Number(id);
  return /^\d+$/.test(id) && Number.isSafeInteger(parsedId) && parsedId > 0;
};

AppDataSource.initialize()
  .then(async () => {
    const app: Express = express();
    const corsOptions = {
      origin: (origin, callback) => {
        callback(null, !origin || allowedOrigins.includes(origin));
      },
      methods: ["POST", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type"],
      optionsSuccessStatus: 204,
    };
    const subscriptionLimiter = rateLimit({
      windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
      max: Number(process.env.RATE_LIMIT_MAX) || 100,
      legacyHeaders: false,
      standardHeaders: true,
      message: { error: "Too many requests" },
    });

    app.use(helmet());
    app.use(cors(corsOptions));
    app.options("*", cors(corsOptions));
    app.use(bodyParser.json({ limit: "10kb" }));
    app.use("/subscription", subscriptionLimiter);

    app.post(
      "/subscription",
      async (req: Request, res: Response, next: NextFunction) => {
        const email = normalizeEmail(req.body && req.body.email);
        if (!email) {
          res.status(400).send({ error: "Missing email" });
        } else if (email.length > 200) {
          res.status(400).send({ error: "Email too long" });
        } else if (!emailRegex.test(email)) {
          res.status(400).send({ error: "Email has wrong format" });
        } else {
          try {
            const result = await SubscriptionController.save(email);
            if (result !== null && result !== undefined) {
              res.status(201).send(result);
            } else {
              res.status(409).send({ error: "Email is already subscribed" });
            }
          } catch (error) {
            next(error);
          }
        }
      }
    );

    app.delete(
      "/subscription/:id",
      async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const token = req.query.token;

        if (typeof id !== "string" || !id) {
          res.status(400).send({ error: "Missing id" });
        } else if (!isValidId(id)) {
          res.status(400).send({ error: "Invalid id" });
        } else if (
          typeof token !== "string" ||
          !unsubscribeTokenRegex.test(token)
        ) {
          res.status(400).send({ error: "Invalid unsubscribe token" });
        } else {
          try {
            const result = await SubscriptionController.remove(
              Number(id),
              token
            );
            if (result !== null && result !== undefined) {
              res.send(result);
            } else {
              res.status(404).send({ error: "Subscription not found" });
            }
          } catch (error) {
            next(error);
          }
        }
      }
    );

    app.use(
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
      }
    );

    app.listen(port);
  })
  .catch((error) => console.log(error));
