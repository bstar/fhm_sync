'use strict';

const fs = require('file-system');
const readline = require('readline');
const Client = require('ssh2-sftp-client');
const config = JSON.parse(fs.readFileSync(`${process.cwd()}/fhm_sync_config.json`).toString());
const secret = require('./secret.json');
const SimpleCrypto = require('simple-crypto-js').default;
const simpleCrypto = new SimpleCrypto(secret.value);
const client = new Client();
const encrypted = config.encrypted;
const username = encrypted ? simpleCrypto.decrypt(config.username) : config.username;
const password = encrypted ? simpleCrypto.decrypt(config.password) : config.password;
const host = encrypted ? simpleCrypto.decrypt(config.host) : config.host;


async function start() {

  async function getFiles() {

    try {
      await client.connect({ username, password, host });
      client.on('download', info => {
        console.log(`-- download ${info.source}`);
      });
      return await client.downloadDir(config.source, config.dest);
    } finally {
      client.end();
    }
  }
    
  await getFiles()
    .then(msg => { console.log(`-----------\n-- result   ${msg}`) })
    .catch(err => { console.log(`error: ${err.message}`) })

  readline.createInterface(process.stdin, process.stdout)
    .question("\nPress [Enter] to exit...", () => {
      process.exit();
  });
}

start();