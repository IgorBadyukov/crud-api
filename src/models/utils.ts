import http from 'http'

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
