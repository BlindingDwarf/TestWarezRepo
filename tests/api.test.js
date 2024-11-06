import {expect} from "chai"
import pkg from "pactum";
const {spec} = pkg;
import 'dotenv/config';
import { baseUrl, userId } from "../helpers/data.js";

describe("Api tests", () => {
    it("get request", async () => {
        const response = await spec().get(`${baseUrl}/BookStore/v1/Books`)
        .inspect()
        const responseB = JSON.stringify(response.body);
        expect(response.statusCode).to.eql(200);
        expect(responseB).to.include("Learning JavaScript Design Patterns");
        expect(responseB).to.include("Eloquent JavaScript, Second Edition");

    })
    
    it.skip("Create a user", async () => {
        const response = await spec()
        .post("https://demoqa.com/Account/v1/User")
        .withBody({
            userName: "Mihca",
            password: process.env.SECRET_PASSWORD,
        })
        .inspect();
        expect(response.statusCode).to.eql(201)
    })
})