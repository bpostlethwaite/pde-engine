/*  printArray
 *
 * A small utility for printing 1D and 2D arrays
 * to the browser or terminal.
 *
 * Ben Postlethwaite 2012
 * benpostlethwaite.ca
 */



module.exports = function printArray (arr, digits, dimxy) {

  var i, j, k, c
    , rows = arr.length
    , cols = arr[0].length
    , negs = false

  // If no cols, we have a row vect
  if (cols === undefined) {
    cols = rows
    rows = 1
  }

  if (dimxy) {
    rows = dimxy[0]
    cols = dimxy[1]
  }

  // Flatten array for indexing and multi-processing
  arr = flatten(arr)

  if (rows * cols !== arr.length)
    throw new Error("xlen * ylen !== arr.length")

  if(!digits)
    digits = 5

  // Default look for negative numbers
  for(i = 0; i < arr.length; i++) {
    if(arr[i] < 0) {
      negs = true
      digits++
      break
    }
  }

  for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      c = arr[i * cols + j]
      if(negs)
        c = (c > 0 ? ' ': '') + c.toPrecision(digits).toString()
      else
        c = c.toPrecision(digits).toString()
      if (c.length > digits)
        c = c.slice(0, digits)
      if (c.length <= digits)
        for(k = c.length; k < digits + 1; k++)
          c += " "
      process.stdout.write( c )
    }
    process.stdout.write("\n")
  }


  function flatten(array){
    var flat = [];
    for (var i = 0, l = array.length; i < l; i++){
      var type = Object.prototype.toString.call(array[i]).split(' ').pop().split(']').shift().toLowerCase();
      if (type) { flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? flatten(array[i]) : array[i]); }
    }
    return flat;
  }
}