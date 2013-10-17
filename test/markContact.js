/*

markContact.js - gossipmongerPeer.markContact(time) test

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

test['markContact() uses 750 as default interval if no lastTime contact'] = function (test) {
    test.expect(4);
    var peer = new GossipmongerPeer("id", {
        intervals: [250],
        sum: 250
    });
    peer.markContact();
    test.deepEqual(peer.intervals, [250, 750]);
    test.equal(peer.sum, 1000);
    test.equal(peer.intervalsMean, 500);
    test.ok(peer.lastTime);
    test.done();
};

test['markContact() calculates interval using lastTime and time'] = function (test) {
    test.expect(4);
    var now = new Date();
    var peer = new GossipmongerPeer("id", {
        lastTime: now.getTime(),
        intervals: [150],
        sum: 150
    });
    var later = new Date(now.getTime() + 850);
    peer.markContact(later.getTime());
    test.deepEqual(peer.intervals, [150, 850]);
    test.equal(peer.sum, 1000);
    test.equal(peer.intervalsMean, 500);
    test.equal(peer.lastTime, later.getTime());
    test.done();
};

test['markContact() removes old interval if have more than MAX_INTERVALS'] = function (test) {
    test.expect(4);
    var now = new Date();
    var peer = new GossipmongerPeer("id", {
        lastTime: now.getTime(),
        intervals: [100, 100, 100],
        MAX_INTERVALS: 3,
        sum: 300
    });    
    var later = new Date(now.getTime() + 400);
    peer.markContact(later.getTime());
    test.deepEqual(peer.intervals, [100, 100, 400]);
    test.equal(peer.sum, 600);
    test.equal(peer.intervalsMean, 200);
    test.equal(peer.lastTime, later.getTime());
    test.done();
};