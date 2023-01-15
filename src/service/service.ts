import http from 'http';
import {createUser, deleteUser, getUser, getUsers, updateUser} from "./middleware";

export function runServer(PORT: number) {
  return http.createServer(async (req, res) => {
    try {
      // GET all users
      if (req.url === '/api/users' && req.method === 'GET') {
        await getUsers(req, res);
      } else if (req.url?.match(/^(\/api\/users)\/[0-9a-z-]+\/?$/) && req.method === 'GET') { // GET user
        await getUser(req, res)
      } else if (req.url?.match(/^(\/api\/users)\/?$/) && req.method === 'POST') { // POST create new user
        await createUser(req, res);
      } else if (req.url?.match(/^(\/api\/users)\/[0-9a-z-]+\/?$/) && req.method === 'PUT') { // PUT update user
        await updateUser(req, res);
      } else if (req.url?.match(/^(\/api\/users)\/[0-9a-z-]+\/?$/) && req.method === 'DELETE') { // DELETE delete user
        await deleteUser(req, res);
      } else { // Not found
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Page not found' }));
      }
    } catch (error) { // Server error
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Server error' }));
    }
  }).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. Go to http://localhost:${PORT}`);
  });
}
