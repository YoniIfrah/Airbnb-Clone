import { User } from "@prisma/client";

//takes the left side and replace it with the object on the left side the & operator
export type SafeUser = Omit<
 User, "createdAt" | "updatedAt" | "emailVerified"> 
 & {createdAt:string, updatedAt:string, emailVerified: string|null}