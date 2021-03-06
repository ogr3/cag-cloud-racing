/* */ 
'use strict';
exports.__esModule = true;
exports['default'] = max;
var _reduceSupport = require('../reduce-support');
function max(comparer) {
  var max = typeof comparer === 'function' ? comparer : function(x, y) {
    return x > y ? x : y;
  };
  return this.lift(new _reduceSupport.ReduceOperator(max));
}
module.exports = exports['default'];
