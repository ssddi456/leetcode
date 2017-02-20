/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function(nums) {
    
    var biggest_three = [];

    var add_to_biggest_three = function( num ) {
        if( num >= biggest_three[0] || biggest_three[0] === undefined ){
          if( num == biggest_three[0] ){

          } else {
            biggest_three.unshift(num);
          }
        } else if( num >= biggest_three[1] || biggest_three[1] === undefined ){
          if( num == biggest_three[1] ){

          } else {
            biggest_three.splice(1,0,num);
          }
        } else if( num >= biggest_three[2]  || biggest_three[2] === undefined ){
          if( num == biggest_three[2] ){

          } else {
            biggest_three.splice(2,0,num);
          }
        }

        if( biggest_three.length > 3 ){
          biggest_three.length = 3;
        }
    }

    var get_third_biggest_three = function() {
        if( biggest_three.length == 3 ){
          return biggest_three[2];
        } else {
          return biggest_three[0];
        }
    };

    for( var i = 0, len = nums.length; i < len; i++ ){
      add_to_biggest_three(nums[i]);
    }


    console.log( biggest_three );
    return get_third_biggest_three();

};



[
    [  [[3, 2, 1]] , 1 ],
    [  [[1, 2]] , 2 ],
    [  [[2, 2, 3, 1]], 1 ],
    [  [[5,2,2]], 5 ],
].forEach(function( args, idx ) {
  var ret= thirdMax.apply(null, args[0]);
  console.log(idx, args[0], ret, args[1], ret == args[1] );
});