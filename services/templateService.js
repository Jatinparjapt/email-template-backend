const fs = require('fs');
const ejs = require('ejs');

exports.renderTemplate = async (layoutPath, template, variables) => {
    return new Promise((resolve, reject) => {
        fs.readFile(layoutPath, 'utf8', (err, layoutContent) => {
            if (err) return reject(err);
            
            const mergedContent = ejs.render(layoutContent, { ...template.variables, ...variables });
            resolve(mergedContent);
        });
    });
};
