import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction): Response | void {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
        if (typeof decoded !== 'string' && 'userId' in decoded) {
            req.body.userId = decoded.userId;
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
