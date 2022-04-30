import jwt from 'jsonwebtoken';
import config from '../config.js';
import { NextFunction, Request, Response } from 'express';
import { unauthorized } from '../errors/index.js';

export default async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if(!token) throw unauthorized("Token is invalid");

  try {
    const secretKey = config.secretJWT;
    const { userId } = jwt.verify(token, secretKey) as { userId: number };
    res.locals.user = { userId };
  } catch (error) {
    throw unauthorized("Token expired, please log in again");
  }
      
    next();
}