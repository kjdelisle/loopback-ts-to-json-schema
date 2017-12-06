import * as TJS from 'typescript-json-schema';
import * as path from 'path';
import * as util from 'util';
import * as fs from 'fs-extra';
import * as _ from 'lodash';
import {resolve} from 'path';

const readdirSync = require('readdir-enhanced').readdirSync;

function main(modelPath: string, schemaPath: string) {
  const settings: TJS.PartialArgs = {
    required: true,
    ref: false,
    excludePrivate: true,
  };

  const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: true,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
  };

  const paths = getModelPaths(modelPath);
  console.log(`Paths: ${paths}`);
  const schemaNames = getSchemaNames(paths);
  console.log(`Schema Names: ${schemaNames}`);
  
  const program = TJS.getProgramFromFiles(paths, compilerOptions);

  const generator = TJS.buildGenerator(program, settings);
  if (generator) {
    fs.mkdirpSync(schemaPath); // Ensure the directory exists
    for (const name of schemaNames) {
      const filePath = path.join(schemaPath, `${name}.schema.json`);
      const schemaObject = generator.getSchemaForSymbol(name);
      fs.writeFileSync(
        filePath,
        JSON.stringify(schemaObject, undefined, 2),
        'utf-8',
      );
    }
  }
}

function getModelPaths(modelPath: string): string[] {
  return _(readdirSync(modelPath, {basePath: modelPath})).values<string>().filter((p: string) => {
    return p.endsWith('.ts');
  }).value();
}

function getSchemaNames(paths: string[]) {
  return _(paths).map(p => {
      // Get last part of path
      const fileName = p.substring(p.lastIndexOf('/') + 1, p.length - 1);
      // Get first part of the name
      const name = fileName.substring(0, fileName.indexOf('.'));
      // Ignore any index files (since they're used to export the whole folder)
      const isEq = _.isEqual(name, 'index');
      return isEq ? '' : name;
    }
  ).compact().value();
}

// Could be replaced by some config elements.
const mPath = resolve('dist', 'models');
const sPath = resolve('dist', 'schemas');
main(mPath, sPath);
