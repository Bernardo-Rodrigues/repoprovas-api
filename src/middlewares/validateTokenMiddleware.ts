import jwt from 'jsonwebtoken';
import config from '../config.js';
import * as sessionRepository from "../repositories/sessionRepository.js";
import { NextFunction, Request, Response } from 'express';
import { Unauthorized } from '../errors/index.js';

export default async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const secretKey = config.secretJWT;
  if(!token) throw new Unauthorized("Token is invalid");
  
  const session = await sessionRepository.findByToken(token);
  if(!session) throw new Unauthorized("Token is invalid");

  try {
    const { userId } = jwt.verify(token, secretKey) as { userId: number };
    res.locals.user = { userId };
  } catch (error) {
    await sessionRepository.remove(session.id);
    throw new Unauthorized("Token expired, please log in again");
  }
      
    next();
}