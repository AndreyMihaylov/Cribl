const utils = require('../test/utils');
const assert = require('chai').assert;
const fs = require('fs');
describe('Splitter tests',async function() {
  var path_events_base;
  var path_events;
  var path_events2;
  var events_base;
  var events;
  var events2;
  before(async function(){
    await utils.run_target();
    await utils.run_target2();
    await utils.run_splitter();
    await utils.sleep(1000);
    await utils.run_agent();
    await utils.sleep(1000);
  });
  beforeEach(async function(){
    path_events_base = await utils.get_path_events_base();
    path_events = await utils.get_path_events();
    path_events2 = await utils.get_path_events2();
    try {
        events_base = fs.readFileSync(path_events_base, 'utf8');
        events = fs.readFileSync(path_events, 'utf8');
        events2 = fs.readFileSync(path_events2, 'utf8');
        events.readline
    } catch (err) {
        console.error(err)
      }
  });
  it('Total lines count of targets logs has to be the same as lines count of agent log',async function() {
    await assert.equal(utils.count_lines_events_base(), utils.count_lines_events() + utils.count_lines_events2());
  });
  it('Check duplicate in agent log file ',async function() {
    await assert.equal(utils.count_lines_events_base(), utils.file_to_set(events_base).size);
  });
  it('Check duplicate in target log file',async function() {
    await assert.equal(utils.count_lines_events(), utils.file_to_set(events).size);
  });
  it('Check duplicate in target2 log file',async function() {
    await assert.equal(utils.count_lines_events2(), utils.file_to_set(events2).size);
  });
  after(async function(){
    await utils.delete_file(path_events);
    await utils.delete_file(path_events2);
    await utils.run_killall_node();
  });
});
