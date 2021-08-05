const fs = require('fs')
const readline = require('readline');
const shell = require('shelljs')
const {spawn} = require("child_process");
const lineReader = require('line-reader');
const tcpPortUsed = require('tcp-port-used');
const assert = require('chai').assert;

function count_lines(path){
  fileBuffer = fs.readFileSync(path);
  to_string = fileBuffer.toString();
  split_lines = to_string.split("\n");
  let linesCount = split_lines.length-1;
  return linesCount;
}

function count_lines_events_base(){
  return count_lines(get_path_events_base())
}

function count_lines_events(){
  return count_lines(get_path_events())
}

function count_lines_events2(){
  return count_lines(get_path_events2())
}

function get_path_events_base(){
  var json
  json = JSON.parse(fs.readFileSync("agent/inputs.json"));
  return "agent/" + json.monitor;
}

function get_path_events(){
  var json
  json = JSON.parse(fs.readFileSync("target/outputs.json"));
  return json.file;
}

function get_path_events2(){
  var json
  json = JSON.parse(fs.readFileSync("target2/outputs.json"));
  return json.file;
}

function get_path_port_target(){
  var json
  json = JSON.parse(fs.readFileSync("target/inputs.json"));
  return json.tcp;
}

function get_path_port_target2(){
  var json
  json = JSON.parse(fs.readFileSync("target2/inputs.json"));
  return json.tcp;
}

function get_path_port_splitter(){
  var json
  json = JSON.parse(fs.readFileSync("splitter/inputs.json"));
  return json.tcp;
}

function delete_file(path){
  try {
    fs.unlinkSync(path)
  } catch(err) {
  }
}

function run_target(){
  const target =  spawn("node", ["app.js","target"])
  target.on('close', (msg) =>{
    console.log('Target is terminated '+msg.toString());
  })
}

function run_target2(){
  const target2 =  spawn("node", ["app.js","target2"])
  target2.on('close', (msg) =>{
    console.log('Target2 is terminated '+msg.toString());
  })
}

function run_splitter(){
  const splitter =  spawn("node", ["app.js", "splitter"])
  splitter.on('close', (msg) =>{
    console.log('Splitter is terminated '+msg.toString());
  })
}

function run_agent(){
  const agent =  spawn("node", ["app.js", "agent"])
  agent.on('close', (msg) =>{
    console.log('Agent is terminated '+msg.toString());
  })
}

function run_killall_node(){
  const killall =  spawn("killall", ["node"]);
  killall.on('close', (msg) =>{
    console.log('Killall is terminated '+msg.toString());
  })
}

function file_to_set(file){
  var lines = file.split('\n').filter(Boolean);
  var set = new Set();
  for (line in lines){
    let size = set.size
    set.add(line)
    if (size==set.size){
      console.log(line);
    }
  }
  // var set = new Set(lines);
  return set;
}

function get_count_of_files(){
  const path = require('path');
  const directoryPath = path.join(__dirname,'/../');
  return length = fs.readdirSync(directoryPath).length;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function port_usage_True(port){
  let w = tcpPortUsed.check(port, '127.0.0.1')
    .then(function(inUse) {
      assert.isTrue(inUse);
    }, function(err) {
      console.error('Error on check:', err.message);
});
}

function port_usage_False(port){
  let w = tcpPortUsed.check(port, '127.0.0.1')
    .then(function(inUse) {
      assert.isFalse(inUse);
    }, function(err) {
      console.error('Error on check:', err.message);
});
}

function create_file_with_content(content){
  var parant_dir = __dirname +"/../";
  fs.writeFile(parant_dir + "agent/inputs/large_1M_events.log", content, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
}

function get_data_from_file(filename){
  var data = fs.readFileSync(__dirname + "/data/" + filename);
  return data;
}

module.exports  = {
  count_lines,
  count_lines_events_base,
  count_lines_events,
  count_lines_events2,
  get_path_events_base,
  get_path_events,
  get_path_events2,
  file_to_set,
  run_target,
  run_target2,
  run_splitter,
  run_agent,
  run_killall_node,
  delete_file,
  get_count_of_files,
  sleep,
  port_usage_True,
  port_usage_False,
  get_path_port_target,
  get_path_port_target2,
  get_path_port_splitter,
  create_file_with_content,
  get_data_from_file

}
