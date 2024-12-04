const express = require('express');
import { Request, Response } from 'express';
import cors from 'cors';
import { db } from './firebase';
import bcrypt from 'bcryptjs';

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

app.post('/users', async(req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields: username, email, or password' });
  }

  try {
    const trackerRef = db.collection('metadata').doc('id_tracker');
    await db.runTransaction(async (transaction) => {
        const trackerDoc = await transaction.get(trackerRef);
        if (!trackerDoc.exists) {
            throw new Error('ID tracker does not exist');
        }
        const currentId = trackerDoc.data()?.currentId || "0";
        const newId = (parseInt(currentId, 10) + 1).toString();
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { id: newId, username, email, password: hashedPassword };
        transaction.set(db.collection('users').doc(newId), userData);
        transaction.update(trackerRef, { currentId: newId });
    });
    res.status(201).json({ message: 'User created successfully' });
} catch (error) {
    res.status(500).json({ message: 'Error creating user' });
}
  });

app.put('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
      const userRef = db.collection('users').doc(id);
      const doc = await userRef.get();

      if (!doc.exists) {
          return res.status(404).json({ message: 'User not found' });
      }
      if (!username && !email) {
        return res.status(400).json({ message: 'No valid fields provided for update' })}
      const updatedData: { [key: string]: string } = {};
      if (username) updatedData.username = username;
      if (email) updatedData.email = email;
      await userRef.update(updatedData);
      res.status(200).json({ message: `User with ID: ${id} updated successfully` });
  } catch (error) {
      res.status(500).json({ message: 'Error updating user' });
  }
});

app.delete('/users/:id', async(req: Request, res: Response) => {
  const { id } = req.params;

  try {
      const userRef = db.collection('users').doc(id);
      const doc = await userRef.get();

      if (!doc.exists) {
          return res.status(404).json({ message: 'User not found' });
      }

      await userRef.delete();
      res.status(200).json({ message: `User with ID: ${id} deleted successfully` });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting user' });
  }
  });

app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const userRef = db.collection('users');
    const userSnapshot = await userRef.where('email', '==', email).get();

    if (userSnapshot.empty) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const userWithoutPassword = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
    };

    res.status(200).json(userWithoutPassword);

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/subscribe', async(req:Request, res: Response) => {
  const {email} = req.body;
  if (!email){
    return res.status(400).json({message: "Email is required"})
  }
  try {
    const subscriptionRef = db.collection("subscribe");
    const newSub = { email, subscribedAt: new Date() };
    await subscriptionRef.add(newSub);

    res.status(201).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error("Error subscribing:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})
  
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });