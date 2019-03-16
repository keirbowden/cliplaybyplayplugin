pbp_plugin
==========

Example plugin for the Salesforce CLI Play by Play

[![Version](https://img.shields.io/npm/v/pbp_plugin.svg)](https://npmjs.org/package/pbp_plugin)
[![CircleCI](https://circleci.com/gh/keirbowden/pbp_plugin/tree/master.svg?style=shield)](https://circleci.com/gh/keirbowden/pbp_plugin/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/keirbowden/pbp_plugin?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/pbp_plugin/branch/master)
[![Codecov](https://codecov.io/gh/keirbowden/pbp_plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/keirbowden/pbp_plugin)
[![Greenkeeper](https://badges.greenkeeper.io/keirbowden/pbp_plugin.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/keirbowden/pbp_plugin/badge.svg)](https://snyk.io/test/github/keirbowden/pbp_plugin)
[![Downloads/week](https://img.shields.io/npm/dw/pbp_plugin.svg)](https://npmjs.org/package/pbp_plugin)
[![License](https://img.shields.io/npm/l/pbp_plugin.svg)](https://github.com/keirbowden/pbp_plugin/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g pbp_plugin
$ pbp_plugin COMMAND
running command...
$ pbp_plugin (-v|--version|version)
pbp_plugin/0.0.0 darwin-x64 node-v8.15.1
$ pbp_plugin --help [COMMAND]
USAGE
  $ pbp_plugin COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`pbp_plugin <%= command.id %> [-n <string>] [-f] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#pbp_plugin--commandid---n-string--f--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfatal)
* [`pbp_plugin <%= command.id %> [-s <string>] [-f <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#pbp_plugin--commandid---s-string--f-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfatal)

## `pbp_plugin <%= command.id %> [-n <string>] [-f] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

print a greeting and your org IDs

```
USAGE
  $ pbp_plugin hello:org [-n <string>] [-f] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal]

OPTIONS
  -f, --force                                      example boolean flag
  -n, --name=name                                  name to print
  -u, --targetusername=targetusername              username or alias for the target org; overrides default target org
  -v, --targetdevhubusername=targetdevhubusername  username or alias for the dev hub org; overrides default dev hub org
  --apiversion=apiversion                          override the api version used for api requests made by this command
  --json                                           format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)   [default: warn] logging level for this command invocation

EXAMPLES
  $ sfdx hello:org --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
     Hello world! This is org: MyOrg and I will be around until Tue Mar 20 2018!
     My hub org id is: 00Dxx000000001234
  
  $ sfdx hello:org --name myname --targetusername myOrg@example.com
     Hello myname! This is org: MyOrg and I will be around until Tue Mar 20 2018!
```

_See code: [src/commands/hello/org.ts](https://github.com/keirbowden/pbp_plugin/blob/v0.0.0/src/commands/hello/org.ts)_

## `pbp_plugin <%= command.id %> [-s <string>] [-f <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

write the commmit id to a version custom setting

```
USAGE
  $ pbp_plugin pbp:version [-s <string>] [-f <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal]

OPTIONS
  -f, --field=field                               name to field to write commit info to
  -s, --setting=setting                           name of setting to write commit info to
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation

EXAMPLE
  $ sfdx pbp:version --targetusername myOrg@example.com
       Updated the version information in the Salesforce org
```

_See code: [src/commands/pbp/version.ts](https://github.com/keirbowden/pbp_plugin/blob/v0.0.0/src/commands/pbp/version.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
