import { client } from "../database.js";

export async function list(search:string){
    const teachers = await client.teacher.findMany({
        where:{
            name: {
                startsWith:  search,
                mode: 'insensitive'
            }
        }
    })

    return teachers;
}

export async function find(teacherId: any){
    const test = await client.teacher.findUnique({
        where:{
            id: teacherId
        }
    })

    return test;
}