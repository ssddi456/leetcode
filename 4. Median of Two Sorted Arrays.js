/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */


//
// 依次检查
//
//
var findMedianSortedArrays = function(nums1, nums2) {
    
    var len_1 = nums1.length;
    var len_2 = nums2.length;
    var total_len = len_1 + len_2;

    if( total_len === 0 ){
        return;
    }
    var find_mid = function ( arr ){
        var len = arr.length;
        var mid1 = Math.floor(len/2);
        if( len%2 === 0 ){
            return (arr[mid1-1] + arr[mid1]) /2;
        } else {
            return arr[mid1];
        }
    }
    
    if( len_1 === 0 ){
        return find_mid(nums2);
    } else if(len_2 === 0){
        return find_mid(nums1);
    }

    var mid1 = Math.floor(total_len/2);
    var need_div = total_len%2 === 0;
    if( need_div ){
        mid1 -= 1;
    }
    var mid2 = mid1+1;
    var i = 0;
    var j = 0;
    var count = 0;
    var cur, pre, num1, num2;

// console.log( mid1, mid2, need_div );

    if( nums1[i] < nums2[j] ){
        cur = nums1[i];
        i ++;
    } else {
        cur = nums2[j];
        j ++;
    }

    for(; i < len_1; ){
        num1 = nums1[i];
        if( count === mid1 && !need_div ){
            return cur;
        }
        if( count === mid2 && need_div ){
            return (cur + pre) /2
        }
        if( j >= len_2 ){
            pre = cur;
            cur = nums1[i];
            i++;
            count ++;
        }

        for(; j < len_2; ){
            if( count === mid1 && !need_div ){
                return cur;
            }
            if( count === mid2 && need_div ){
                return (cur + pre) /2
            }
            pre = cur;
            num2 = nums2[j];

            if( num1 > cur ){
                if( num2 > num1 ){
                    cur = num1;
                    count ++;
                    i++;
                    break;
                } else if( num2 >= cur ){
                    cur = num2;
                    j ++;
                    count ++;
                } else {
                    cur = num1;
                    count ++;
                    i++;
                    break;
                }
            } else if( num1 == cur ){
                cur = num1;
                count ++;
                i++;
                break;   
            } else if( num2 > cur ){
                cur = num2;
                j ++;
                count ++;
            }
        }
    }

    for(; j < len_2; j++){
        if( count === mid1 && !need_div ){
            return cur;
        }
        if( count === mid2 && need_div ){
            return (cur + pre) /2
        }
        pre = cur;
        cur = nums2[j];
        count ++;
    }

    if( count === mid1 && !need_div ){
        return cur;
    }
    if( count === mid2 && need_div ){
        return (cur + pre) /2;
    }


};


[
    [[[1, 3],[2]], 2],
    [[[1,2], [3,4]], 2.5],
    [[[3,4,6,8,9], []], 6],
    [[[],[2,3]], 2.5],
    [[[1,2], [1,2]], 1.5],
    [[[1], [1]], 1],
    [[[1,2], [1,1]], 1]
].forEach(function( args, idx ) {
    console.log(idx, args[0], findMedianSortedArrays.apply(null, args[0]), args[1] );
});


