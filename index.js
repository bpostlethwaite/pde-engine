/*  pde-engine
 *
 * A PDE solver for the wave and diffusion equations.
 *
 * Ben Postlethwaite 2012
 * benpostlethwaite.ca
 *
 * License MIT
 */

module.exports = function pdeEngine(spec) {
  var that = {}
    , spec = spec || {}
    , dt = spec.dt || 0.1          // time step
    , dx = spec.dx || 1            // spatial step
    , gamma = spec.gamma || 0.02   // wave or diffusion paramater (controls decay)
    , vel = spec.vel || 2          // wave velocity
    , eqn = spec.eqn || 'wave'     // or "diffusion"
    , u                            // main data array
    , un                           // next time step data array
    , up                           // previous time step data array
    , uu                           // poisson data array
    , si = []                      // poisson sources x dim
    , sj = []                      // poisson sources y dim
    , width
    , height
    , coeffs = [   // 2d laplace operator
        0,  1,  0
      , 1, -4,  1
      , 0,  1,  0
    ]
  /*
   * 2D Guassian kernel for adding sources
   */
    , gauss = [
      1/256,  4/256,  6/256,  4/256, 1/256
      , 4/256, 16/256, 24/256, 16/256, 4/256
      , 6/256, 24/256, 36/256, 24/256, 6/256
      , 4/256, 16/256, 24/256, 16/256, 4/256
      , 1/256,  4/256,  6/256,  4/256, 1/256
    ]
  /*
   * c1 and c2 are used for the wave eqn coefficients
   * they have influence from gamma (wave decay)
   */
  , c1 = 2 - gamma * dt
  , c2 = gamma * dt - 1
  , c3 = (dt*dt * vel*vel) / (dx*dx)
  , c4 = gamma * dt / (dx * dx)

  /* 
   * Solves the wave equation PDE
   * using convolution.
   */
  function waveUpdate () {
    var row, col, ind
    var dum = conv2(u, coeffs)
     for (row = 0; row < height; ++row)
      for (col = 0; col < width; ++col) {
        ind = row * width + col
        un[ind] = c1 * u[ind] + c2 * up[ind] + c3 * dum[ind]
        up[ind] = u[ind] // current becomes old
        u[ind] = un[ind] // new becomes current
      }
    return u
  }

  /*
   * Solves the diffusion equation PDE
   * using convolution.
   */ 
  function diffusionUpdate () {
    var row, col, ind
    var dum = conv2(u, coeffs)
    for (row = 0; row < height; ++row)
      for (col = 0; col < width; ++col) {
        ind = row * width + col
        un[ind] = u[ind] +  c4 * dum[ind]
        u[ind] = un[ind] // new becomes current
      }
    return u
  }

  /*
   * iterates over image, then over kernel and
   * multiplies the flipped kernel coeffs
   * with appropriate image values, sums them
   * then adds into new array entry.
   */
  function conv2(image, kernel) {
    var out = new Float64Array( height * width  )
    var acc = 0
    , row, col, i, j, k
    for ( row = 0; row < height; row++ ) {
      for ( col = 0; col < width; col++ ) {
        for ( i = -1; i <= 1; i++ ) {
          for ( j = -1; j <= 1; j++ ) {
            if( row+i >= 0 && col+j >= 0 &&
                row+i < height && col+j < width) {
              k = image[ (row + i) * width + (col + j)]
              acc += k * kernel[ (1 + i) * 3 + (1 + j)]
            }
          }
        }
        out[ row * width + col] = acc
        acc = 0
      }
    }
    return out
  }

  /*
   * adds a new gaussian droplet to u
   * at specified coordinates.
   */
  function addSource (row, col, mag) {
    var i, j
    for ( i = -2; i <= 2; i++ ) {
      for ( j = -2; j <= 2; j++ ) {
        if( row + i >= 0 && col + j >= 0 &&
            row + i < height && col + j < width) {
          u[(row + i) * width + (col + j)] += mag * gauss[ (i + 2) * 5 + j + 2]
        }
      }
    }
  }

/*
 * function matches the matrix calculation sizes to
 * reset size by init'ing new matrices.
 */
  function reset() {
    u = new Float64Array( height * width  )
    up = new Float64Array( height * width )
    un = new Float64Array( height * width )
    uu = new Float64Array( height * width )
  }

/*
 * when screen size is resized and upon init
 * this does basic checking then calls reset
 * to modify array sizes.
 */
  function setResolution (hRes, wRes) {
    width = wRes
    height = hRes
    reset()
  }

  if (eqn === 'diffusion') {
    that.update = diffusionUpdate
  }
  else {
    that.update = waveUpdate
  }

  that.setResolution = setResolution
  that.addSource = addSource

  return that
}
