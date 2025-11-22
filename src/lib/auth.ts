import {checkout, polar, portal} from "@polar-sh/better-auth"
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import  prisma  from "@/lib/db";
import { polarClient } from "./polar";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL!, // for mobile oAuth bug fixing
    database: prismaAdapter(prisma,{
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    
    //for github auth
    socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        },
        //for google auth
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },
    },

    
    
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                    {
                        productId: "1f1928f0-adb1-4036-b854-70e2d5ed437a",
                        slug: "pro",
                 }
                ],
                successUrl: process.env.POLAR_SUCCESS_URL,
                authenticatedUsersOnly: true,
              }),
              portal(),
            ]
        })
    ]
});
