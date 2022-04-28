import { client } from "../database.js";

export async function list(){
    const categories = await client.category.findMany()

    return categories;
}

export async function find(categoryName: string){
    const categories = await client.category.findUnique({
        where:{
            name: categoryName
        }
    })

    return categories;
}