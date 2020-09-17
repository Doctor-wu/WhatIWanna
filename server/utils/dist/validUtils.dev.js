"use strict";

exports = function () {
  function require(value, msg) {
    if (!value) {
      console.log(msg);
      throw new Error(msg || "required Error");
    }

    return {
      require: require
    };
  }

  return {
    require: require
  };
}();