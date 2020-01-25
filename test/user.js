const chai = require("chai");
const expect = chai.expect;
const url = `http://localhost:4000`;
const request = require('supertest')(url);

describe("GraphQL: Testing", function () {
    describe("Mutation addNewUser", function () {
        it("should successfully create new user", function (done) {

            request
                .post('')
                .send({ query: '{ user(id: 10) { id name username email } }'})
                .end(function (err, res) {
                    //console.log("res.body => ", JSON.stringify(res.body, null, 3))
                    expect(err).to.be.null;
                    expect(res).to.have.status(204);
                    done()
                });
        });
        // it("should return error if phone number total digit less than 7 digits", function (done) {
        //     let phoneNumber = 123456;
        //     const secret = process.env.OTP_SECRET
      		// const token = authenticator.generate(secret)

        //     async 

        //     chai
        //     .request(app)
        //     .post("/user/otp")
        //     .send(pin)
        //     .end(function (err, res) {
        //         console.log("res.body => ", JSON.stringify(res.body, null, 3))
        //         expect(err).to.be.null;
        //         expect(res).to.have.status(204);
        //         done()
        //     });
        // });
        // it("should return error if phone numbers contains non digit character", function (done) {
        //     let phoneNumber = 123456;
        //     const secret = process.env.OTP_SECRET
      		// const token = authenticator.generate(secret)

        //     chai
        //     .request(app)
        //     .post("/user/otp")
        //     .send(pin)
        //     .end(function (err, res) {
        //         console.log("res.body => ", JSON.stringify(res.body, null, 3))
        //         expect(err).to.be.null;
        //         expect(res).to.have.status(204);
        //         done()
        //     });
        // });
        // it("should return error if phone number format isn't correct (start with other than 0 character", function (done) {
        //     let phoneNumber = 123456;
        //     const secret = process.env.OTP_SECRET
      		// const token = authenticator.generate(secret)

        //     chai
        //     .request(app)
        //     .post("/user/otp")
        //     .send(pin)
        //     .end(function (err, res) {
        //         console.log("res.body => ", JSON.stringify(res.body, null, 3))
        //         expect(err).to.be.null;
        //         expect(res).to.have.status(204);
        //         done()
        //     });
        // });
        // it("should return error if phone number format isn't correct (start with other than 0 character", function (done) {
        //     let phoneNumber = 123456;
        //     const secret = process.env.OTP_SECRET
      		// const token = authenticator.generate(secret)

        //     chai
        //     .request(app)
        //     .post("/user/otp")
        //     .send(pin)
        //     .end(function (err, res) {
        //         console.log("res.body => ", JSON.stringify(res.body, null, 3))
        //         expect(err).to.be.null;
        //         expect(res).to.have.status(204);
        //         done()
        //     });
        // });
    })
    // describe("POST /user/verify", function () {
    // 	it("should successfully verify with correct token", function (done) {

    // 	})
    // 	it("should return error with false token", function (done) {
    		
    // 	})
    // 	it("should return error with empty token", function (done) {
    		
    // 	})
    // })
    // describe("GET /user", function () {
    // 	it("should successfully verify with correct token", function (done) {

    // 	})
    // 	it("should return error with false token", function (done) {
    		
    // 	})
    // 	it("should return error with empty token", function (done) {
    		
    // 	})
    // })
});