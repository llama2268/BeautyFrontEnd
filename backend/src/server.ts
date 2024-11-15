const express = require('express');
import { Request, Response } from 'express';
import cors from 'cors';
import { db } from './firebase';
const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

//Outline for the routes for now
app.get('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const userRef = db.collection('users').doc(id);
        const doc = await userRef.get();
    
        if (!doc.exists) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.status(200).json(doc.data());
      } catch (error) {
        res.status(500).json({ message: 'Error fetching user data'});
      }

  });

app.post('/users', (req: Request, res: Response) => {
    const userData = req.body;
    res.status(201).json({ message: 'User created', data: userData });
  });

app.put('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  res.status(200).json({ message: `Updating user with ID: ${id}`, data: updatedData });
});

app.delete('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).json({ message: `Deleting user with ID: ${id}` });
  });
  
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });