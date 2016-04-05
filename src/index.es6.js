import { mkdir, read, write } from './fs-sync'
import _ from 'lodash';

let config = {
  baseDir: './test/templates'
};

let generator = process.argv[2];

let generators = {
  testFile: {
    files: [ 'test.js', 'test2.js' ],
    dest: './'
  }
};

export default (function() {
  const getTemplate = (file, data) => {
    let tmpl = _.template(read(file));
    return tmpl(data);
  };

  const scaffold = (name, data) => {
    let files = generators[name].files;
    return files.map(file => {
      return getTemplate(`${config.baseDir}/${file}`, data);
    });
  };

  const allTemplates = scaffold('testFile', {name: 'test-data'});

  const writeAllTemplates = () => {
    mkdir('./BOOM');
    allTemplates.forEach((tmpl, i) => {
      write(`./BOOM/${i}.js`, tmpl);
    });
  };

  return {
    writeAllTemplates: writeAllTemplates
  };
})();
