/*  pde-engine
 *
 * A PDE solver for the wave and diffusion equations.
 *
 * Ben Postlethwaite 2012
 * benpostlethwaite.ca
 */

var engine = require('../.')
  , aprint = require('printarray')
  , field = engine( {
    dt: 0.1
  , gamma: 0.02
  , eqn: "wave"        // put "diffusion" here to solve the heat eqn.
  })


var dims = {
  x: 12
, y: 12
}
/*
 * This sets up the dimensions of the field.
 * Everytime setResolution is called the field
 * arrays are reset (new Typed Arrays of given size
 * are created.)
 */
field.setResolution(dims.x, dims.y)

var src = {
  x: 3
, y: 5
, mag: 1
}

/*
 * You can add sources before you begin the timesteps (updates)
 * or during. Note if you begin updating field (progressing in time)
 * before adding a source the field will have no energy and will not
 * evolve (the 2D diffusion of zero is zero).
 */
field.addSource(src.x, src.y, src.mag)

/*
 * Run the wave eqn solver.
 * Do something cool with the
 * coefficients: plot with html5 canvas
 * or gnuplot or whatever, or turn it into
 * animations within a website or video game.
 */
var steps = 5
var tic = setInterval( function () {

  var coeffs = field.update()
  //
  // Render coeffs
  //

  aprint(coeffs, 5, [dims.x, dims.y])
  console.log()
  steps--

  if (steps === 0)
    clearInterval(tic)

} , 1000 )
