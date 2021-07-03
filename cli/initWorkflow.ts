import fse from 'fs-extra';
import path from 'path';
import username from 'username';

const skeleton = {
  $schema:
    'https://raw.githubusercontent.com/jopemachine/arvis-extension-validator/master/workflow-schema.json',
  creator: '',
  name: '',
  enabled: true,
  description: '',
  platform: [process.platform],
  readme: '',
  version: '0.0.1',
  webAddress: '',
  commands: []
};

export default async (name?: string) => {
  skeleton.name = name ?? path.basename(process.cwd());

  try {
    skeleton.creator = (await username()) ?? '';
  } catch (err) {
    // skip initialize value
  }

  await fse.writeJSON(
    path.resolve(process.cwd(), 'arvis-workflow.json'),
    skeleton,
    {
      encoding: 'utf8',
      spaces: 4
    }
  );
};
