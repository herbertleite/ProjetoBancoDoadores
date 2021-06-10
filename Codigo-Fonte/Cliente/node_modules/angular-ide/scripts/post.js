const fs = require('fs');
const path = require('path');

const customNgPath = path.resolve(process.cwd(), 'bin', 'ng');

fs.chmodSync(customNgPath, '755', (error) => {
  // Do nothing
});
