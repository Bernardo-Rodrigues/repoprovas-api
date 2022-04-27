import { faker } from "@faker-js/faker"
import Cryptr from "cryptr"
import config from "../../src/config";
import { client } from "../../src/database";

const cryptr = new Cryptr(config.secretCryptr)

export async function createdUser () {
  const user = {
    email: faker.internet.email(),
    password: "123456",
    encryptedPassword: cryptr.encrypt("123456")
  };

  await client.user.create({
		data: {
			email: user.email,
			password: cryptr.encrypt("123456")
		}
	});

  return user;
} 

export async function user () {
  const user = {
    email: faker.internet.email(),
    password: "123456"
  }

  return user;
} 