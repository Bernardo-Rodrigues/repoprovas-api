import { client } from "../database.js";

export async function list(){
    const terms = await client.term.findMany()

    return terms;
}