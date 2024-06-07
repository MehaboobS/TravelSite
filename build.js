const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');

// Define paths
const templatesDir = path.join(__dirname, 'templates');
const outputDir = path.join(__dirname, 'dist');

// Ensure output directory exists
fs.ensureDirSync(outputDir);

// Function to render EJS templates to HTML
const renderEJSToHTML = (templatePath, data) => {
  const template = fs.readFileSync(templatePath, 'utf-8');
  return ejs.render(template, data);
};

// Process each EJS file in the templates directory
fs.readdirSync(templatesDir).forEach(file => {
  if (path.extname(file) === '.ejs') {
    const templatePath = path.join(templatesDir, file);
    const outputFilePath = path.join(outputDir, `${path.basename(file, '.ejs')}.html`);
    const html = renderEJSToHTML(templatePath, {});  // Pass data if needed
    fs.writeFileSync(outputFilePath, html, 'utf-8');
    console.log(`Rendered ${file} to ${outputFilePath}`);
  }
});
