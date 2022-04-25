import { client } from "../database.js";

export async function list(){
    const terms = await client.term.findMany({
        select:{
            number: true,
            disciplines:{
                select:{
                    name: true
                }
            }  
        }
    })

    return terms;
}