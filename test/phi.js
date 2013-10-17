/*

phi.js - gossipmongerPeer.phi(time) test

The MIT License (MIT)

Copyright (c) 2013 Tristan Slominski

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/

"use strict";

var GossipmongerPeer = require('../index.js');

var test = module.exports = {};

test['phi() uses default interval of 750 if no last time'] = function (test) {
    test.expect(1);
    var peer = new GossipmongerPeer("id", {
        intervalsMean: 250
    });
    var exp = -1 * 750 /*currentInterval*/ / 250;
    var p = Math.pow(Math.E, exp);
    var phi = -1 * (Math.log(p) / Math.log(10));
    test.equal(phi, peer.phi());
    test.done();
};

test['phi() uses lastTime and `time` param to calculate current interval'] = function (test) {
    test.expect(1);
    var now = new Date().getTime();
    var lastTime = now - 500;
    var peer = new GossipmongerPeer("id", {
        intervalsMean: 250,
        lastTime: lastTime
    });
    var exp = -1 * 500 /*currentInterval*/ / 250;
    var p = Math.pow(Math.E, exp);
    var phi = -1 * (Math.log(p) / Math.log(10));
    test.equal(phi, peer.phi());
    test.done();
};