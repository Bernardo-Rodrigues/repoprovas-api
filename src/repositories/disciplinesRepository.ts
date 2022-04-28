import { client } from "../database.js";

export async function list(){
    const disciplines = await client.discipline.findMany()

    return disciplines;
}

export async function listByTerm(termId: number, search:string){
    const disciplines = await client.discipline.findMany({
        where:{
            termId,
            name: {
                startsWith:  search,
                mode: 'insensitive'
            }
        }
    })

    return disciplines;
}
