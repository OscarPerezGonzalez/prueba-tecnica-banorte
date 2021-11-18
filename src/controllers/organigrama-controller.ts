import {Request, Response} from 'express'
import { findInTree } from '../utils'
const tree  =  require('../../tree')
const logger = require('log4js').getLogger("driver");


export class OrganigramaController {
    
    /**
    * @api {post} /api/banorte/organigrama/v1 Send organigrama for Testing.
    * @apiName sendOrganigrama
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 Ok
    *     {
            result: {
                id: 1,
                employeeNumber: 'N2151',
                name: 'Gustavo Rodriguez',
                position: 'Subdirector',
                children: [ [Object], [Object], [Object], [Object] ]
            },
            path: [
                { name: 'Miguel Angel', position: 'Director' },
                { name: 'Gustavo Rodriguez', position: 'Subdirector' }
            ]
          }
    */
    public async getOrganigrama (req: Request, res: Response): Promise<Response<any>>{
        logger.info("getOrganigrama starting...");
        const { employeeNumber } = req.body;

        if(!employeeNumber) return res.status(400).send({ message: 'Missing full employeeNumber'});

        const response = findInTree(employeeNumber, tree)

        logger.info("getOrganigrama finish...");
        return res.status(200).send(response);
    }
}