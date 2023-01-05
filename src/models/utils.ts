import http from 'http';
import { version as uuidVersion, validate as uuidValidate } from 'uuid';

export function getReqData(req: http.IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunck) => {
        body += chunck.toString();
      });
      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function uuidValidateV4(uuid: string) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

export function checkBodyReq(obj: object) {
  if (Object.keys(obj).length === 3 && Object.prototype.hasOwnProperty.call(obj, 'username')
    && Object.prototype.hasOwnProperty.call(obj, 'age')
    && Object.prototype.hasOwnProperty.call(obj, 'hobbies')) {
    return true;
  }
  return false;
}
