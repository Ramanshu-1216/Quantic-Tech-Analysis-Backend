const Client = require('../models/client');

exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.find().populate('contactPerson', 'email');
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createClient = async (req, res) => {
    const { name, contactPerson } = req.body;

    try {
        const newClient = new Client({ name, contactPerson });
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getClient = async (req, res) => {
    const { clientId } = req.params;

    try {
        const client = await Client.findById(clientId).populate('contactPerson', ['email', 'firstname', 'lastname', 'phone', 'address']);

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};