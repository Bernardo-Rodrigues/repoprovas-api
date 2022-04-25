import { client } from "../database.js";

export async function list(){
    const categories = await client.category.findMany({
        select:{
            name: true,
            tests:{
                select:{
                    name: true,
                    teacherDiscipline:{
                        select:{
                            discipline:{
                                select:{
                                    name: true
                                }
                            },
                            teacher:{
                                select:{
                                    name:true
                                }
                            }
                        }
                    }
                },
                
            }
        }
    })

    return categories;
}