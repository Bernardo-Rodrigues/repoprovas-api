import joi from "joi";

const testSchema = joi.object({
    pdf: joi.object().required(),
    category: joi.string().required(),
    teacher: joi.string().required(),
    discipline: joi.string().required(),
    name: joi.string().required()
});

export default testSchema;