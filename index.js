'use strict';

const fs = require('file-system');
const Client = require('ssh2-sftp-client');
const config = JSON.parse(fs.readFileSync(`${process.cwd()}/fhm_sync_config.json`).toString());
// const config = require('./config.json')
const client = new Client();

async function main() {

  try {
    await client.connect(config);
    client.on('download', info => {
      console.log(`-- download ${info.source}`);
    });
    return await client.downloadDir(config.source, config.dest);
  } finally {
    client.end();
  }
}
  
main()
  .then(msg => {
    console.log(msg);
  })
  .catch(err => {
    console.log(`error: ${err.message}`);
  });