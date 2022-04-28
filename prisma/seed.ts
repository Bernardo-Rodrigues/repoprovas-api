import { client } from "../src/database"

export default async function seed(){
    await client.term.upsert({
        where:{
            number: 1
        },
        update: {},
        create:{
            number: 1
        }
    })
}

seed()
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
    .finally( async () => {
        await client.$disconnect()
    })