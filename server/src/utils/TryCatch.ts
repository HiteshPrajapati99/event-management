import { NextFunction, Request, Response } from "express";

interface Req extends Request {
  user: number;
}

type HandleType = (req: Req, res: Response, next?: NextFunction) => void;

export const TryCatch =
  (func: HandleType) => (req: Req, res: Response, next?: NextFunction) => {
    try {
      const result = func(req, res, next);
      // Check if the result is a promise, if so, handle errors
      // @ts-ignore
      if (result instanceof Promise) {
        return result.catch((error: Error) =>
          res.json({ s: 0, m: "Server Error." + error })
        );
      }
      return result;
    } catch (error) {
      return res.json({ s: 0, m: "Server Error." });
    }
  };
