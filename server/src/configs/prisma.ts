import { PrismaPg  } from "@prisma/adapter-pg";
import { PrismaClient, Prisma } from "generated/prisma/client";
import { env } from './env';
import { Log } from "@/utils/log";

const adapter = new PrismaPg({ 
    connectionString: env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter })

type PrismaTx = Prisma.TransactionClient;


const connectPrisma = async () => {
    try {
        await prisma.$connect();
        Log.info("Prisma connected successfully");
    } catch (error) {
        Log.error("Prisma connection error:", error);
        process.exit(1);
    }
};

const disconnectPrisma = async () => {
    try {
        await prisma.$disconnect();
        Log.info('Prisma disconnected');
    } catch (error) {
        Log.error('Error disconnecting Prisma:', error);
    }
};

export { prisma, PrismaTx, connectPrisma, disconnectPrisma }