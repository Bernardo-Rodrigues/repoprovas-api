import { client } from "../database.js";

export async function listByTerm(termId: number, search:string){
    const tests = await client.discipline.findMany({
        where:{
            termId,
            name: {
                startsWith:  search,
                mode: 'insensitive'
            }
        }
    })

    return tests;
}
