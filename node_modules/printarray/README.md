# printArray

A quick implementation to visualize arrays for prototyping and development. Right now it works only for 1D and 2D arrays.

## How to use

The API is simple, just `aprint(array, numOfDigits, [shapex, shapey])`.
Leaving out [shapex, shapey] will print 1D row vectors if array is 1D or
2D arrays if array is 2D. Default number of digits is 5 if `numOfDigits` is left out.

```javascript

var aprint = require('../printArray')

//////////////////////////////////////////////////
var ex = "Example 1: Vectors printed as vector"
var dum = [2, 3, 4, 5, 6, 7, 7, 8, 9, 10 ,11, 12].map(Math.sqrt)
show(ex)
aprint(dum)
//////////////////////////////////////////////////
var digits = 8
ex = "Example 2: 1D array printed as nxm array"
show(ex)
aprint(dum, digits, [4, 3])
//////////////////////////////////////////////////
ex = "Example 3: 1D array printed as mxn array"
show(ex)
aprint(dum, digits, [3, 4])
//////////////////////////////////////////////////
ex = "Example 4: 2D array printed as 2D array"
digits = 4
var dum2 = [
  [1, 2, 3, 4, 5, 6]
, [2, 3, 4, 5, 6, 7]
, [3, 4, 5, 6, 7, 8]
, [4, 5, 6, 7, 8, 9]
]
show(ex)
aprint(dum2, digits)
//////////////////////////////////////////////////
ex = "Example 5: 2D array printed row-wise as 1D row vector"
show(ex)
aprint(dum2, digits, [24, 1])
//////////////////////////////////////////////////
ex = "Example 6: 2D array printed as column vector"
show(ex)
aprint(dum2, digits, [1, 24])
//////////////////////////////////////////////////
ex = "Example 7: 2D array broadcast into different shape"
show(ex)
aprint(dum2, digits, [6, 4])
//////////////////////////////////////////////////
ex = "Example 8: Default handling of negative numbers with extra spacing"
dum2 = map2(dum2, Math.cos)
show(ex)
aprint(dum2, digits, [6, 4])
//////////////////////////////////////////////////
ex = "Example 9: 2D array broadcast as wrong dimensions"
show(ex)
try {
  aprint(dum2, digits, [3, 7])
  } catch (err) {
    console.log('Error: wrong dimensions')
  }

// Helper funcs //////////////////////////////////
function show(ex) {
  console.log("----------------------")
  console.log(ex)
  console.log()
}

function map2(array2D, func) {
  var i, result = []
  for(i = 0; i < array2D.length; i++)
    result[i] = array2D[i].map(func)
  return result
}

```
which outputs
```bash

----------------------
Example 1: Vectors printed as vector

1.414 1.732 2.000 2.236 2.449 2.645 2.645 2.828 3.000 3.162 3.316 3.464
----------------------
Example 2: 1D array printed as nxm array

1.414213 1.732050 2.000000
2.236068 2.449489 2.645751
2.645751 2.828427 3.000000
3.162277 3.316624 3.464101
----------------------
Example 3: 1D array printed as mxn array

1.414213 1.732050 2.000000 2.236068
2.449489 2.645751 2.645751 2.828427
3.000000 3.162277 3.316624 3.464101
----------------------
Example 4: 2D array printed as 2D array

1.00 2.00 3.00 4.00 5.00 6.00
2.00 3.00 4.00 5.00 6.00 7.00
3.00 4.00 5.00 6.00 7.00 8.00
4.00 5.00 6.00 7.00 8.00 9.00
----------------------
Example 5: 2D array printed row-wise as 1D row vector

1.00
2.00
3.00
4.00
5.00
6.00
2.00
3.00
4.00
5.00
6.00
7.00
3.00
4.00
5.00
6.00
7.00
8.00
4.00
5.00
6.00
7.00
8.00
9.00
----------------------
Example 6: 2D array printed as column vector

1.00 2.00 3.00 4.00 5.00 6.00 2.00 3.00 4.00 5.00 6.00 7.00 3.00 4.00 5.00 6.00 7.00 8.00 4.00 5.00 6.00 7.00 8.00 9.00
----------------------
Example 7: 2D array broadcast into different shape

1.00 2.00 3.00 4.00
5.00 6.00 2.00 3.00
4.00 5.00 6.00 7.00
3.00 4.00 5.00 6.00
7.00 8.00 4.00 5.00
6.00 7.00 8.00 9.00
----------------------
Example 8: Default handling of negative numbers with extra spacing

 0.54 -0.41 -0.98 -0.65
 0.28  0.96 -0.41 -0.98
-0.65  0.28  0.96  0.75
-0.98 -0.65  0.28  0.96
 0.75 -0.14 -0.65  0.28
 0.96  0.75 -0.14 -0.91
----------------------
Example 9: 2D array broadcast as wrong dimensions

Error: wrong dimensions


```

### License
#### MIT
Copyright (C) <year> <copyright holders>

>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
