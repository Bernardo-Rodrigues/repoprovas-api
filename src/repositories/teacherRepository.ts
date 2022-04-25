import { client } from "../database.js";

export async function list(){
    const teachers = await client.teacher.findMany({
        select:{
            name: true
        }
    })

    return teachers;
}