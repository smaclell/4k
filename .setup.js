global.Promise = require('bluebird');
const chai = require('chai');
const promised = require("chai-as-promised");
const sinonChai = require('sinon-chai');

chai.use(promised);
chai.use(sinonChai);

global.expect = chai.expect;
global.rewire = require('rewire');
global.sinon = require('sinon');
