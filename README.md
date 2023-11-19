# function-app-concurrency-experiment

Simple proof of concept for Function App using Redlock algorithm ([redlock](https://www.npmjs.com/package/redlock) library) for solving potential concurrency issues in a Service Bus queue trigger function.

## Requirements

- [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-typescript)
- VS Code + [Azure Functions Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
- Azure Service Bus queue
- Redis instance, it can be Azure Cache for Redis

## How to run it

- Create `local.settings.json` file based on `local.settings.example.json`.
- Press F5 in VS Code.
