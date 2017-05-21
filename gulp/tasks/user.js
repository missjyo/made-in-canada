'use strict';

const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const MadeIn = require('made-in-generator');

const infopath = path.resolve(__dirname, '../..', 'data', 'info.json');

/**
 * Gets speficied developers
 * gulp user:save --token <token> --location Japan
 */
gulp.task('user:save', ['validate'], () => {

  const {
    token,
    location
  } = process.env;
  return new MadeIn({ token }).getDevelopers(location);
});

/**
 * Gets all Japaneses developers
 * gulp user:save:all --token <token>
 */
gulp.task('user:save:all', ['validate'], () => {

  const { token } = process.env;
  const locations = require('../../data/canada.json');
  const info = require(infopath);
  const { current_location: location } = info;
  const index = location ? locations.indexOf(info.current_location) : 0;
  const array = locations.slice(index).concat(locations.slice(0, index));
  return new MadeIn({ token }).getDevelopers(array)
    .then(({ location }) => {
      console.log('user:save:all', 'finished', location);
      info.current_location = location;
      fs.writeFileSync(infopath, JSON.stringify(info, null, 2), 'utf8');
    });
});
