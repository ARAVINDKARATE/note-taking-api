const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const Note = require("../models/noteModel");
chai.should();
chai.use(chaiHttp);

describe("Notes API", () => {
  // Test Create Note
  it("It should create a new note", (done) => {
    const note = {
      title: "Test Note",
      body: "This is a test note",
    };
    chai
      .request(server)
      .post("/api/notes")
      .send(note)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a("object");
        response.body.should.have.property("title").eq("Test Note");
        response.body.should.have.property("body").eq("This is a test note");
        done();
      });
  });

  // Test Fetch Note by ID
  it("It should fetch a note by ID", (done) => {
    const note = new Note({ title: "Note by ID", body: "Testing fetch by ID" });
    note.save((err, note) => {
      chai
        .request(server)
        .get("/api/notes/" + note._id)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("title").eq("Note by ID");
          done();
        });
    });
  });

  // Test Query Notes by Title
  it("It should query notes by title substring", (done) => {
    const note = new Note({
      title: "Query Title",
      body: "Testing query by title",
    });
    note.save((err, note) => {
      chai
        .request(server)
        .get("/api/notes?title=Query")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(1);
          done();
        });
    });
  });

  // Test Update Note
  it("It should update a note by ID", (done) => {
    const note = new Note({ title: "Update Title", body: "Testing update" });
    note.save((err, note) => {
      chai
        .request(server)
        .put("/api/notes/" + note._id)
        .send({ title: "Updated Title", body: "Updated body" })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("title").eq("Updated Title");
          response.body.should.have.property("body").eq("Updated body");
          done();
        });
    });
  });
});
