/* eslint-disable import/no-extraneous-dependencies */

const inPlace = require('@metalsmith/in-place');
const layouts = require('@metalsmith/layouts');
const drafts = require('@metalsmith/drafts');
const when = require('metalsmith-if');
const htmlMinifier = require('metalsmith-html-minifier');
const Metalsmith = require('metalsmith');

const nodeVersion = process.version;


const isProduction = process.env.NODE_ENV === 'production';



Metalsmith(__dirname)
  .clean(true)
  .metadata({
    nodeVersion,
    isProduction,
    siteUrl: isProduction ? 'https://metalsmith.io' : 'https://localhost:3000',
  })
  .use(when(isProduction, drafts()))
  
  .use(
    inPlace({
      engineOptions: {
        smartypants: true,
        smartLists: true,
      },
      pattern: '**/*.{md,njk}'
    })
  )
  
  .use(
    layouts({
      directory: 'lib/views',
      pattern: '**/*.html',
      engineOptions: {
        
      }
    })
  )
  
  
  .use(when(isProduction, htmlMinifier()))
  
  .build(err => {
    if (err) {
      throw err;
    }
  });
