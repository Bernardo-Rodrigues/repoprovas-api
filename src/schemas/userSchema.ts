import joi from "joi";
import { UserInsertData } from "../repositories/userRepository";

const userSchema = joi.object<UserInsertData>({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export default userSchema;