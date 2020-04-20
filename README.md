# civic-info-elections-query-api
is an example Mocha and Chai automated test of theGoogle Civic Information Elections API

## Installation
Prerequisites
You need Nodejs npm/npx Installed to be able to run this project on your machine.

```bash
git clone git@https://github.com:corey-bailey/civic-info-elections-query-api.git
```
```bash
npm install
```
## Run Tests


```bash
npx mocha
```


## Expected Output

```shell
 _____ _           _   _                ___  ______ _____   _____         _   
|  ___| |         | | (_)              / _ \ | ___ \_   _| |_   _|       | |  
| |__ | | ___  ___| |_ _  ___  _ __   / /_\ \| |_/ / | |     | | ___  ___| |_ 
|  __|| |/ _ \/ __| __| |/ _ \| '_ \  |  _  ||  __/  | |     | |/ _ \/ __| __|
| |___| |  __/ (__| |_| | (_) | | | | | | | || |    _| |_    | |  __/\__ \ |_ 
\____/|_|\___|\___|\__|_|\___/|_| |_| \_| |_/\_|    \___/    \_/\___||___/\__|                                                                    



  civic-info-api
    elections
      elections positive tests
        ✓ validate civicinfo response contract (409ms)
        ✓ validate election id (381ms)
        ✓ validate election name (370ms)
        ✓ validate election day (369ms)
        ✓ validate election ocd division id (377ms)
        elections negative tests
          ✓ elections bad api key (368ms)


  6 passing (2s)
  
```

## License
[MIT](https://choosealicense.com/licenses/mit/)