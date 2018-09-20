const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const debug = require('metalsmith-debug');

console.log(__dirname);

metalsmith(__dirname)
  .use(debug({
    log: 'hello world?',
    files: false
  }))
  .use(markdown({
    smartypants: true,
    gfm: true,
    tables: true
  }))
  .use(layouts({
    engine: 'qejs',
    directory: '_layouts'
  }))
  .source('./_source')
  .destination('./dist')
  .ignore([
    '_assets',
    '_data',
    '_layouts',
    '_includes',
    '_sdk',
    '_plugins',
    'assets', 
    'blog',
    'discussion', 
    'documentation', 
    'feed', 
    'quickstart', 
    'quickstart-fragments', 
    'search', 
    'test_page'
  ])
  .build(err => {
    if(err)
      console.error(err)
    else
      console.log('Site build complete!');
  });
