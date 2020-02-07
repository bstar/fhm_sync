'use strict';

const fs = require('file-system');
const ftp = require("basic-ftp");
const readline = require('readline');
const config = JSON.parse(fs.readFileSync(`${process.cwd()}/fhm_sync_config.json`).toString());
const secret = require('./secret.json');
const SimpleCrypto = require('simple-crypto-js').default;
const simpleCrypto = new SimpleCrypto(secret.value);
const encrypted = config.encrypted;
const user = encrypted ? simpleCrypto.decrypt(config.username) : config.username;
const password = encrypted ? simpleCrypto.decrypt(config.password) : config.password;
const host = encrypted ? simpleCrypto.decrypt(config.host) : config.host;

 
getFiles();
 
async function getFiles() {
    const client = new ftp.Client();
    // client.ftp.verbose = true;

    try {
        await client.access({ host, user, password, secure: false });

        client.trackProgress(info => {
          console.log("File", `${info.name} ${info.bytes}/${info.bytesOverall}`);
        })

        await client.downloadToDir(config.dest, config.source);
    }
    catch(err) {
      console.log(err)
    }
    finally {
      readline.createInterface(process.stdin, process.stdout)
        .question("\nFinished.  Press [Enter] to exit...", () => {
          process.exit();
        });
    }

    client.close()
};
