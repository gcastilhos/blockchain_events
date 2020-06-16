/**
 * Simple Server
 */
"use strict";

(function() {
    var http = require('http');
    var url = require('url');
    var fs = require('fs');
    var path = require('path');
    var port = "8080";
    const ROOT = "/";
    const FILE_NAME = "events.html";
    const JS_FILE = "/js/";
    const MAIN_CSS = "/css/main.css";
    const DATA = "/data";
    const CATEGORIZATION = "/categorization";
    const EVT_CATEG_FILE = "event_categorization.html";

    var noPageFound = function(res) {
        res.writeHead(404, {"Content-Type": "text/html", "charset": "UTF-8"});
        res.write("Page not found");
    };

    var pageFound = function(res, contentType, data) {
        res.writeHead(200, {"Content-Type": contentType, "charset": "UTF-8"});
        res.write(data);
    };

    var handleRequest = function(res, contentType, err, data) {
       if (err !== null) {
            console.log("No page found: " + err);
            noPageFound(res);
        } else {
            pageFound(res, contentType, data);
        }
        res.end();
    };

    http.createServer((req, res) => {
        if (req.url === ROOT || req.url.startsWith("/?batch=")) {
            fs.readFile(path.normalize(FILE_NAME), function(err, data) {
                handleRequest(res, "text/html", err, data);
            });
        } else if (req.url == CATEGORIZATION) {
            fs.readFile(path.normalize(EVT_CATEG_FILE), function(err, data) {
                handleRequest(res, "text/html", err, data);
            });
         } else if (req.url.includes(JS_FILE)) {
            fs.readFile(path.normalize("." + req.url), function(err, data) {
                handleRequest(res, "application/javascript", err, data);
            });
        } else if (req.url.includes(MAIN_CSS)) {
            fs.readFile(path.normalize("." + MAIN_CSS), function(err, data) {
                handleRequest(res, "text/css", err, data);
            })
        } else if (req.url.includes(DATA)) {
            console.log('Data path: ' + req.url);
            var q = url.parse(req.url, true).query;
            var batch = q.batch !== undefined ? q.batch : 1;
            console.log('Batch #: ' + batch);
            var fileName = ""
            if (req.url.includes("/data/records_")) {
                fileName = "./" + req.url;
            } else {
                fileName = "./data/records_" + batch + ".json";
            }
            fs.readFile(path.normalize(fileName), function(err, data) {
                handleRequest(res, "application/json", err, data);
            });
        } else {
            handleRequest(res, "text/html", req.url, null);
        }
    }).listen(port);
    console.log("Server initiated at port " + port);
})()

