import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import route from "./route";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes init
route(app)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
})

export default app
