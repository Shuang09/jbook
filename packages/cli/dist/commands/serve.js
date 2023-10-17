"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path = require("path");
const commander_1 = require("commander");
const local_api_1 = require("local-api");
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action((filename = 'notebook.js', options) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    (0, local_api_1.serve)(parseInt(options.port), path.basename(filename), dir);
});
