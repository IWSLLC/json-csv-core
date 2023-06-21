# @iwsio/json-csv-core
[![Tests CI](https://github.com/IWSLLC/json-csv-core/actions/workflows/test.yaml/badge.svg)](https://github.com/IWSLLC/json-csv-core/actions/workflows/test.yaml)

For more information on [json-csv-core itself, checkout the readme](./core/README.md).

## Dev Setup
Here's how to setup and run the samples locally. 

```bash
# install everything for all workspaces (Recommended: Node 18)
npm i

npm run build -w core

# start the web (and then browse to http://localhost:3000)
npm start -w demo

# run cli advanced sample
npm run cli-advanced -w demo

# run cli simple sample.
npm run cli-simple -w demo

# run tests
npm test -w test-runner
```