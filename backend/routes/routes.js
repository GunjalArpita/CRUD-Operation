import express from 'express';
// Removed incorrect import of 'routers' from './routes.js'
import { Createuser, GetUser, UpdateUser, DeleteUser } from '../controller/UserController.js'; // Don't forget to use .js extension

const routers = express.Router();

routers.post('/create', Createuser);
routers.get('/get', GetUser);
routers.put('/update/:id', UpdateUser);
routers.delete('/delete/:id', DeleteUser);

export default routers; // Ensure correct export of the router instance