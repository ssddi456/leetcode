/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  var len_s = s.length;
  var len_p = p.length;
  var i = 0;
  var j = 0;
  var starIdx = -1;
  var match;

  while( i < len_s ){

    if( j < len_p && (s[i] === p[j] || p[j] === '?') ){
      i ++;
      j ++;
    } else if( j < len_p && p[j] === '*' ){
      starIdx = j;
      match = i;
      j ++;
    } else if( starIdx !== -1 ){
      j = starIdx + 1;
      match ++;
      i = match;
    } else {
      return false;
    }
  }

  while( j < len_p && p[j] === '*' ){
    j++;
  }

  return j == len_p;
};


var pass = true;
[
  { args : [ 'aa', 'a'  ], expect : false },
  { args : [ 'aa', 'aa'  ], expect : true },
  { args : [ 'aaa', 'aa'  ], expect : false },
  { args : [ 'aa', '*'  ], expect : true },
  { args : [ 'aa', 'a*'  ], expect : true },
  { args : [ 'ab', '?*'  ], expect : true },
  { args : [ 'aab', 'c*a*b'  ], expect : false },
  { args : [ 'caab', 'c*a*b'  ], expect : true },
  { args : [ "abefcdgiescdfimde", "ab*cd?i*de"  ], expect : true },
  { args : [ "leetcode", "*e*t?d*"  ], expect : false },
  { args : [ "e", "e*t?d*"  ], expect : false },

  { args : [ "", "*"  ], expect : true },
  { args : [ "", "?"  ], expect : false },
  
  { args : [ "", "?"  ], expect : false },
  
  { args : [ "bcd", "??"  ], expect : false },
  { args : [ "ho", "ho**"  ], expect : true },
  { args : [ "", "**"  ], expect : true },
  { args : [ "bc", "bc**"  ], expect : true },
  { args : [ "asbc", "?***"  ], expect : true },
  { args : [ "babbbbaabababaabbababaababaabbaabababbaaababbababaaaaaabbabaaaabababbabbababbbaaaababbbabbbbbbbbbbaabbb", 
             "b**bb**a**bba*b**a*bbb**aba***babbb*aa****aabb*bbb***a"  ], expect : false },

].forEach(function( args, idx ) {
  var ret= isMatch.apply(null, args.args );
  if( ret != args.expect ){
    pass = idx;
  }
  console.log(idx, args.args, ret, args.expect, ret == args.expect );
});

if( pass !== true ){
  console.log( 'failed on', pass);
}