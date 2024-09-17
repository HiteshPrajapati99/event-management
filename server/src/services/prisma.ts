import {PrismaClient } from "@prisma/client"


export const db = new PrismaClient();

export const checkDBConnection = async () => {
    try {
        await db.$connect()

        console.log("Database connected");
        
    } catch (error) {
        console.log("Database not connected => " + error);
    }

}