var _ = exports
var toStr = Object.prototype.toString
var slice = Array.prototype.slice
var hasOwn = Object.prototype.hasOwnProperty
var isArrayNative = Array.isArray
var bind = Function.prototype.bind

_.noop = function () {}

_.now = function () {
  return new Date().getTime()
}

_.isObj = function (o) {
  return o && toStr.call(o) === '[object Object]' || false
}

_.isArr = function (o) {
  return o && isArrayNative ? isArrayNative(o) : toStr.call(o) === '[object Array]' || false
}

_.bind = function (ctx, fn) {
  return bind ? fn.bind(ctx) : function () {
    return fn.apply(ctx, arguments)
  }
}

_.each = function (obj, fn) {
  var i, l
  if (_.isArr(obj))
    for (i = 0, l = obj.length; i < l; i += 1) fn(obj[i], i)
  else if (_.isObj(obj))
    for (i in obj) if (hasOwn.call(obj, i)) fn(i, obj[i])
}

_.extend = function (target) {
  var args = slice.call(arguments, 1)
  _.each(args, function (obj) {
    if (_.isObj(obj)) {
      _.each(obj, function (key, value) {
        target[key] = value
      })
    }
  })
  return target
}

_.clone = function (obj) {
  return _.extend({}, obj)
}

_.omit = function (obj, keys) {
  var key, buf = {}
  if (_.isObj(obj)) {
    for (key in obj) if (hasOwn.call(obj, key)) {
      if (keys.indexOf(key) === -1) buf[key] = obj[key]
    }
  }
  return buf
}

_.pick = function (obj, keys) {
  var buf = {}
  if (_.isObj(obj)) {
    Object.keys(obj)
      .filter(function (key) {
        return keys.indexOf(key) !== -1
      })
      .forEach(function (key) {
        return buf[key] = obj[key]
      })
  }
  return buf
}

_.delay = function (fn, ms) {
  setTimeout(fn, ms || 1)
}

_.join = function (base) {
  return (base || '') + (slice.call(arguments, 1)
    .filter(function (part) { return typeof part === 'string' && part.length > 0 })
    .join(''))
}
