import { Request } from "express";
import { User } from "generated/prisma/client";

declare module "express-serve-static-core" {
    interface Request {
      localsQuery?: any;
      user: User | null;
    }
}
