/**
 * @param {number[]} nums
 * @return {boolean}
 */
var circularArrayLoop = function(nums) {
    console.log( 'some contents ');
};

var pass = true;
[
  { args : [ 'aa', 'a'  ], expect : false },
].forEach(function( args, idx ) {
  var ret= circularArrayLoop.apply(null, args.args );
  if( ret != args.expect ){
    pass = idx;
  }
  console.log(idx, args.args, ret, args.expect, ret == args.expect );
});

if( pass !== true ){
  console.log( 'failed on', pass);
}