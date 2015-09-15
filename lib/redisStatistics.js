var Redis = require("ioredis");
var config = require('config');
var redisClient = new Redis(config.get("REDIS"));
var moment = require('moment');

/**
 * Adds count to specified event.
 * The essence of a key-value store is the ability to store some data, called a value, inside a key.
 * The value can be retrieved later only if we know the specific key it was stored in. There is no direct way to
 * search for a key by value. In a sense, it is like a very large hash/dictionary, but it is persistent, i.e. when
 * your application ends, the data doesn't go away. So, for example, I can use the command SET to store the value bar
 * in the key foo:
 * Other common operations provided by key-value stores are DEL, to delete a given key and its associated value,
 * SET-if-not-exists (called SETNX on Redis), to assign a value to a key only if the key does not already exist,
 * and INCR, to atomically increment a number stored in a given key:
 * @see: http://redis.io/topics/twitter-clone
 * @param key
 * @param count
 * @returns {boolean}
 */
exports.addCount = function (key, count) {
    redisClient.setnx(key);
    redisClient.incr(key);
    return true;
};

/**
 * Adds date to limited sorted set with username.
 * @see: http://redis.io/topics/twitter-clone
 * @see: http://redis.io/commands/lset
 * @param username
 * @returns {boolean}
 */
exports.addVisit = function (username) {
    redisClient.lpush('visits:' + username, moment().unix());
    return true;
};
