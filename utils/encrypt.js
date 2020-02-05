const secret = require('../secret.json');
const SimpleCrypto = require('simple-crypto-js').default;
const simpleCrypto = new SimpleCrypto(secret.value);
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("FTP Username? ", name => {
    rl.question("FTP Password? ", pw => {
        rl.question("FTP Host? ", host => {

            const username = simpleCrypto.encrypt(name);
            const password = simpleCrypto.encrypt(pw);
            const hostname = simpleCrypto.encrypt(host);

            console.log(`\nUsername: ${name}`);
            console.log(`Encrypted: ${username}\n`);
            console.log(`Password: ${pw}`);
            console.log(`Encrypted: ${password}\n`);
            console.log(`Hostname: ${host}`);
            console.log(`Encrypted: ${hostname}\n`);

            rl.close();
        });
    });
});

rl.on("close", function() {
    console.log("\nFinished.  Use encrypted values in fhm_sync_config.json.");
    process.exit(0);
});