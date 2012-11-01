var aprint = require('../printarray')

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