import express, { Request, Response } from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());

//Outline for the routes for now
app.get('/api/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).json({ message: `Fetching user with ID: ${id}` });
  });

app.post('/api/users', (req: Request, res: Response) => {
    const userData = req.body;
    res.status(201).json({ message: 'User created', data: userData });
  });

app.put('/api/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  res.status(200).json({ message: `Updating user with ID: ${id}`, data: updatedData });
});

app.delete('/api/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).json({ message: `Deleting user with ID: ${id}` });
  });
  
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });