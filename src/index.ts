import * as http from "http";
import {UserController} from "./controllers/userController";
import {v4 as uuidv4} from 'uuid';
import {checkBodyReq, getReqData, uuidValidateV4} from "./models/utils";
import {IUser} from "./models/models";

const PORT = Number(process.env.PORT) || 4000;

const myServer = http.createServer(async (req, res) => {
    // GET all users
    if (req.url === '/api/users' && req.method === 'GET') {
        let users = await new UserController().getUsers();
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(users));
    }
    // GET user
    else if (req.url?.match(/^(\/api\/users)\/[0-9a-z-]+\/?$/) && req.method === 'GET') {
        try {
            const id = req.url?.split('/api/users/')[1] as string;
            if (!uuidValidateV4(id)) {
                res.writeHead(400, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({message: 'UserId is invalid'}));
            }
            else {
                let user = await new UserController().getUser(id);
                if (!user) {
                    throw new Error('User doesn`t exist!');
                }
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(user));
            }
        } catch (error) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: error}));
        }
    }
    //POST create new user
    else if (req.url?.match(/^(\/api\/users)\/?$/) && req.method === 'POST') {
        let bodyUser = await getReqData(req);
        if (!checkBodyReq(bodyUser as object)) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: "Error in body request"}))
        }
        else {
            let newUser = await new UserController().createUser(JSON.parse(bodyUser as string) as IUser);
            res.writeHead(201, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(newUser));
        }

    }
    //PUT update user
    else if (req.url?.match(/^(\/api\/users)\/[0-9a-z-]+\/?$/) && req.method === 'PUT') {
        let bodyUser = await getReqData(req);
        if (!checkBodyReq(bodyUser as object)) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: "Error in body request"}))
        }
    }
    //DELETE delete user
    else if (req.url?.match(/^(\/api\/users)\/[0-9a-z-]+\/?$/) && req.method === 'DELETE') {
        try {
            const id = req.url?.split('/api/users/')[1] as string;
            if (!uuidValidateV4(id)) {
                res.writeHead(400, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({message: 'UserId is invalid'}));
            }
            else {
                let messange = await new UserController().deleteUser(id);
                if (!messange) {
                    throw new Error('User doesnt exist!');
                }
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({messange}));
            }
        } catch (error) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: error}));
        }
    }
    //Not found
    else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: "Error input. Page not found"}));
    }
});

myServer.listen(PORT, () => {
    console.log('Server is running on port 4000. Go to http://localhost:4000/api')
});


// myServer.close()
