import { User } from ".prisma/client";
import { client } from "../database.js";

export type UserInsertData = Omit<User, 'id'>

export async function create(user: UserInsertData){
    await client.user.create({
        data: user
    })
}

export async function findByEmail(email:  string ){
    const user = await client.user.findUnique({
        where: {
            email
        }
    })

    return user
}