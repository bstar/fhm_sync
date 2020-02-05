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