/*  pde-engine
 *
 * A PDE solver for the wave and diffusion equations.
 *
 * Ben Postlethwaite 2012
 * benpostlethwaite.ca
 */

var engine = require('../pde-engine')
  , aprint = require('printarray')
  , wave = engine( {
    dt: 0.1
  , gamma: 0.02
  , eqn: "wave"
  })


var dims = {
  x: 12
, y: 12
}

wave.setResolution(dims.x, dims.y)

var src = {
  x: 3
, y: 5
, mag: 1
}

wave.addSource(src.x, src.y, src.mag)


setInterval( function () {

  var field = wave.update()
  //
  // Render coeffs //
  //

  aprint(field, 5, [dims.x, dims.y])
  console.log()

} , 1000 )
