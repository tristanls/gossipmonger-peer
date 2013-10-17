/*

updateWithDelta.js - gossipmongerPeer.updateWithDelta(key, value, version) test

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

test['updateWithDelta() inserts the value for specified key, and assigns that '
    + 'version to the key-value pair if maxVersionSeen is less than given'
    + 'version, also sets maxVersionSeen to inserted value'] = function (test) {
    test.expect(2);
    var peer = new GossipmongerPeer("id");
    peer.updateWithDelta('foo', 'bar', 15);
    test.deepEqual(peer.data.foo, ['bar', 15]);
    test.equal(peer.maxVersionSeen, 15);
    test.done();
};

test['updateWithDelta() returns the key if update happened'] = function (test) {
    test.expect(2);
    var peer = new GossipmongerPeer("id");
    var key = peer.updateWithDelta('foo', 'bar', 15);
    test.equal(key, 'foo');
    test.equal(peer.maxVersionSeen, 15);
    test.done();
};

test['updateWithDelta() does not update if update is less than maxVersion seen'
    + ' so far'] = function (test) {
    test.expect(2);
    var peer = new GossipmongerPeer("id", {
        data: {
            foo: ['bar', 2]
        },
        maxVersionSeen: 2
    });
    peer.updateWithDelta('foo', 'bar', 1);
    test.deepEqual(peer.data.foo, ['bar', 2]);
    test.equal(peer.maxVersionSeen, 2);
    test.done();
};

test['updateWithDelta() returns null if update did not happen'] = function (test) {
    test.expect(3);
    var peer = new GossipmongerPeer("id", {
        data: {
            foo: ['bar', 2]
        },
        maxVersionSeen: 2
    });
    var key = peer.updateWithDelta('foo', 'bar', 1);
    test.strictEqual(key, null);
    test.deepEqual(peer.data.foo, ['bar', 2]);
    test.equal(peer.maxVersionSeen, 2);
    test.done();
};