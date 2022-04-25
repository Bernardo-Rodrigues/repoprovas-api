import jwt from 'jsonwebtoken';
import config from '../config.js';
import { NextFunction, Request, Response } from 'express';
import { Unauthorized } from '../errors/index.js';
import sessionService from '../services/sessionService.js';

const service = new sessionService()

export default async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if(!token) throw new Unauthorized("Token is invalid");
  
  const session = await service.findByToken(token);
  if(!session) throw new Unauthorized("Token is invalid");

  try {
    const secretKey = config.secretJWT;
    const { userId } = jwt.verify(token, secretKey) as { userId: number };
    res.locals.user = { userId };
  } catch (error) {
    await service.remove(session.id);
    throw new Unauthorized("Token expired, please log in again");
  }
      
    next();
}