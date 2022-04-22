import { client } from "../database.js";

export async function list(){
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

