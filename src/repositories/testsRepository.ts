import { client } from "../database.js";

export async function listByDiscipline(disciplineId: number){
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
                    }
                }
            }
        },
        where:{
            teacherDiscipline:{
                disciplineId
            }
        }
    })

    return tests;
}

export async function listByTeacher(teacherId: number){
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
                    discipline:{
                        select:{
                            name: true
                        }
                    }
                }
            }
        },
        where:{
            teacherDiscipline:{
                teacherId
            }
        }
    })

    return tests;
}