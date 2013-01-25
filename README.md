# pde-engine

A simple and surprisingly easy to use partial-differential equation solver of the heat/diffusion equation and wave equation meant for driving visualizations not for performing exacting scientific analysis. The [forward Euler](http://en.wikipedia.org/wiki/Euler_method) step is employed for simplicity and speed, as well as further simplifying the discrete equations with the convolution operator.

It solves the pde on an `mxn` grid with `m` and `n` being set by the `setResolution` method. Each call to `update` increases the solution by a time step given by `dt`. Depending on what the spatial step `dx` is set at is how fast the solution will converge - remember `v = x/t` from highschool. `update` outputs a single column vector that must be indexed by `f[i*n + j]` where `0 < i < m` and `0 < j < n`. The reason `pde-engine` outputs a 2D array strung out as a 1D vector is for computational speed.

Version 0.2.0 uses [Typed Arrays](https://developer.mozilla.org/en-US/docs/JavaScript_typed_arrays) for computational efficiency / speed.

I am using this thing without problems on [my website](http://benpostlethwaite.ca) by matching the output of each `update` step from the solver with a range of color values from [colormap](https://github.com/bpostlethwaite/colormap).

## How to use

```javascript
var engine = require('pde-engine')
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


```

The `addSource` method specifies the location of the source at that particular timestep with magnitude `mag`. Right now it emplaces a hard-coded Gaussian source centred at `(row, col)`, with boundary cases already implemented. Every time field.update

## Configuration
The following are possible configuration options. If configs are omitted defaults will be used. The defaults are given after the `||`:
```javascript
{
      dt = spec.dt || 0.1          // time step
    , dx = spec.dx || 1            // spatial step
    , gamma = spec.gamma || 0.02   // wave or diffusion paramater (controls decay)
    , vel = spec.vel || 2          // wave velocity
    , eqn = spec.eqn || 'wave'     // or "diffusion"
}
```

Note that the forward Euler approach suffers from poor stability. It is a good idea to keep dt < dx , probably by a factor of 0.5. If your solutions are not converging (things go crazy) try modifying these variables.

## Install
```shell
npm install pde-engine
```
then write some code with `engine = require('pde-engine')` in it. If you want it in the browser do a
``` shell
browserify mycode.js -o bundle.js
```
to include it. See [benpostlethwaite.ca](http://benpostlethwaite.ca) for a working example.

## Versioning and updates

This is an early but fully working physics engine. Future releases may optimize algorithms or add new methods/configs, but this basic API should remain stable.

Tests will be coming soon. For now this is primarily a tool for graphics.
