const utils = require('../test/utils');
const assert = require('chai').assert;
const path = require('path');
const directoryPath = path.join(__dirname,'/../');
describe('Splitter tests',async function() {
  var path_events;
  var path_events2;
  var count_files_before;
  var filename;
  before(async function(){
    count_files_before = await utils.get_count_of_files();
    path_events = await utils.get_path_events();
    path_events2 = await utils.get_path_events2();
    });
    it('Check two files created',async function() {
      filename ="large_1M_events.log"
      await utils.create_file_with_content(utils.get_data_from_file(filename))
      await utils.run_target();
      await utils.run_target2();
      await utils.run_splitter();
      await utils.sleep(1000);
      await utils.run_agent();
      await utils.sleep(1000);
      await assert.equal(utils.get_count_of_files()-count_files_before, 2);
    });
    it('Check no files created',async function() {
      filename ="empty.log"
      await utils.create_file_with_content(utils.get_data_from_file(filename))
      await utils.run_target();
      await utils.run_target2();
      await utils.run_splitter();
      await utils.sleep(1000);
      await utils.run_agent();
      await utils.sleep(1000);
      await assert.equal(count_files_before-utils.get_count_of_files(), 0);
    });
    it('Check one file created',async function() {
      filename ="oneLine.log"
      await utils.create_file_with_content(utils.get_data_from_file(filename))
      await utils.run_target();
      await utils.run_target2();
      await utils.run_splitter();
      await utils.sleep(1000);
      await utils.run_agent();
      await utils.sleep(1000);
      await assert.equal(utils.get_count_of_files()-count_files_before, 1);
    });
    afterEach(async function(){
      await utils.delete_file(path_events);
      await utils.delete_file(path_events2);
    });
    after(async function(){
      await utils.create_file_with_content(utils.get_data_from_file("large_1M_events.log"))
      await utils.run_killall_node();
    });
});
