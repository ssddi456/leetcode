/**
 * @param {number} buckets
 * @param {number} minutesToDie
 * @param {number} minutesToTest
 * @return {number}
 */
var poorPigs = function(buckets, minutesToDie, minutesToTest) {
    var set = Math.floor(minutesToTest/minutesToDie) + 1;
    var pigs = 0;
    while( Math.pow(set, pigs) < buckets ){
      pigs ++;
    }

    return pigs;
};




[
    [ [1000, 15, 60] , 2 ],
].forEach(function( args, idx ) {
    console.log(idx, args[0], poorPigs.apply(null, args[0]), args[1] );
});