import * as categoriesRepository from "../repositories/categoriesRepository.js"

export default class categoriesService{
    async getAll(){
        const categories = await categoriesRepository.list()

        return categories
    }   
}