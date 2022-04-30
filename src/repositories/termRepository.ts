import { client } from "../database.js";

export async function list(){
    const terms = await client.term.findMany()

    return terms;
}

export async function find(id: number){
    const term = await client.term.findUnique({
        where:{
            id
        }
    })

    return term;
}