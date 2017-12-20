/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const nodeModulesPath = require('node-modules-path');

module.exports = {
  name: 'ember-material-components',

  included: function(app) {
    this._super.included.apply(this, arguments);
    let nodeModules = nodeModulesPath(this.root);
    app.import(`${nodeModules}/material-components-web/dist/material-components-web.js`);
  },

  treeForStyles: function treeForStyles(tree) {
    var app;
    var styleTrees = [];
    var current = this;
    var nodeModules = nodeModulesPath(this.root);
    var materialPath = '@material';

    do {
      app = current.app || app;
    } while (current.parent.parent && (current = current.parent));

    if (app.project.findAddonByName('ember-cli-sass')) {
      styleTrees.push(new Funnel(path.join(nodeModules, materialPath), {
        destDir: materialPath
      }));
    }

    tree && styleTrees.push(tree);

    return mergeTrees(styleTrees, { overwrite: true });
  }
};
