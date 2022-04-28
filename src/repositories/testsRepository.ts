import { client } from "../database.js";

export async function listByDiscipline(disciplineId: number){
    const tests = await client.test.findMany({
        select:{
            id: true,
            name: true,
            pdfUrl: true,
            views: true,
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
        },
    })

    return tests;
}

export async function listByTeacher(teacherId: number){
    const tests = await client.test.findMany({
        select:{
            id: true,
            name: true,
            pdfUrl: true,
            views: true,
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

export async function updateViews(testId: number){
    const tests = await client.test.update({
        where:{
            id: testId
        },
        data: {
            views: {
                increment: 1
            }
        }
    })

    return tests;
}

export async function create(test: any){
    console.log(test)
    const tests = await client.test.create({
        data: test
    })

    return tests;
}