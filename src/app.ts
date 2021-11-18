import express from 'express';
import { OrganigramaRoutes } from './routes/index';
import * as log4js from 'log4js';
import * as bodyParser from "body-parser";

const log = log4js.getLogger("app");

class App {
    public app: express.Application;

    public organigramaRoutes: OrganigramaRoutes = new OrganigramaRoutes();

    constructor () {
        this.app = express();
        this.app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
        this.config();
        this.organigramaRoutes.routes(this.app);
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new App().app;