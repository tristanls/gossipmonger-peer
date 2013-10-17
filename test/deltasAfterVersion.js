/*

deltasAfterVersion.js - gossipmongerPeer.deltasAfterVersion(version) test

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

test['deltasAfterVersion() returns empty array if no data'] = function (test) {
    test.expect(1);
    var peer = new GossipmongerPeer("id");
    test.deepEqual(peer.deltasAfterVersion(0), []);
    test.done();
};

test['deltasAfterVersion() returns empty array if version greater than one stored locally'] = function (test) {
    test.expect(1);
    var peer = new GossipmongerPeer("id", {
        data: {
            'foo': ['bar', 3]
        }
    });
    test.deepEqual(peer.deltasAfterVersion(4), []);
    test.done();
};

test['deltasAfterVersion() returns array of [key, value, version] arrays'] = function (test) {
    test.expect(1);
    var peer = new GossipmongerPeer("id", {
        data: {
            'foo': ['bar', 3],
            'baz': ['buz', 2]
        }
    });
    test.deepEqual(peer.deltasAfterVersion(1), [['foo', 'bar', 3],['baz', 'buz', 2]]);
    test.done();
};


test['deltasAfterVersion() returns array of [key, value, version] arrays '
    + 'excluding data with older versions than specified'] = function (test) {
    test.expect(1);
    var peer = new GossipmongerPeer("id", {
        data: {
            'foo': ['bar', 3],
            'baz': ['buz', 2]
        }
    });
    test.deepEqual(peer.deltasAfterVersion(2), [['foo', 'bar', 3]]);
    test.done();
};