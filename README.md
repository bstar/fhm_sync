# FHM SYNC

Tool for syncing online FHM league files.  Tool will connect to remote FTP and copy files to local save game.

## Commands

```
$ npm start
// runs script locally

$ npm run build
// outputs all system builds to ./builds

```

### fhm_sync_config.json
Config file needs to be stored in the users **home** directory.

```
{
    "host": "localhost",
    "username": "bob",
    "password": "xxxxx",
    "source": "/server/source",
    "dest": "/local/destination"
}

```

### Encryption
It's recommended to use encrypted username/password/host values in the fhm_sync_config.json.
To generate encrypted values, set a secret in `secret.json` (see the example file included).  Then run the `encrypt` script to generate the encrypted username/password/host values.

```
npm run encrypt
```
Simply transfer the values of the output from this script into the fhm_sync_config values.