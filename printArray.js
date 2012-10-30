/*jshint asi: true*/
/*jshint laxcomma: true*/
"use strict";


module.exports = function printArray (arr, digits, dimxy) {

  var rowlen = arr.length
    , collen = arr[0].length
  if (dimxy) {
    var xlen = dimxy[0]
    var ylen = dimxy[1]
    if (xlen*ylen !== arr.length)
      dimxy = undefined
  }
// If 2D array, print as 2D array
  if(collen) {
    var i, j, k, c
    for (i = 0; i < rowlen; i++) {
      for (j = 0; j < collen; j++) {
        c = arr[i][j].toPrecision(digits).toString()
        if (c.length > digits)
          c = c.slice(0, digits)
        if (c.length <= digits)
          for(k = c.length; k < digits + 1; k++)
            c += " "
        process.stdout.write( c )
      }
      process.stdout.write("\n")
    }
  }
// If 1D array but xy dims make sure
// array length = x*y, then print as 2D array
  else if (dimxy) {
    var i, j, k, c
    for (i = 0; i < xlen; i++) {
      for (j = 0; j < ylen; j++) {
        c = arr[i * ylen + j].toPrecision(digits).toString()
        if (c.length > digits)
          c = c.slice(0, digits)
        if (c.length <= digits)
          for(k = c.length; k < digits + 1; k++)
            c += " "
        process.stdout.write( c )
      }
      process.stdout.write("\n")
    }
  }
  // Else 1D array, print as row vector
  else {
    var i, k, c
    for (i = 0; i < rowlen; i++) {
      c = arr[i].toPrecision(digits).toString()
      if (c.length > digits)
        c = c.slice(0, digits)
      if (c.length <= digits)
        for(k = c.length; k < digits + 1; k++)
          c += " "
      process.stdout.write( c )
      process.stdout.write("\n")
    }
  }
}

