import joi from "joi";

const testSchema = joi.object({
    pdfUrl: joi.string().uri().required(),
    category: joi.string().required(),
    teacher: joi.string().required(),
    discipline: joi.string().required(),
    name: joi.string().required()
});

export default testSchema;