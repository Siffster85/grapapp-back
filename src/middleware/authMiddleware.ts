import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthenticationError } from "./errorMiddleware";


const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.cookies.jwt;
    
        if (!token) {
            throw new AuthenticationError("Token not found");
        }
    
        const jwtSecret = process.env.JWT_SECRET || "";
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    
        if (!decoded || !decoded.userId || !decoded.userEmail) {
            throw new AuthenticationError("User not found");
        }
    
        const { userId, userEmail, roles } = decoded;
    
        req.user = { _id: userId, email: userEmail, roles };
        next();
        } catch (e) {
        throw new AuthenticationError("Invalid token Please log in again");
        }
    };
    
    const authorize = (allowedRoles: string[]) => {
        return (req: Request, res: Response, next: NextFunction) => {
        const userRoles = req.user?.roles;
    
        if (
            !userRoles ||
            !userRoles.some((role: string) => allowedRoles.includes(role))
        ) {
            res.status(403).json({ message: "Access denied" });
        }
    
        next();
        };
    };

export { authenticate, authorize };