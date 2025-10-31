"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Server: true,
  AxiosClient: true,
  SERVER_TIME_MAP: true,
  getCurrentServerTime: true
};
Object.defineProperty(exports, "AxiosClient", {
  enumerable: true,
  get: function get() {
    return _horizon_axios_client.default;
  }
});
Object.defineProperty(exports, "SERVER_TIME_MAP", {
  enumerable: true,
  get: function get() {
    return _horizon_axios_client.SERVER_TIME_MAP;
  }
});
Object.defineProperty(exports, "Server", {
  enumerable: true,
  get: function get() {
    return _server.HorizonServer;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "getCurrentServerTime", {
  enumerable: true,
  get: function get() {
    return _horizon_axios_client.getCurrentServerTime;
  }
});
var _horizon_api = require("./horizon_api");
Object.keys(_horizon_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _horizon_api[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _horizon_api[key];
    }
  });
});
var _server_api = require("./server_api");
Object.keys(_server_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _server_api[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _server_api[key];
    }
  });
});
var _account_response = require("./account_response");
Object.keys(_account_response).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _account_response[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _account_response[key];
    }
  });
});
var _server = require("./server");
var _horizon_axios_client = _interopRequireWildcard(require("./horizon_axios_client"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var _default = exports.default = module.exports;