import {expect} from "chai"
import pkg from "pactum";
const {spec} = pkg;
import 'dotenv/config';
import { isbn, baseUrl, password, userId, userName } from "../helpers/data.js";

describe("Api tests", () => {
    it.skip("get request", async () => {
        const response = await spec().get(`${baseUrl}/BookStore/v1/Books`)
        .inspect()
        const responseB = JSON.stringify(response.body);
        expect(response.statusCode).to.eql(200);
        expect(responseB).to.include("Learning JavaScript Design Patterns");
        expect(responseB).to.include("Eloquent JavaScript, Second Edition");

    })
    
let token_response;

    it.skip("Create a user", async () => {
        const response = await spec()
        .post("https://demoqa.com/Account/v1/User")
        .withBody({
            userName: userName,
            password: password,
        })
        .inspect();
        expect(response.statusCode).to.eql(201)
    })

    it("Generation token", async () => {
        const response = await spec()
        .post(`${baseUrl}/Account/v1/GenerateToken`)
        .withBody ({
            userName: userName,
            password: password,
        })
            .inspect()
            token_response = response.body.token;
            console.log(token_response);
            expect(response.statusCode).to.eql(200);
            expect(response.body.result).to.eql("User authorized successfully.");
        })

     it("Add a book", async () => {
            const response = await spec()
            .post(`${baseUrl}/BookStore/v1/Books`)
            .withBearerToken(token_response)
            .withBody({
                userId: userId,
                    collectionOfIsbns: [
                        {
                            isbn: isbn  
                    }
                ]
            })
            .inspect()
            expect(response.statusCode).to.eql(201);
        })
});