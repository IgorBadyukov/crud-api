import supertest from 'supertest';
import { runServer } from '../src/service/service';
import { IBody, IUser } from '../src/models/models';

const port = Number(process.env.PORT) || 4000;
const server = runServer(port);

afterAll((done) => {
  server.close();
  done();
});

let idUser: string;
const fakeID = '2ac0e67f-3025-4ed1-93eb-e5edd55b089b';

const newUser = {
  username: 'Mr. Heisenberg',
  age: 50,
  hobbies: ['drugs'],
} as IBody;

const userWithID = { ...newUser, id: '' };

const changeBody = {
  username: 'Walter White',
  age: 50,
  hobbies: ['family', 'chemistry'],
} as IBody;

const fakeRequestBody = [
  {

  },
  {
    username: '',
  },
  {
    age: 12,
  },
  {
    age: 13,
    hobbies: [],
  },
];

const notFoundPage = ['/api/userss', '/', '/api/users/'];

const allUsers = [] as IUser[];

describe('First test (check successful status)', () => {
  it('GET empty array', async () => {
    const response = await supertest(server).get('/api/users');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(allUsers);
  });

  it('POST new user', async () => {
    const response = await supertest(server).post('/api/users').send(JSON.stringify(newUser));
    expect(response.statusCode).toEqual(201);
    idUser = response.body.id;
    userWithID.id = response.body.id;
  });

  it('GET user by its id', async () => {
    const response = await supertest(server).get(`/api/users/${idUser}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(userWithID);
  });

  it('PUT user by its id', async () => {
    const response = await supertest(server).put(`/api/users/${idUser}`).send(changeBody);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ ...changeBody, id: idUser });
  });

  it('DELETE user by its id', async () => {
    const response = await supertest(server).delete(`/api/users/${idUser}`);
    expect(response.statusCode).toEqual(204);
  });

  it('GET not exist user', async () => {
    const response = await supertest(server).get(`/api/users/${idUser}`);
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual('User doesn\'t exist!');
  });
});

describe('Second test (check 400 error)', () => {
  it('GET user with not valid id', async () => {
    const response = await supertest(server).get('/api/users/savsdvs123124mvsd');
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('UserId is invalid');
  });

  it.each(fakeRequestBody)('POST user with not full body', async (req) => {
    const response = await supertest(server).post('/api/users').send(JSON.stringify(req));
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Error in body request');
  });

  it('PUT user with not valid id', async () => {
    const response = await supertest(server).put('/api/users/savsdvs123124mvsd').send(changeBody);
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('UserId is invalid');
  });

  it.each(fakeRequestBody)('PUT user with not full body', async (req) => {
    const response = await supertest(server).put(`/api/users/${fakeID}`).send(JSON.stringify(req));
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Error in body request');
  });

  it('Delete user with not valid id', async () => {
    const response = await supertest(server).delete('/api/users/savsdvs123124mvsd');
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('UserId is invalid');
  });
});

describe('Third test (check 404 error)', () => {
  it('GET user with not exist id', async () => {
    const response = await supertest(server).get(`/api/users/${fakeID}`);
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual('User doesn\'t exist!');
  });

  it('PUT user with not exist id', async () => {
    const response = await supertest(server).put(`/api/users/${fakeID}`).send(changeBody);
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual('User doesn\'t exist!');
  });

  it('Delete user with not exist id', async () => {
    const response = await supertest(server).delete(`/api/users/${fakeID}`);
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual('User doesn\'t exist!');
  });

  it.each(notFoundPage)('Page not found', async (page) => {
    const response = await supertest(server).get(page);
    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual('Page not found');
  });
});
