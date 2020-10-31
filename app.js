const express = require('express');
const path = require('path');
const {v4} = require('uuid');
const app = express();

const Contacts = [
    {id: v4(), name: 'Denis', value: '+927 555 33 22', marked: false}
]

app.use(express.json());

//GET
app.get('/api/contacts', (req, res) => {
    setTimeout(() => {
  res.status(200).json(Contacts)}, 1000)
});

//POST
app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false};
    Contacts.push(contact);
    res.status(201).json(contact)
});

//DELETE
app.delete('/api/contacts/:id', (req, res) => {
    Contacts = Contacts.filter(c = c.id !== req.params.id)
    res.status(200).json({message: 'Contact was deleted'})
});

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
});

app.listen(3000, () => console.log('Server was started on port 3000...'));