/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function(num) {
    str = num.toString(2).split('');
    var ret = '';
    var chr;
    for(var i = 0, len = str.length;i<len;i++ ){
      chr = str[i];
      if( chr == '0' && ret.length == 0){

      } else {
        if( chr === '0' ){
          ret += '1';
        } else {
          ret += '0'
        }
      }
    }
    if( !ret.length ){
      return 0;
    }
    return parseInt(ret, 2);
};


[
    [ [5] , 2 ],
    [ [1] , 0 ],
].forEach(function( args, idx ) {
    console.log(idx, args[0], findComplement.apply(null, args[0]), args[1] );
});