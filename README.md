# pde-engine

A simple solver of the heat/diffusion equation and wave equation meant for driving visualizations not for performing exacting scientific analysis. The forward Euler step is employed for simplicity and speed, as well as further simplifying the discrete equations with the convolution operator.

It solves the pde on an mxn square grid with m and n being defined by the `setResolution` method.
Note it outputs a vector that must be indexed by `f[i*n + j]` where `0 < i < m` and `0 < j < n`.

Version 0.2.0 uses [Typed Arrays](https://developer.mozilla.org/en-US/docs/JavaScript_typed_arrays) for computational efficiency / speed.

## How to use

```javascript

var engine = require('../pde-engine')
  , aprint = require('printarray')
  , wave = engine( {
    dt: 0.1
  , gamma: 0.02
  , eqn: "wave"  // Specify "diffusion" to use diffusion eqn.
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


```

Of course you can employ any means of adding sources.
The `addSource` method specifies the location of the source at that particular timestep with magnitude `mag`. Right now it emplaces a hard-coded Gaussian source centred at `(row, col)`, with boundary cases already implemented.

## Configuration
The following are possible configuration options. If configs are omitted defaults will be used. The defaults are given after the `||`:
```javascript
{
   dt = spec.dt || 0.1
 , dx = spec.dx || 1
 , gamma = spec.gamma || 0.02   // wave decay factor
 , vel = spec.vel || 2          // wave velocity
 , alpha = spec.alpha || 1      // diffusion paramter
 , eqn = spec.eqn || 'wave'
}
```

## Versioning and updates

This is an early but fully working physics engine. Future releases may optimize algorithms or add new methods/configs, but this basic API should remain stable.

Tests will be coming soon. For now this is primarily a tool for graphics.
See [benpostlethwaite.ca](http://benpostlethwaite.ca) for a working example.

### License MIT
MIT

Copyright (C)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
