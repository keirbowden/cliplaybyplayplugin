import {core, flags, SfdxCommand} from '@salesforce/command';
import {AnyJson} from '@salesforce/ts-types';

// Initialize Messages with the current plugin directory
core.Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = core.Messages.loadMessages('pbp_plugin', 'pbp');

export default class Version extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx pbp:version --targetusername myOrg@example.com
    Updated the version information in the Salesforce org
    `
  ];

  public static args = [];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    setting: flags.string({char: 's', description: messages.getMessage('settingFlagDescription')}),
    field: flags.string({char: 'f', description: messages.getMessage('fieldFlagDescription')})
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    const settingName=this.flags.setting || 'PBP_Version__c';
    const commitIdField=this.flags.field || 'Commit_Id__c';

    const conn = this.org.getConnection();
    const orgId=this.org.getOrgId();

    const query = 'Select Id, SetupOwnerId, ' + commitIdField + ' from ' + settingName + ' where SetupOwnerId = \'' + orgId + '\'';

    interface Setting{
      Id? : string,
      SetupOwnerId : string,
      [key: string] : string
    }

    this.ux.log('Querying the custom setting ...');

    // Query the setting to see if we need to insert or update
    const result = await conn.query<Setting>(query);

    let settingInstance : Setting;
    settingInstance={"SetupOwnerId": orgId};

    if (result.records && result.records.length > 0) {
      settingInstance.Id=result.records[0].Id
    }
    
    this.ux.log('Query complete');

    const util=require('util');
    const exec=util.promisify(require('child_process').exec);

    const gitResult = await exec('git rev-parse HEAD');

    const commitId=gitResult.stdout.trim();
        
    settingInstance[commitIdField]=commitId;

    this.ux.log('Writing the new commit information');

    let opResult;
    if (settingInstance.Id) {
      opResult=await conn.sobject(settingName).update(settingInstance);
    }
    else {
      opResult=await conn.sobject(settingName).insert(settingInstance);
    }

    this.ux.log('Write complete');

    if (!opResult.success) {
      this.ux.log('Error updating commit id' + JSON.stringify(opResult.errors));
    }
    else {
      this.ux.log('Updated the version information in the Salesforce org');
    }
    
    // Return an object to be displayed with --json

    return { orgId: this.org.getOrgId(), commitId: commitId, success: opResult.success, errors: opResult.errors };
  }
}
