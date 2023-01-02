import * as http from "http";
import {users as data} from "./data/data";
import {UserController} from "./controllers/userController";

const PORT = Number(process.env.PORT) || 4000;

const myServer = http.createServer(async (req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        let users = await new UserController().getUsers();
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(users));
    }
    else if (req.url?.match('') && req.method === 'GET') {

    }
    else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end({message: "Error input. Page not found"})
    }
});

console.log(PORT)

myServer.listen(PORT, () => {
    console.log('Server is running on port 4000. Go to http://localhost:4000/api')
});


// myServer.close()
