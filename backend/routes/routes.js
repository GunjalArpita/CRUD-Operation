import express from 'express';
import { Createuser, GetUser, UpdateUser, DeleteUser } from '../controller/UserController.js';  //don't forget to use .js extension

const routers = express.Router();

routers.post('/create', Createuser);
routers.get('/get', GetUser);
routers.put('/update/:id', UpdateUser);
routers.delete('/delete/:id', DeleteUser);

export default routers;