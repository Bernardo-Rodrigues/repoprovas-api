import { User } from ".prisma/client";
import joi from "joi";

const userSchema = joi.object<Omit<User,'id'>>({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export default userSchema;