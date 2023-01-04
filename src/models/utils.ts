import http from 'http';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

export function getReqData(req: http.IncomingMessage) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', chunck => {
                body += chunck.toString();
            })
            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(error);
        }
    })
}

export function uuidValidateV4(uuid: string) {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

export function checkBodyReq(obj: object) {
    if (Object.keys(obj).length === 3 && obj.hasOwnProperty('name') &&
    obj.hasOwnProperty('age') && obj.hasOwnProperty('hobbies')) {
        return true;
    }
    return false;
}
