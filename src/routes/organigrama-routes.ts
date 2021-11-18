import { OrganigramaController } from "../controllers";
import express from 'express'

export class OrganigramaRoutes {

    public organigramaController: OrganigramaController = new OrganigramaController();

    public routes(app: express.Application): void {
        app.route('/api/banorte/organigrama/v1')
        .post(this.organigramaController.getOrganigrama); //new getOrganigrama
    }
}