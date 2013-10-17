/*

updateLocal.js - gossipmongerPeer.updateLocal(key, value) test

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

test['updateLocal() inserts the value for specified key, increments '
    + 'maxVersionSeen, and assigns that version to the key-value pair'] = function (test) {
    test.expect(2);
    var peer = new GossipmongerPeer("id");
    peer.updateLocal('foo', 'bar');
    test.deepEqual(peer.data.foo, ['bar', 1]);
    test.equal(peer.maxVersionSeen, 1);
    test.done();
};

test['updateLocal() returns the key if maxVersionSeen has been incremented'] = function (test) {
    test.expect(2);
    var peer = new GossipmongerPeer("id");
    var key = peer.updateLocal('foo', 'bar');
    test.equal(key, 'foo');
    test.equal(peer.maxVersionSeen, 1);
    test.done();
};

test['updateLocal() does not update version if inserted value is "deepEqual" to'
    + ' the value already stored'] = function (test) {
    test.expect(2);
    var peer = new GossipmongerPeer("id", {
        data: {
            foo: ['bar', 2]
        },
        maxVersionSeen: 2
    });
    peer.updateLocal('foo', 'bar');
    test.deepEqual(peer.data.foo, ['bar', 2]);
    test.equal(peer.maxVersionSeen, 2);
    test.done();
};

test['updateLocal() returns null if maxVersionSeen has not been incremented'] = function (test) {
    test.expect(3);
    var peer = new GossipmongerPeer("id", {
        data: {
            foo: ['bar', 2]
        },
        maxVersionSeen: 2
    });
    var key = peer.updateLocal('foo', 'bar');
    test.strictEqual(key, null);
    test.deepEqual(peer.data.foo, ['bar', 2]);
    test.equal(peer.maxVersionSeen, 2);
    test.done();
};