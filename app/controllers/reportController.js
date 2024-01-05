const Report = require('../models/report');
const fs = require('fs');

exports.getAllClientReports = async (req, res) => {
    const {clientId} = req.params;
    try {
        const reports = await Report.find({client: clientId}).populate('client').populate('comments.user');
        res.json(reports);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createReport = async (req, res) => {
    const { client, camname, location, violationType, tags, assigned, status, live, comments } = req.body;
    const image = req.file;
    try {
        const imagepath = `uploads/${image.originalname}`;
        fs.writeFileSync(imagepath, image.buffer);
        const newReport = new Report({ client, camname, location, violationType, tags, assigned, status, imagepath, live: 'yes', comments });
        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getReport = async (req, res) => {
    const { reportId } = req.params;

    try {
        const report = await Report.findById(reportId).populate('client').populate('comments.user', '_id email firstname lastname phone').populate('client.contactPerson', '_id email firstname lastname phone').populate('assigned', '_id email firstname lastname phone');

        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.addCommentToReport = async (req, res) => {
    const { reportId } = req.params;
    const { user, message } = req.body;

    try {
        const report = await Report.findById(reportId);

        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }

        report.comments.push({ user, message, time: new Date() });
        await report.save();

        res.json(report);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};