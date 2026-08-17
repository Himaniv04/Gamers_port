"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/create-order/route";
exports.ids = ["app/api/create-order/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "http2":
/*!************************!*\
  !*** external "http2" ***!
  \************************/
/***/ ((module) => {

module.exports = require("http2");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcreate-order%2Froute&page=%2Fapi%2Fcreate-order%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcreate-order%2Froute.js&appDir=D%3A%5CLooper%5CWeb%5CGamers_port%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CLooper%5CWeb%5CGamers_port&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcreate-order%2Froute&page=%2Fapi%2Fcreate-order%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcreate-order%2Froute.js&appDir=D%3A%5CLooper%5CWeb%5CGamers_port%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CLooper%5CWeb%5CGamers_port&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_Looper_Web_Gamers_port_app_api_create_order_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/create-order/route.js */ \"(rsc)/./app/api/create-order/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/create-order/route\",\n        pathname: \"/api/create-order\",\n        filename: \"route\",\n        bundlePath: \"app/api/create-order/route\"\n    },\n    resolvedPagePath: \"D:\\\\Looper\\\\Web\\\\Gamers_port\\\\app\\\\api\\\\create-order\\\\route.js\",\n    nextConfigOutput,\n    userland: D_Looper_Web_Gamers_port_app_api_create_order_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/create-order/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZjcmVhdGUtb3JkZXIlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmNyZWF0ZS1vcmRlciUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmNyZWF0ZS1vcmRlciUyRnJvdXRlLmpzJmFwcERpcj1EJTNBJTVDTG9vcGVyJTVDV2ViJTVDR2FtZXJzX3BvcnQlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUNMb29wZXIlNUNXZWIlNUNHYW1lcnNfcG9ydCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDYztBQUMzRjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2dhbWVycy1wb3J0Lz8yZjM2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXExvb3BlclxcXFxXZWJcXFxcR2FtZXJzX3BvcnRcXFxcYXBwXFxcXGFwaVxcXFxjcmVhdGUtb3JkZXJcXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2NyZWF0ZS1vcmRlci9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2NyZWF0ZS1vcmRlclwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvY3JlYXRlLW9yZGVyL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxcTG9vcGVyXFxcXFdlYlxcXFxHYW1lcnNfcG9ydFxcXFxhcHBcXFxcYXBpXFxcXGNyZWF0ZS1vcmRlclxcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvY3JlYXRlLW9yZGVyL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcreate-order%2Froute&page=%2Fapi%2Fcreate-order%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcreate-order%2Froute.js&appDir=D%3A%5CLooper%5CWeb%5CGamers_port%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CLooper%5CWeb%5CGamers_port&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/create-order/route.js":
/*!***************************************!*\
  !*** ./app/api/create-order/route.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.js\");\n/* harmony import */ var _models_Booking__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/models/Booking */ \"(rsc)/./models/Booking.js\");\n/* harmony import */ var _lib_razorpay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/razorpay */ \"(rsc)/./lib/razorpay.js\");\n\n\n\n\nconst dynamic = \"force-dynamic\";\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const { bookingId, amount: customAmount, currency, receipt } = body;\n        let amountInPaise;\n        let targetBooking = null;\n        if (bookingId) {\n            await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n            targetBooking = await _models_Booking__WEBPACK_IMPORTED_MODULE_2__[\"default\"].findById(bookingId);\n            if (!targetBooking) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: \"Booking record not found\"\n                }, {\n                    status: 404\n                });\n            }\n            if (targetBooking.status !== \"PENDING\") {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: `Booking status is currently ${targetBooking.status}`\n                }, {\n                    status: 400\n                });\n            }\n            if (new Date() > new Date(targetBooking.lockExpiresAt)) {\n                targetBooking.status = \"EXPIRED\";\n                await targetBooking.save();\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: \"Reservation lock expired. Please select the slot again.\"\n                }, {\n                    status: 410\n                });\n            }\n            amountInPaise = Math.round(targetBooking.totalAmount * 100);\n        } else if (customAmount) {\n            amountInPaise = Number(customAmount);\n        } else {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Booking ID or payment amount is required\"\n            }, {\n                status: 400\n            });\n        }\n        if (isNaN(amountInPaise) || amountInPaise < 100) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Minimum payment amount must be at least 100 paise (₹1)\"\n            }, {\n                status: 400\n            });\n        }\n        const options = {\n            amount: amountInPaise,\n            currency: currency || \"INR\",\n            receipt: receipt || `rcpt_${bookingId || Date.now()}`,\n            notes: targetBooking ? {\n                bookingId: targetBooking._id.toString(),\n                userEmail: targetBooking.userEmail\n            } : {}\n        };\n        const order = await _lib_razorpay__WEBPACK_IMPORTED_MODULE_3__[\"default\"].orders.create(options);\n        if (targetBooking) {\n            targetBooking.razorpayOrderId = order.id;\n            await targetBooking.save();\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            order_id: order.id,\n            orderId: order.id,\n            amount: order.amount,\n            currency: order.currency,\n            key_id: \"rzp_test_TQsiWoDT3leCLG\" || 0,\n            key: \"rzp_test_TQsiWoDT3leCLG\" || 0,\n            bookingId: targetBooking?._id\n        });\n    } catch (error) {\n        console.error(\"Razorpay Order Creation Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || \"Failed to create Razorpay payment order\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUN0QjtZQUFFUyxPQUFPQSxNQUFNK0IsT0FBTyxJQUFJO1FBQTBDLEdBQ3BFO1lBQUU5QixRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2dhbWVycy1wb3J0Ly4vYXBwL2FwaS9jcmVhdGUtb3JkZXIvcm91dGUuanM/OTI0YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCBjb25uZWN0VG9EYXRhYmFzZSBmcm9tIFwiQC9saWIvZGJcIjtcbmltcG9ydCBCb29raW5nIGZyb20gXCJAL21vZGVscy9Cb29raW5nXCI7XG5pbXBvcnQgcmF6b3JwYXkgZnJvbSBcIkAvbGliL3Jhem9ycGF5XCI7XG5cbmV4cG9ydCBjb25zdCBkeW5hbWljID0gXCJmb3JjZS1keW5hbWljXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcSkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpO1xuICAgIGNvbnN0IHsgYm9va2luZ0lkLCBhbW91bnQ6IGN1c3RvbUFtb3VudCwgY3VycmVuY3ksIHJlY2VpcHQgfSA9IGJvZHk7XG5cbiAgICBsZXQgYW1vdW50SW5QYWlzZTtcbiAgICBsZXQgdGFyZ2V0Qm9va2luZyA9IG51bGw7XG5cbiAgICBpZiAoYm9va2luZ0lkKSB7XG4gICAgICBhd2FpdCBjb25uZWN0VG9EYXRhYmFzZSgpO1xuICAgICAgdGFyZ2V0Qm9va2luZyA9IGF3YWl0IEJvb2tpbmcuZmluZEJ5SWQoYm9va2luZ0lkKTtcblxuICAgICAgaWYgKCF0YXJnZXRCb29raW5nKSB7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkJvb2tpbmcgcmVjb3JkIG5vdCBmb3VuZFwiIH0sIHsgc3RhdHVzOiA0MDQgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXRCb29raW5nLnN0YXR1cyAhPT0gXCJQRU5ESU5HXCIpIHtcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICAgIHsgZXJyb3I6IGBCb29raW5nIHN0YXR1cyBpcyBjdXJyZW50bHkgJHt0YXJnZXRCb29raW5nLnN0YXR1c31gIH0sXG4gICAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXcgRGF0ZSgpID4gbmV3IERhdGUodGFyZ2V0Qm9va2luZy5sb2NrRXhwaXJlc0F0KSkge1xuICAgICAgICB0YXJnZXRCb29raW5nLnN0YXR1cyA9IFwiRVhQSVJFRFwiO1xuICAgICAgICBhd2FpdCB0YXJnZXRCb29raW5nLnNhdmUoKTtcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICAgIHsgZXJyb3I6IFwiUmVzZXJ2YXRpb24gbG9jayBleHBpcmVkLiBQbGVhc2Ugc2VsZWN0IHRoZSBzbG90IGFnYWluLlwiIH0sXG4gICAgICAgICAgeyBzdGF0dXM6IDQxMCB9XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGFtb3VudEluUGFpc2UgPSBNYXRoLnJvdW5kKHRhcmdldEJvb2tpbmcudG90YWxBbW91bnQgKiAxMDApO1xuICAgIH0gZWxzZSBpZiAoY3VzdG9tQW1vdW50KSB7XG4gICAgICBhbW91bnRJblBhaXNlID0gTnVtYmVyKGN1c3RvbUFtb3VudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogXCJCb29raW5nIElEIG9yIHBheW1lbnQgYW1vdW50IGlzIHJlcXVpcmVkXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChpc05hTihhbW91bnRJblBhaXNlKSB8fCBhbW91bnRJblBhaXNlIDwgMTAwKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6IFwiTWluaW11bSBwYXltZW50IGFtb3VudCBtdXN0IGJlIGF0IGxlYXN0IDEwMCBwYWlzZSAo4oK5MSlcIiB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIGFtb3VudDogYW1vdW50SW5QYWlzZSxcbiAgICAgIGN1cnJlbmN5OiBjdXJyZW5jeSB8fCBcIklOUlwiLFxuICAgICAgcmVjZWlwdDogcmVjZWlwdCB8fCBgcmNwdF8ke2Jvb2tpbmdJZCB8fCBEYXRlLm5vdygpfWAsXG4gICAgICBub3RlczogdGFyZ2V0Qm9va2luZ1xuICAgICAgICA/IHtcbiAgICAgICAgICAgIGJvb2tpbmdJZDogdGFyZ2V0Qm9va2luZy5faWQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIHVzZXJFbWFpbDogdGFyZ2V0Qm9va2luZy51c2VyRW1haWwsXG4gICAgICAgICAgfVxuICAgICAgICA6IHt9LFxuICAgIH07XG5cbiAgICBjb25zdCBvcmRlciA9IGF3YWl0IHJhem9ycGF5Lm9yZGVycy5jcmVhdGUob3B0aW9ucyk7XG5cbiAgICBpZiAodGFyZ2V0Qm9va2luZykge1xuICAgICAgdGFyZ2V0Qm9va2luZy5yYXpvcnBheU9yZGVySWQgPSBvcmRlci5pZDtcbiAgICAgIGF3YWl0IHRhcmdldEJvb2tpbmcuc2F2ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgb3JkZXJfaWQ6IG9yZGVyLmlkLFxuICAgICAgb3JkZXJJZDogb3JkZXIuaWQsXG4gICAgICBhbW91bnQ6IG9yZGVyLmFtb3VudCxcbiAgICAgIGN1cnJlbmN5OiBvcmRlci5jdXJyZW5jeSxcbiAgICAgIGtleV9pZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfUkFaT1JQQVlfS0VZX0lEIHx8IHByb2Nlc3MuZW52LlJBWk9SUEFZX0tFWV9JRCxcbiAgICAgIGtleTogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfUkFaT1JQQVlfS0VZX0lEIHx8IHByb2Nlc3MuZW52LlJBWk9SUEFZX0tFWV9JRCxcbiAgICAgIGJvb2tpbmdJZDogdGFyZ2V0Qm9va2luZz8uX2lkLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJSYXpvcnBheSBPcmRlciBDcmVhdGlvbiBFcnJvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgXCJGYWlsZWQgdG8gY3JlYXRlIFJhem9ycGF5IHBheW1lbnQgb3JkZXJcIiB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImNvbm5lY3RUb0RhdGFiYXNlIiwiQm9va2luZyIsInJhem9ycGF5IiwiZHluYW1pYyIsIlBPU1QiLCJyZXEiLCJib2R5IiwianNvbiIsImJvb2tpbmdJZCIsImFtb3VudCIsImN1c3RvbUFtb3VudCIsImN1cnJlbmN5IiwicmVjZWlwdCIsImFtb3VudEluUGFpc2UiLCJ0YXJnZXRCb29raW5nIiwiZmluZEJ5SWQiLCJlcnJvciIsInN0YXR1cyIsIkRhdGUiLCJsb2NrRXhwaXJlc0F0Iiwic2F2ZSIsIk1hdGgiLCJyb3VuZCIsInRvdGFsQW1vdW50IiwiTnVtYmVyIiwiaXNOYU4iLCJvcHRpb25zIiwibm93Iiwibm90ZXMiLCJfaWQiLCJ0b1N0cmluZyIsInVzZXJFbWFpbCIsIm9yZGVyIiwib3JkZXJzIiwiY3JlYXRlIiwicmF6b3JwYXlPcmRlcklkIiwiaWQiLCJzdWNjZXNzIiwib3JkZXJfaWQiLCJvcmRlcklkIiwia2V5X2lkIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1JBWk9SUEFZX0tFWV9JRCIsIlJBWk9SUEFZX0tFWV9JRCIsImtleSIsImNvbnNvbGUiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/create-order/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectToDatabase: () => (/* binding */ connectToDatabase),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable inside .env.local\");\n}\n/**\n * Global is used here to maintain a cached connection across hot reloads\n * in development and serverless invocations in production.\n */ let cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function connectToDatabase() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false,\n            maxPoolSize: 10,\n            serverSelectionTimeoutMS: 5000,\n            socketTimeoutMS: 45000\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongooseInstance)=>{\n            console.log(\"MongoDB connected successfully\");\n            return mongooseInstance;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectToDatabase);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFnQztBQUVoQyxNQUFNQyxjQUFjQyxRQUFRQyxHQUFHLENBQUNGLFdBQVc7QUFFM0MsSUFBSSxDQUFDQSxhQUFhO0lBQ2hCLE1BQU0sSUFBSUcsTUFDUjtBQUVKO0FBRUE7OztDQUdDLEdBQ0QsSUFBSUMsU0FBU0MsT0FBT04sUUFBUTtBQUU1QixJQUFJLENBQUNLLFFBQVE7SUFDWEEsU0FBU0MsT0FBT04sUUFBUSxHQUFHO1FBQUVPLE1BQU07UUFBTUMsU0FBUztJQUFLO0FBQ3pEO0FBRU8sZUFBZUM7SUFDcEIsSUFBSUosT0FBT0UsSUFBSSxFQUFFO1FBQ2YsT0FBT0YsT0FBT0UsSUFBSTtJQUNwQjtJQUVBLElBQUksQ0FBQ0YsT0FBT0csT0FBTyxFQUFFO1FBQ25CLE1BQU1FLE9BQU87WUFDWEMsZ0JBQWdCO1lBQ2hCQyxhQUFhO1lBQ2JDLDBCQUEwQjtZQUMxQkMsaUJBQWlCO1FBQ25CO1FBRUFULE9BQU9HLE9BQU8sR0FBR1IsdURBQWdCLENBQUNDLGFBQWFTLE1BQU1NLElBQUksQ0FBQyxDQUFDQztZQUN6REMsUUFBUUMsR0FBRyxDQUFDO1lBQ1osT0FBT0Y7UUFDVDtJQUNGO0lBRUEsSUFBSTtRQUNGWixPQUFPRSxJQUFJLEdBQUcsTUFBTUYsT0FBT0csT0FBTztJQUNwQyxFQUFFLE9BQU9ZLEdBQUc7UUFDVmYsT0FBT0csT0FBTyxHQUFHO1FBQ2pCLE1BQU1ZO0lBQ1I7SUFFQSxPQUFPZixPQUFPRSxJQUFJO0FBQ3BCO0FBRUEsaUVBQWVFLGlCQUFpQkEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2dhbWVycy1wb3J0Ly4vbGliL2RiLmpzPzNkYzkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xuXG5pZiAoIU1PTkdPREJfVVJJKSB7XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICBcIlBsZWFzZSBkZWZpbmUgdGhlIE1PTkdPREJfVVJJIGVudmlyb25tZW50IHZhcmlhYmxlIGluc2lkZSAuZW52LmxvY2FsXCJcbiAgKTtcbn1cblxuLyoqXG4gKiBHbG9iYWwgaXMgdXNlZCBoZXJlIHRvIG1haW50YWluIGEgY2FjaGVkIGNvbm5lY3Rpb24gYWNyb3NzIGhvdCByZWxvYWRzXG4gKiBpbiBkZXZlbG9wbWVudCBhbmQgc2VydmVybGVzcyBpbnZvY2F0aW9ucyBpbiBwcm9kdWN0aW9uLlxuICovXG5sZXQgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlO1xuXG5pZiAoIWNhY2hlZCkge1xuICBjYWNoZWQgPSBnbG9iYWwubW9uZ29vc2UgPSB7IGNvbm46IG51bGwsIHByb21pc2U6IG51bGwgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3RUb0RhdGFiYXNlKCkge1xuICBpZiAoY2FjaGVkLmNvbm4pIHtcbiAgICByZXR1cm4gY2FjaGVkLmNvbm47XG4gIH1cblxuICBpZiAoIWNhY2hlZC5wcm9taXNlKSB7XG4gICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgIGJ1ZmZlckNvbW1hbmRzOiBmYWxzZSxcbiAgICAgIG1heFBvb2xTaXplOiAxMCxcbiAgICAgIHNlcnZlclNlbGVjdGlvblRpbWVvdXRNUzogNTAwMCxcbiAgICAgIHNvY2tldFRpbWVvdXRNUzogNDUwMDAsXG4gICAgfTtcblxuICAgIGNhY2hlZC5wcm9taXNlID0gbW9uZ29vc2UuY29ubmVjdChNT05HT0RCX1VSSSwgb3B0cykudGhlbigobW9uZ29vc2VJbnN0YW5jZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJNb25nb0RCIGNvbm5lY3RlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICByZXR1cm4gbW9uZ29vc2VJbnN0YW5jZTtcbiAgICB9KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY2FjaGVkLmNvbm4gPSBhd2FpdCBjYWNoZWQucHJvbWlzZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZC5wcm9taXNlID0gbnVsbDtcbiAgICB0aHJvdyBlO1xuICB9XG5cbiAgcmV0dXJuIGNhY2hlZC5jb25uO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0VG9EYXRhYmFzZTtcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIk1PTkdPREJfVVJJIiwicHJvY2VzcyIsImVudiIsIkVycm9yIiwiY2FjaGVkIiwiZ2xvYmFsIiwiY29ubiIsInByb21pc2UiLCJjb25uZWN0VG9EYXRhYmFzZSIsIm9wdHMiLCJidWZmZXJDb21tYW5kcyIsIm1heFBvb2xTaXplIiwic2VydmVyU2VsZWN0aW9uVGltZW91dE1TIiwic29ja2V0VGltZW91dE1TIiwiY29ubmVjdCIsInRoZW4iLCJtb25nb29zZUluc3RhbmNlIiwiY29uc29sZSIsImxvZyIsImUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.js\n");

/***/ }),

/***/ "(rsc)/./lib/razorpay.js":
/*!*************************!*\
  !*** ./lib/razorpay.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var razorpay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! razorpay */ \"(rsc)/./node_modules/razorpay/dist/razorpay.js\");\n/* harmony import */ var razorpay__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(razorpay__WEBPACK_IMPORTED_MODULE_0__);\n\nconst razorpay = new (razorpay__WEBPACK_IMPORTED_MODULE_0___default())({\n    key_id: \"rzp_test_TQsiWoDT3leCLG\" || 0,\n    key_secret: process.env.RAZORPAY_KEY_SECRET || \"dummy_secret\"\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (razorpay);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcmF6b3JwYXkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLFdBQVcsSUFBSUQsaURBQVFBLENBQUM7SUFDNUJFLFFBQVFDLHlCQUF1QyxJQUFJLENBQVc7SUFDOURHLFlBQVlILFFBQVFDLEdBQUcsQ0FBQ0csbUJBQW1CLElBQUk7QUFDakQ7QUFFQSxpRUFBZU4sUUFBUUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2dhbWVycy1wb3J0Ly4vbGliL3Jhem9ycGF5LmpzP2I0NDMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJhem9ycGF5IGZyb20gXCJyYXpvcnBheVwiO1xuXG5jb25zdCByYXpvcnBheSA9IG5ldyBSYXpvcnBheSh7XG4gIGtleV9pZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfUkFaT1JQQVlfS0VZX0lEIHx8IFwiZHVtbXlfa2V5XCIsXG4gIGtleV9zZWNyZXQ6IHByb2Nlc3MuZW52LlJBWk9SUEFZX0tFWV9TRUNSRVQgfHwgXCJkdW1teV9zZWNyZXRcIixcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByYXpvcnBheTtcbiJdLCJuYW1lcyI6WyJSYXpvcnBheSIsInJhem9ycGF5Iiwia2V5X2lkIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1JBWk9SUEFZX0tFWV9JRCIsImtleV9zZWNyZXQiLCJSQVpPUlBBWV9LRVlfU0VDUkVUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/razorpay.js\n");

/***/ }),

/***/ "(rsc)/./models/Booking.js":
/*!***************************!*\
  !*** ./models/Booking.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst BookingSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    stationId: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.ObjectId,\n        ref: \"Station\",\n        required: [\n            true,\n            \"Station reference is required\"\n        ]\n    },\n    userEmail: {\n        type: String,\n        required: [\n            true,\n            \"User email is required\"\n        ],\n        trim: true,\n        lowercase: true\n    },\n    userName: {\n        type: String,\n        required: [\n            true,\n            \"User name is required\"\n        ],\n        trim: true\n    },\n    userPhone: {\n        type: String,\n        required: [\n            true,\n            \"Phone number is required\"\n        ],\n        trim: true\n    },\n    bookingDate: {\n        type: String,\n        required: [\n            true,\n            \"Booking date (YYYY-MM-DD) is required\"\n        ],\n        index: true\n    },\n    startTime: {\n        type: String,\n        required: [\n            true,\n            \"Start time is required\"\n        ]\n    },\n    endTime: {\n        type: String,\n        required: [\n            true,\n            \"End time is required\"\n        ]\n    },\n    durationHours: {\n        type: Number,\n        enum: [\n            1,\n            2\n        ],\n        required: true,\n        default: 1\n    },\n    totalAmount: {\n        type: Number,\n        required: true,\n        min: 0\n    },\n    status: {\n        type: String,\n        enum: [\n            \"PENDING\",\n            \"CONFIRMED\",\n            \"CANCELLED\",\n            \"EXPIRED\"\n        ],\n        default: \"PENDING\",\n        index: true\n    },\n    // Anti-Double-Booking 10-minute temporary lock timestamp\n    lockExpiresAt: {\n        type: Date,\n        required: true,\n        index: {\n            expires: 0\n        }\n    },\n    // Payment Gateway Tracking\n    razorpayOrderId: {\n        type: String,\n        default: null\n    },\n    razorpayPaymentId: {\n        type: String,\n        default: null\n    },\n    razorpaySignature: {\n        type: String,\n        default: null\n    }\n}, {\n    timestamps: true\n});\n// Compound index to speed up availability queries: station + date + status\nBookingSchema.index({\n    stationId: 1,\n    bookingDate: 1,\n    status: 1\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Booking || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Booking\", BookingSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvQm9va2luZy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFaEMsTUFBTUMsZ0JBQWdCLElBQUlELHdEQUFlLENBQ3ZDO0lBQ0VHLFdBQVc7UUFDVEMsTUFBTUosd0RBQWUsQ0FBQ0ssS0FBSyxDQUFDQyxRQUFRO1FBQ3BDQyxLQUFLO1FBQ0xDLFVBQVU7WUFBQztZQUFNO1NBQWdDO0lBQ25EO0lBQ0FDLFdBQVc7UUFDVEwsTUFBTU07UUFDTkYsVUFBVTtZQUFDO1lBQU07U0FBeUI7UUFDMUNHLE1BQU07UUFDTkMsV0FBVztJQUNiO0lBQ0FDLFVBQVU7UUFDUlQsTUFBTU07UUFDTkYsVUFBVTtZQUFDO1lBQU07U0FBd0I7UUFDekNHLE1BQU07SUFDUjtJQUNBRyxXQUFXO1FBQ1RWLE1BQU1NO1FBQ05GLFVBQVU7WUFBQztZQUFNO1NBQTJCO1FBQzVDRyxNQUFNO0lBQ1I7SUFDQUksYUFBYTtRQUNYWCxNQUFNTTtRQUNORixVQUFVO1lBQUM7WUFBTTtTQUF3QztRQUN6RFEsT0FBTztJQUNUO0lBQ0FDLFdBQVc7UUFDVGIsTUFBTU07UUFDTkYsVUFBVTtZQUFDO1lBQU07U0FBeUI7SUFDNUM7SUFDQVUsU0FBUztRQUNQZCxNQUFNTTtRQUNORixVQUFVO1lBQUM7WUFBTTtTQUF1QjtJQUMxQztJQUNBVyxlQUFlO1FBQ2JmLE1BQU1nQjtRQUNOQyxNQUFNO1lBQUM7WUFBRztTQUFFO1FBQ1piLFVBQVU7UUFDVmMsU0FBUztJQUNYO0lBQ0FDLGFBQWE7UUFDWG5CLE1BQU1nQjtRQUNOWixVQUFVO1FBQ1ZnQixLQUFLO0lBQ1A7SUFDQUMsUUFBUTtRQUNOckIsTUFBTU07UUFDTlcsTUFBTTtZQUFDO1lBQVc7WUFBYTtZQUFhO1NBQVU7UUFDdERDLFNBQVM7UUFDVE4sT0FBTztJQUNUO0lBQ0EseURBQXlEO0lBQ3pEVSxlQUFlO1FBQ2J0QixNQUFNdUI7UUFDTm5CLFVBQVU7UUFDVlEsT0FBTztZQUFFWSxTQUFTO1FBQUU7SUFDdEI7SUFDQSwyQkFBMkI7SUFDM0JDLGlCQUFpQjtRQUNmekIsTUFBTU07UUFDTlksU0FBUztJQUNYO0lBQ0FRLG1CQUFtQjtRQUNqQjFCLE1BQU1NO1FBQ05ZLFNBQVM7SUFDWDtJQUNBUyxtQkFBbUI7UUFDakIzQixNQUFNTTtRQUNOWSxTQUFTO0lBQ1g7QUFDRixHQUNBO0lBQ0VVLFlBQVk7QUFDZDtBQUdGLDJFQUEyRTtBQUMzRS9CLGNBQWNlLEtBQUssQ0FBQztJQUFFYixXQUFXO0lBQUdZLGFBQWE7SUFBR1UsUUFBUTtBQUFFO0FBRTlELGlFQUFlekIsd0RBQWUsQ0FBQ2tDLE9BQU8sSUFBSWxDLHFEQUFjLENBQUMsV0FBV0MsY0FBY0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2dhbWVycy1wb3J0Ly4vbW9kZWxzL0Jvb2tpbmcuanM/MjEyYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XG5cbmNvbnN0IEJvb2tpbmdTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKFxuICB7XG4gICAgc3RhdGlvbklkOiB7XG4gICAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXG4gICAgICByZWY6IFwiU3RhdGlvblwiLFxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCBcIlN0YXRpb24gcmVmZXJlbmNlIGlzIHJlcXVpcmVkXCJdLFxuICAgIH0sXG4gICAgdXNlckVtYWlsOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogW3RydWUsIFwiVXNlciBlbWFpbCBpcyByZXF1aXJlZFwiXSxcbiAgICAgIHRyaW06IHRydWUsXG4gICAgICBsb3dlcmNhc2U6IHRydWUsXG4gICAgfSxcbiAgICB1c2VyTmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCBcIlVzZXIgbmFtZSBpcyByZXF1aXJlZFwiXSxcbiAgICAgIHRyaW06IHRydWUsXG4gICAgfSxcbiAgICB1c2VyUGhvbmU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgXCJQaG9uZSBudW1iZXIgaXMgcmVxdWlyZWRcIl0sXG4gICAgICB0cmltOiB0cnVlLFxuICAgIH0sXG4gICAgYm9va2luZ0RhdGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZywgLy8gU3RvcmVkIGFzIElTTyBkYXRlIHN0cmluZyBcIllZWVktTU0tRERcIiBmb3Igc3RyaWN0IGRhdGUgbWF0Y2hpbmdcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgXCJCb29raW5nIGRhdGUgKFlZWVktTU0tREQpIGlzIHJlcXVpcmVkXCJdLFxuICAgICAgaW5kZXg6IHRydWUsXG4gICAgfSxcbiAgICBzdGFydFRpbWU6IHtcbiAgICAgIHR5cGU6IFN0cmluZywgLy8gMjQtaHIgZm9ybWF0IFwiSEg6MDBcIiwgZS5nLiwgXCIxNDowMFwiXG4gICAgICByZXF1aXJlZDogW3RydWUsIFwiU3RhcnQgdGltZSBpcyByZXF1aXJlZFwiXSxcbiAgICB9LFxuICAgIGVuZFRpbWU6IHtcbiAgICAgIHR5cGU6IFN0cmluZywgLy8gMjQtaHIgZm9ybWF0IFwiSEg6MDBcIiwgZS5nLiwgXCIxNjowMFwiXG4gICAgICByZXF1aXJlZDogW3RydWUsIFwiRW5kIHRpbWUgaXMgcmVxdWlyZWRcIl0sXG4gICAgfSxcbiAgICBkdXJhdGlvbkhvdXJzOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBlbnVtOiBbMSwgMl0sXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIGRlZmF1bHQ6IDEsXG4gICAgfSxcbiAgICB0b3RhbEFtb3VudDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBtaW46IDAsXG4gICAgfSxcbiAgICBzdGF0dXM6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGVudW06IFtcIlBFTkRJTkdcIiwgXCJDT05GSVJNRURcIiwgXCJDQU5DRUxMRURcIiwgXCJFWFBJUkVEXCJdLFxuICAgICAgZGVmYXVsdDogXCJQRU5ESU5HXCIsXG4gICAgICBpbmRleDogdHJ1ZSxcbiAgICB9LFxuICAgIC8vIEFudGktRG91YmxlLUJvb2tpbmcgMTAtbWludXRlIHRlbXBvcmFyeSBsb2NrIHRpbWVzdGFtcFxuICAgIGxvY2tFeHBpcmVzQXQ6IHtcbiAgICAgIHR5cGU6IERhdGUsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIGluZGV4OiB7IGV4cGlyZXM6IDAgfSwgLy8gVFRMIGluZGV4IGF1dG9tYXRpY2FsbHkgZXhwaXJlcyBkb2N1bWVudHMgd2hlbiBsb2NrRXhwaXJlc0F0IGlzIHJlYWNoZWRcbiAgICB9LFxuICAgIC8vIFBheW1lbnQgR2F0ZXdheSBUcmFja2luZ1xuICAgIHJhem9ycGF5T3JkZXJJZDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICB9LFxuICAgIHJhem9ycGF5UGF5bWVudElkOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgIH0sXG4gICAgcmF6b3JwYXlTaWduYXR1cmU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHRpbWVzdGFtcHM6IHRydWUsXG4gIH1cbik7XG5cbi8vIENvbXBvdW5kIGluZGV4IHRvIHNwZWVkIHVwIGF2YWlsYWJpbGl0eSBxdWVyaWVzOiBzdGF0aW9uICsgZGF0ZSArIHN0YXR1c1xuQm9va2luZ1NjaGVtYS5pbmRleCh7IHN0YXRpb25JZDogMSwgYm9va2luZ0RhdGU6IDEsIHN0YXR1czogMSB9KTtcblxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWxzLkJvb2tpbmcgfHwgbW9uZ29vc2UubW9kZWwoXCJCb29raW5nXCIsIEJvb2tpbmdTY2hlbWEpO1xuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiQm9va2luZ1NjaGVtYSIsIlNjaGVtYSIsInN0YXRpb25JZCIsInR5cGUiLCJUeXBlcyIsIk9iamVjdElkIiwicmVmIiwicmVxdWlyZWQiLCJ1c2VyRW1haWwiLCJTdHJpbmciLCJ0cmltIiwibG93ZXJjYXNlIiwidXNlck5hbWUiLCJ1c2VyUGhvbmUiLCJib29raW5nRGF0ZSIsImluZGV4Iiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImR1cmF0aW9uSG91cnMiLCJOdW1iZXIiLCJlbnVtIiwiZGVmYXVsdCIsInRvdGFsQW1vdW50IiwibWluIiwic3RhdHVzIiwibG9ja0V4cGlyZXNBdCIsIkRhdGUiLCJleHBpcmVzIiwicmF6b3JwYXlPcmRlcklkIiwicmF6b3JwYXlQYXltZW50SWQiLCJyYXpvcnBheVNpZ25hdHVyZSIsInRpbWVzdGFtcHMiLCJtb2RlbHMiLCJCb29raW5nIiwibW9kZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./models/Booking.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/razorpay","vendor-chunks/asynckit","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/call-bind-apply-helpers","vendor-chunks/debug","vendor-chunks/https-proxy-agent","vendor-chunks/get-proto","vendor-chunks/mime-db","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/function-bind","vendor-chunks/form-data","vendor-chunks/follow-redirects","vendor-chunks/agent-base","vendor-chunks/axios","vendor-chunks/supports-color","vendor-chunks/ms","vendor-chunks/mime-types","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/has-flag","vendor-chunks/get-intrinsic","vendor-chunks/es-set-tostringtag","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/dunder-proto","vendor-chunks/delayed-stream","vendor-chunks/combined-stream"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcreate-order%2Froute&page=%2Fapi%2Fcreate-order%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcreate-order%2Froute.js&appDir=D%3A%5CLooper%5CWeb%5CGamers_port%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CLooper%5CWeb%5CGamers_port&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();