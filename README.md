# pdeEngine


A simple solver of the heat/diffusion equation and wave equation meant for driving visualizations not for performing exacting scientific analysis. The forward Euler step is employed for simplicity and speed, as well as further simplifying the discrete equations with the convolution operator.

It solves the pde on an nxm square grid with n and m being defined by the `setResolution` method.

## How to use

```javascript
io = require('socket.io').listen(6543)
engine = require('pdeEngine')
field = engine( {
    dt: 0.1
  , gamma: 0.02
  , eqn: "wave"
  })
field.setResolution(80, 100)

io.sockets.on('connection', function (socket) {

  socket.on('addSource', function(data) {
    field.addSource(data.row, data.col)
  })

})

setInterval( function () {

  var coeffs = field.update( {
      dt: 0.1
    , eqn: "diffusion"
    , alpha: 0.5
    })

  // Render coeffs //

} , 50 )
```

Of course you can employ any means of adding sources.


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
