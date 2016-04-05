'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = require('fs');
var _ = _interopDefault(require('lodash'));

var REPORT_ERR = function REPORT_ERR(e) {
  if (e) console.error(e.message);
};

function mkdir(dir) {
  return fs.mkdirSync(dir, REPORT_ERR);
}

function read(file) {
  try {
    return fs.readFileSync(file);
  } catch (e) {
    REPORT_ERR(e);
  }
}

function write(dest, contents) {
  return fs.writeFileSync(dest, contents);
}

var config = {
  baseDir: './test/templates'
};

var generators = {
  testFile: {
    files: ['test.js', 'test2.js'],
    dest: './'
  }
};

var getTemplate = function getTemplate(file, data) {
  var tmpl = _.template(read(file));
  return tmpl(data);
};

var scaffold = function scaffold(name, data) {
  var files = generators[name].files;
  return files.map(function (file) {
    return getTemplate(config.baseDir + '/' + file, data);
  });
};

var allTemplates = scaffold('testFile', { name: 'nate-jacobs' });
mkdir('./BOOM');

allTemplates.forEach(function (tmpl, i) {
  write('./BOOM/' + i + '.js', tmpl);
});