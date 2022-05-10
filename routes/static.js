/**
 * This file contains response to all api(s) to serve static files
 */
const fs = require('fs');

async function getForms(req, res) {
  if (req.method === 'GET') {
    try {
      fs.readFile(`${__dirname}/../views/index.html`, async (error, data) => {
        if (error) {
          res.writeHead(404);
          res.write('Error: Page Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    } catch (error) {
      res.writeHead(500);
      res.end(error.message);
    }
  }
}

async function getCssFile(req, res) {
  fs.readFile(
    `${__dirname}/../public/style.css`,
    { encoding: 'utf8' },
    async (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end(error.message);
      }
      res.writeHead(200, { 'Content-type': 'text/css' });
      res.end(data);
    },
  );
}

async function getJsFile(req, res) {
  fs.readFile(
    `${__dirname}/../public/script.js`,
    { encoding: 'utf8' },
    async (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end(error.message);
      }
      res.writeHead(200, { 'Content-type': 'text/js' });
      res.end(data);
    },
  );
}

module.exports = {
  getForms,
  getCssFile,
  getJsFile,
};
