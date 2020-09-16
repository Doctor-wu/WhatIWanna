"use strict";

var _pageTrigger = require("./utils/page-trigger.js");

var _whatPage = require("./template/what-page.js");

new _pageTrigger.Trigger({
  pages: [_whatPage.whatPage]
});