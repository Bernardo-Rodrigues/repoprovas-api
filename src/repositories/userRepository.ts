import { User } from ".prisma/client";
import { client } from "../database.js";

export type UserInsertData = Partial<Omit<User, 'id'>>

export async function create(user: any){
    await client.user.create({
        data: user
    })
}

export async function update(user: any){
    await client.user.update({
        where:{
            id: user.id
        },
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