import { Request, Response } from 'express'

export function HelloWorld(req: Request, res: Response) {
  return res.json({ msg: 'Move route into file of routes and add types' });
};