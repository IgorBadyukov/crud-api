import * as http from 'http';
import { UserController } from './controllers/userController';
import { checkBodyReq, getReqData, uuidValidateV4 } from './models/utils';
import { IBody, IUser } from './models/models';

const PORT = Number(process.env.PORT) || 4000;

const myServer = http.createServer(async (req, res) => {
  // GET all users
  if (req.url === '/api/users' && req.method === 'GET') {
    const users = await UserController.getUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else if (req.url?.match(/^(\/api\/users)\/[0-9a-z-]+\/?$/) && req.method === 'GET') { // GET user
    try {
      const id = req.url?.split('/api/users/')[1] as string;
      if (!uuidValidateV4(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'UserId is invalid' }));
      } else {
        const user = await UserController.getUser(id);
        if (!user) {
          throw new Error('User doesn\'t exist!');
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      }
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error }));
    }
  } else if (req.url?.match(/^(\/api\/users)\/?$/) && req.method === 'POST') { // POST create new user
    const bodyUser = await getReqData(req);
    if (!checkBodyReq(bodyUser as object)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Error in body request' }));
    } else {
      const newUser = await UserController.createUser(JSON.parse(bodyUser as string) as IUser);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    }
  } else if (req.url?.match(/^(\/api\/users)\/[0-9a-z-]+\/?$/) && req.method === 'PUT') { // PUT update user
    try {
      const id = req.url?.split('/api/users/')[1] as string;
      const bodyUser = await getReqData(req);
      if (!uuidValidateV4(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'UserId is invalid' }));
      } else if (!checkBodyReq(bodyUser as object)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error in body request' }));
      } else {
        const message = await UserController.updateUser(id, JSON.parse(bodyUser as string) as IBody);
        if (!message) {
          throw new Error('User doesnt exist!');
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message }));
      }
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error }));
    }
  } else if (req.url?.match(/^(\/api\/users)\/[0-9a-z-]+\/?$/) && req.method === 'DELETE') { // DELETE delete user
    try {
      const id = req.url?.split('/api/users/')[1] as string;
      if (!uuidValidateV4(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'UserId is invalid' }));
      } else {
        const message = await UserController.deleteUser(id);
        if (!message) {
          throw new Error('User doesn\'t exist!');
        }
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message }));
      }
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error }));
    }
  } else { // Not found
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error input. Page not found' }));
  }
});

myServer.listen(PORT, () => {
  console.log('Server is running on port 4000. Go to http://localhost:4000/api');
});
