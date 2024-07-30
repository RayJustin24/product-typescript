import 'express';

declare global {
  namespace Express {
    interface Request {
      userData?: {
        id: string;
      };
    }
  }
}
