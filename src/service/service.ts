import http from 'http';
import { UserController } from '../controllers/userController';
import { checkBodyReq, getReqData, uuidValidateV4 } from '../models/utils';
import { IBody, IUser } from '../models/models';

export function runServer(PORT: number) {
  return http.createServer(async (req, res) => {
    try {
      // GET all users
      if (req.url === '/api/users' && req.method === 'GET') {
        const users = await UserController.getUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
      } else if (req.url?.match(/^(\/api\/users)\/[0-9a-z-]+\/?$/) && req.method === 'GET') { // GET user
        const id = req.url?.split('/api/users/')[1] as string;
        if (!uuidValidateV4(id)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'UserId is invalid' }));
        } else {
          try {
            const user = await UserController.getUser(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
          } catch (error) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User doesn\'t exist!' }));
          }
        }
      } else if (req.url?.match(/^(\/api\/users)\/?$/) && req.method === 'POST') { // POST create new user
        let bodyUser = await getReqData(req);
        try {
          bodyUser = JSON.parse(bodyUser as string);
          if (!checkBodyReq(bodyUser as object)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error in body request' }));
          } else {
            const newUser = await UserController.createUser(bodyUser as IUser);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
          }
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Error in body request' }));
        }
      } else if (req.url?.match(/^(\/api\/users)\/[0-9a-z-]+\/?$/) && req.method === 'PUT') { // PUT update user
        const id = req.url?.split('/api/users/')[1] as string;
        let bodyUser = await getReqData(req);
        try {
          bodyUser = JSON.parse(bodyUser as string);
          if (!uuidValidateV4(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'UserId is invalid' }));
          } else if (!checkBodyReq(bodyUser as object)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error in body request' }));
          } else {
            try {
              const user = await UserController.updateUser(id, bodyUser as IBody);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(user));
            } catch {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'User doesn\'t exist!' }));
            }
          }
        } catch {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Error in body request' }));
        }
      } else if (req.url?.match(/^(\/api\/users)\/[0-9a-z-]+\/?$/) && req.method === 'DELETE') { // DELETE delete user
        try {
          const id = req.url?.split('/api/users/')[1] as string;
          if (!uuidValidateV4(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'UserId is invalid' }));
          } else {
            const message = await UserController.deleteUser(id);
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message }));
          }
        } catch (error) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: (error as Error).message }));
        }
      } else { // Not found
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Page not found' }));
      }
    } catch (error) { // Server error
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Server error' }));
    }
  }).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. Go to http://localhost:${PORT}/api`);
  });
}
