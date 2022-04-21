import { Session } from ".prisma/client";
import { client } from "../database.js";

export type UserTokenData = Omit<Session, 'id'>

export async function create(userToken: UserTokenData){
    await client.session.create({
        data: userToken
    })
}

export async function findByUserId(userId:  number ){
    const session = await client.session.findFirst({
        where: {
            userId
        }
    })

    return session
}

export async function remove(id: number){
    await client.session.delete({
        where: {
            id
        }
    })
}