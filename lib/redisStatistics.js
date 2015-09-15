var Redis = require("ioredis");
var config = require('config');
var redisClient = new Redis(config.get("REDIS"));

/**
 * @see: http://redis.io/topics/twitter-clone
 */

var getTokenFromRequest = function(req, res) {
};

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
 * @param key
 * @param count
 * @returns {boolean}
 */
exports.addCount = function (key, count) {
    //SETNX
    //INCR foo
    return true;
};

/**
 * Adds date to limited sorted set with username.
 * Sorted Sets are similar to Sets: collection of elements. However in Sorted Sets each element is associated with a
 * floating point value, called the element score. Because of the score, elements inside a sorted set are ordered,
 * since we can always compare two elements by score (and if the score happens to be the same, we compare the two
 * elements as strings).
 * Like Sets in Sorted Sets it is not possible to add repeated elements, every element is unique. However it is
 * possible to update an element's score.
 * @param username
 * @returns {boolean}
 */
exports.addVisit = function (username) {
    //ZADD visitors:1000 1401267618 1234 => Add user 1234 with time 1401267618
    return true;
};
