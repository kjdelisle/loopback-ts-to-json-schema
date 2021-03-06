// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: schema-test
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

const nodeMajorVersion = +process.versions.node.split('.')[0];
const dist = nodeMajorVersion >= 7 ? './dist' : './dist6';

const application = (module.exports = require(dist));

if (require.main === module) {
  // Run the application
  application.main();
}
