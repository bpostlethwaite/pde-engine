var pdefunctyped = require('./pde-engine-typed')
var pdefunc = require('../pde-engine')

var aprint = require('../../printArray/printArray.js')

var pdet = pdefunctyped({})
var pde = pdefunc({})

var rows = 50;
var cols = 50;

pde.setResolution(rows, cols)
pde.addSource(2,2,1)


var i, u
console.time('pde');
for(i = 0; i < 50; i++) {
  u = pde.update()
}
console.timeEnd('pde');


pdet.setResolution(rows , cols)
pdet.addSource(2,2,1)
var ut
console.time('pde-typed');
for(i = 0; i < 50; i++) {
  ut = pdet.update()
}
console.timeEnd('pde-typed');

var row, col, ind, norm = 0

for (row = 0; row < rows; ++row) {
  for (col = 0; col < cols; ++col) {
    ind = row * cols + col
    norm += (ut[ind] - u[row][col]) * (ut[ind] - u[row][col])
  }
}

console.log('norm between typed arrays and regular Javascript arrays is:')
console.log(norm)

