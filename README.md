# pdeEngine

## about
A simple solver of the heat/diffusion equation and wave equation meant for driving visualizations not for performing exacting scientific analysis. The forward Euler step is employed for simplicity and speed, as well as further simplifying the discrete equations with the convolution operator.

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

  var coeffs = field.update()

  // Render coeffs //

} , 50 )
```

Of course you can employ any means of adding sources.
