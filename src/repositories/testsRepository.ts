import { client } from "../database.js";

export async function listByDiscipline(){
    const tests = await client.term.findMany({
        select:{
            number: true,
            disciplines:{
                select:{
                    name: true,
                    teachersDisciplines:{
                        select:{
                            tests:{
                                select:{
                                    name: true,
                                    category:{
                                        select:{
                                            name: true
                                        }
                                    }
                                }
                            },
                            teacher:{
                                select:{
                                    name:true
                                }
                            }
                        }
                    }
                }
            },
        },
    })

    return tests;
}

export async function listByTeacher(){
    const tests = await client.teacher.findMany({
        select:{
            name: true,
            teachersDisciplines:{
                select:{
                    discipline:{
                        select: {
                            name: true
                        }
                    },
                    tests:{
                        select:{
                            name: true,
                            category:{
                                select:{
                                    name: true
                                }
                            }
                        }
                    }
                }     
            },
        },
    })

    return tests;
}