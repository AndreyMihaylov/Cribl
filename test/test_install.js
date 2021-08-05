const utils = require('../test/utils');
const assert = require('chai').assert;

describe('Splitter tests',async function() {

  it('Ports is available to start services',async function() {
    utils.port_usage_False(utils.get_path_port_target())
    utils.port_usage_False(utils.get_path_port_target2())
    utils.port_usage_False(utils.get_path_port_splitter())
  });

  it('Target Port is busy to start services',async function() {
    await utils.run_target();
    utils.port_usage_True(utils.get_path_port_target());
  });

  it('Target2 Port is busy to start services',async function() {
    await utils.run_target2();
    utils.port_usage_True(utils.get_path_port_target2());
  });

  it('Splitter Port is busy to start services',async function() {
      await utils.run_splitter();
      utils.port_usage_True(utils.get_path_port_splitter());
  });

  after(async function(){
      await utils.run_killall_node();
  });
});
