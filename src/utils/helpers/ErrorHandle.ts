import { Request, Response } from 'express';

export default class ErrorHandle {
  /**
   * Wrap async function for pass error to next middleware (global error middleware)
   *
   * @param fn The async function to wrap
   */
  public static catchAsync(fn: Function) {
    return (req: Request, res: Response, next: Function) => {
      fn(req, res, next).catch(next);
    };
  }
}
