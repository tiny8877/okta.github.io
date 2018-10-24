const path = require('path');
const { readFileSync } = require('fs');
const chalk = require('chalk');
const readdir = require('recursive-readdir');
const markdownLinkCheck = require('markdown-link-check');

function outputError(result) {
  console.log(`[${chalk.red('✖')}] ${result.link}`);
}

async function getFiles(dir) {
  const files = await readdir(dir);
  const filesToCheck = [];

  for (let file of files) {
    // Ignore 3rd party notices, blog, and book markdown pages.
    if (file.includes('.md') &&
      !file.includes('3rd_party_notices') &&
      !file.includes('posts') &&
      !file.includes('books')) {
      filesToCheck.push(file);
    }
  }

  return filesToCheck;
}

async function runMarkdownLinkCheck(options) {
  const files = await getFiles(path.resolve('_source'));

  files.forEach((file) => {
    const contents = readFileSync(file, 'utf8');

    markdownLinkCheck(contents, options, (err, results) => {
      if (err) { throw new Error(err) }

      const errorFiles = [];
      results.forEach(result => {
        if (result.status === 'dead') {
          errorFiles.push(result);
        }
      });

      if (errorFiles.length > 0) {
        // Terminate the process on the first broken link
        console.log(`FILE: ${chalk.bold.red(file)}`);
        errorFiles.forEach(error => { outputError(error) });
        process.exit(1);
      }
    });
  });
}

module.exports = runMarkdownLinkCheck;
