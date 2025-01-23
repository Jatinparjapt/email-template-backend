const path = require('path');
const fs = require('fs');
const EmailTemplate = require('../models/emailTemplate');
const { renderTemplate } = require('../services/templateService');

// Get layout HTML
exports.getEmailLayout = (req, res) => {
    const layoutPath = path.join(__dirname, '../public/layout.html');
    fs.readFile(layoutPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ message: 'Error reading layout file', error: err });
        }
        res.send({ html: data });
    });
};

// Upload image
exports.uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }
    res.send({ message: 'File uploaded successfully', filePath: `/public/uploads/${req.file.filename}` });
};

// Upload email configuration
exports.uploadEmailConfig = async (req, res) => {
    try {
        const emailTemplate = new EmailTemplate(req.body);
        await emailTemplate.save();
        res.send({ message: 'Email configuration saved', template: emailTemplate });
    } catch (error) {
        console.log(error ,"emai config")
        res.status(500).send({ message: 'Error saving email configuration', error });
    }
};

// Render and download HTML template
exports.renderAndDownloadTemplate = async (req, res) => {
    const { templateId, variables } = req.body;
    try {
        const emailTemplate = await EmailTemplate.findById(templateId);
        if (!emailTemplate) {
            return res.status(404).send({ message: 'Template not found' });
        }

        const layoutPath = path.join(__dirname, '../public/layout.html');
        const renderedHTML = await renderTemplate(layoutPath, emailTemplate, variables);

        res.setHeader('Content-Disposition', 'attachment; filename=output.html');
        res.send(renderedHTML);
    } catch (error) {
        res.status(500).send({ message: 'Error rendering template', error });
    }
};
