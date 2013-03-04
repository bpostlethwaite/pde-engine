/*
 * Update  test
 *
 * tests update functionality
 * for both modes.
 */

var engine = require("../.")
  , test = require('tape')
  , aprint = require('printarray')
  , ar = require('arraytools')

test('wave equation update', function(t) {
  t.plan(2)
  var wave = engine({
    eqn: 'wave'
  , hres: 5
  , vres: 5
  })
  var field = wave.update()

  t.equal(field.length, 25)

  t.equal(ar.sum(field) , 0)

})



test('diffusion equation update', function(t) {
  t.plan(2)
  var wave = engine({
    eqn: 'diffusion'
  , hres: 5
  , vres: 5
  })
  var field = wave.update()

  t.equal(field.length, 25)

  t.equal(ar.sum(field) , 0)

})
