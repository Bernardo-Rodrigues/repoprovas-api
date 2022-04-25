import { client } from "../database.js";

export async function list(){
    const tests = await client.test.findMany({
        select:{
            name: true,
            category:{
                select:{
                    name: true
                }
            },
            teacherDiscipline:{
                select:{
                    teacher:{
                        select:{
                            name: true
                        }
                    },
                    discipline:{
                        select:{
                            name: true
                        }
                    }
                }
            }
        }
    })

    return tests;
}