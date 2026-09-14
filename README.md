# Notes API

A REST API for notes — Express and MongoDB, documented with Swagger and covered
by integration tests.

## Layout

```
server.js               app bootstrap + Swagger UI mount
config/db.js            MongoDB connection
models/noteModel.js     schema
controllers/noteController.js
routes/noteRoutes.js
test/noteTest.js        Mocha + Chai + Supertest
```

Routes stay thin and delegate to controllers; the controller is the only layer
that touches the model.

## Running

```bash
npm install
cp .env.example .env     # then fill in your own MONGO_URI
npm run dev              # nodemon
```

| Variable    | Purpose                        |
|-------------|--------------------------------|
| `MONGO_URI` | MongoDB connection string      |
| `PORT`      | HTTP port (defaults to `3000`) |

> **Never commit your real `.env`.** It is git-ignored for a reason — a
> connection string with credentials in it is a live secret.

## API docs

With the server running, open **`/api-docs`** for the generated Swagger UI.
The spec is built from JSDoc annotations via `swagger-jsdoc`.

## Tests

```bash
npx mocha test/noteTest.js
```

## Stack

Node.js · Express · MongoDB / Mongoose · swagger-jsdoc · swagger-ui-express · Mocha · Chai · Supertest
