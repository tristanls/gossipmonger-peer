# gossipmonger-peer

_Stability: 1 - [Experimental](https://github.com/tristanls/stability-index#stability-1---experimental)_

[![NPM version](https://badge.fury.io/js/gossipmonger-peer.png)](http://npmjs.org/package/gossipmonger-peer)

GossipmongerPeer is a peer datastructure used by [Gossipmonger](https://github.com/tristanls/gossipmonger), an implementation of the Scuttlebutt gossip protocol endpoint for real-time peer-to-peer peer-state distribution.

## Usage

```javascript
var GossipmongerPeer = require('gossipmonger-peer');
// create local peer
var localPeer = new GossipmongerPeer(localId);

// on finding out about another peer
var otherPeer = new GossipmongerPeer(otherId);

// on making contact with otherPeer
otherPeer.markContact();

// on receiving a delta about otherPeer
otherPeer.updateFromDelta('otherFoo', 'otherBar', 17);

// test liveness criteria of otherPeer
if (otherPeer.phi() > MY_PHI_THRESHOLD) {
    otherPeer.markDead();
}

// on changing some local peer value
localPeer.updateLocal('foo', 'bar');

// the dead rise! (made contact with otherPeer)
otherPeer.markLive();
```

## Tests

    npm test

## Overview

## Documentation

### GossipmongerPeer

**Public API**

  * [GossipmongerPeer.calculateIntervalsSum(intervals)](#gossipmongerpeercalculateintervalssumintervals)
  * [GossipmongerPeer.calculateIntervalsSumEfficiently(sum, newInterval, \[oldInterval\])](#gossipmongerpeercalculateintervalssumefficientlysum-newinterval-oldinterval)
  * [new GossipmongerPeer(id, \[options\])](#new-gossipmongerpeerid-options)
  * [gossipmongerPeer.deltasAfterVersion(version)](#gossipmongerpeerdeltasafterversionversion)
  * [gossipmongerPeer.markContact(time)](#gossipmongerpeermarkcontacttime)
  * [gossipmongerPeer.markDead()](#gossipmongerpeermarkdead)
  * [gossipmongerPeer.markLive()](#gossipmongerpeermarklive)
  * [gossipmongerPeer.phi(\[time\])](#gossipmongerpeerphitime)
  * [gossipmongerPeer.updateLocal(key, value)](#gossipmongerpeerupdatelocalkey-value)
  * [gossipmongerPeer.updateWithDelta(key, value, version)](#gossipmongerpeerupdatewithdeltakey-value-version)

### GossipmongerPeer.calculateIntervalsSum(intervals)

  * `intervals`: _Array_ Intervals to calculate the sum of.
  * Return: _Integer_ Calculated sum.

Iterates through `intervals` to calculate the sum.

### GossipmongerPeer.calculateIntervalsSumEfficiently(sum, newInterval, [oldInterval])

  * `sum`: _Integer_ Current sum.
  * `newInterval`: _Integer_ New interval being added to calculate the mean.
  * `oldInterval`: _Integer_ _(Default: undefined)_ Old interval being removed from being used in calculating the mean.
  * Return: _Integer_ Calculated sum.

Instead of iterating through an array, simply adds `newInterval` to `sum` and substracts `oldInterval` if present.

### new GossipmongerPeer(id, [options])

  * `id`: _String_ Id of the peer.
  * `options`: _Object_
    * `data`: _Object_ _(Default: `{}`)_ Peer data.
    * `intervals`: _Array_ _(Default: [750])_ An array of the last (up to `MAX_INTERVALS`) intervals between times when the peer has been seen. 
    * `intervalsMean`: _Integer_ _(Default: undefined)_ Memoized intervals mean. 
    * `lastTime`: _Integer_ _(Default: undefined)_ The last time the peer has been seen (in milliseconds since midnight Jan 1, 1970).
    * `live`: _Boolean_ _(Default: true)_ Indicator whether or not the peer isthought to be live.
    * `maxVersionSeen`: _Integer_ _(Default: 0)_ Vector clock value indicating the last version of the peer that has been observed.
    * `MAX_INTERVALS`: _Integer_ _(Default: 100)_ The maximum number of intervals to keep in `intervals`.  
    * `sum`: _Integer_ _(Default: undefined)_ Memoized sum of intervals to make intervals mean calculation more efficient.          
    * `transport`: _Any_ Any data identifying this peer to the transport mechanism that is required for correct transport operation.

Creates a new instance of GossipmongerPeer.

### gossipmongerPeer.deltasAfterVersion(version)

  * `version`: _Integer_ Vector clock version to construct deltas for.
  * Return: _Array_ An array of deltas (ex delta: [key, value, version]).

Calculates deltas for this peer since `version`.

### gossipmongerPeer.markContact(time)

  * `time`: _Integer_ _(Default: `new Date().getTime()`)_ The time this peer has been seen (in milliseconds since midnight Jan 1, 1970).

Marks that contact with the peer occurred at `time`. This is used later in phi calculations.

### gossipmongerPeer.markDead()

Sets `live` property to `false`.

### gossipmongerPeer.markLive()

Sets `live` property to `true`.

### gossipmongerPeer.phi([time])

  * `time`: _Integer_ _(Default: `new Date().getTime()`)_ The time to use as "now" in phi calculation (in milliseconds since midnight Jan 1, 1970).
  * Return: _Number_ Calculated phi for this peer.

See [The ϕ Accrual Failure Detector](http://ddg.jaist.ac.jp/pub/HDY+04.pdf).

### gossipmongerPeer.updateLocal(key, value)

  * `key`: _String_ Key to update.
  * `value`: _Any_ The value to update with.
  * Return: _String_ If the key has been updated, the key is returned, otherwise a `null` is returned instead. 

Updates peer data and increments `maxVersionSeen` for the peer on which this is used. Intended for only manipulating data for the local peer.

### gossipmongerPeer.updateWithDelta(key, value, version)

  * `key`: _String_ The key for the value to update.
  * `value`: _Any_ The value to update with.
  * `version`: _Integer_ The vector clock version of this key value pair.
  * Return: _String_ If the key has been updated, the key is returned, otherwise a `null` is returned instead.

Updated peer data and sets `maxVersionSeen` to `version` if the `version` is greater than `maxVersionSeen`. Intended for manipulating data for remote peers cached locally.

## Sources

  * [The ϕ Accrual Failure Detector](http://ddg.jaist.ac.jp/pub/HDY+04.pdf)