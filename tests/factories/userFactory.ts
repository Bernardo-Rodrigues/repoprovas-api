import { faker } from "@faker-js/faker"
import Cryptr from "cryptr"
import config from "../../src/config";
import { client } from "../../src/database";
import { UserInsertData } from "../../src/repositories/userRepository";

const cryptr = new Cryptr(config.secretCryptr)

export async function insertUser (user: UserInsertData) {
  await client.user.create({
		data: {
			email: user.email,
			password: cryptr.encrypt(user.password)
		}
	});
} 

export async function createUser () {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
} 