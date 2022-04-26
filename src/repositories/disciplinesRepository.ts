import { client } from "../database.js";

export async function listByTerm(termId: number){
    const tests = await client.discipline.findMany({
        where:{
            termId 
        }
    })

    return tests;
}
