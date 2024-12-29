import express, { Express, NextFunction, Request, Response } from 'express';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';
import configureApp from './middleware/loadConfiguration';
import baseRoute from './routes';


const app: Express = express();

configureApp(app);

app.use("/api", baseRoute);

app.use((req, res) => {
    //send 404
    res.status(404).json({
        "status": "error",
        "code": 404,
        "message": "Page not found.",
        "data": null,
        "requestId": req.requestId,
        "meta": {}
    });
})

//Error handling
app.use(errorHandlerMiddleware)


//uncaught exception handler
process.on("uncaughtException", (err) => {
    console.error('Uncaught Exception', err);
})

//starting server
const PORT = process.env['PORT'] || '3000';
app.listen(PORT, () => {
    console.log('Server started at ' + PORT);
});