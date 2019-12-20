/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {readFileSync, writeFileSync} from 'fs';
import {TSMap} from 'typescript-map';
import * as ts from 'typescript';

const fileName = __dirname + '../../../node_modules/@types/react/index.d.ts';

// Parse react type definitions
const sourceFile = ts.createSourceFile(
  fileName,
  readFileSync(fileName).toString(),
  ts.ScriptTarget.ES2015,
  /*setParentNodes */ true
);

// Store attributes by interface
const interfaces = new TSMap<string, TSMap<string, string>>();
// Store all interfaces by name
const interfaceDeclarationsMap = new TSMap<string, ts.InterfaceDeclaration>();
// Extract all attributes per interface
extractAttributeTypes(sourceFile);
// Copy attributes from anchestors to flatten the heritance hierarchy
flattenHeritance();
// Write type to attribute mapping as JSON to be able to process it later
writeFileSync(__dirname + '/intrinsic-elements.json', JSON.stringify(interfaces, null, 2), 'utf-8');

function extractAttributeTypes(node: ts.Node) {
  switch (node.kind) {
    case ts.SyntaxKind.InterfaceDeclaration:
      extractAttributeTypesFromInterfaceDeclaration(node as ts.InterfaceDeclaration);
  }
  ts.forEachChild(node, extractAttributeTypes);
}

function extractAttributeTypesFromInterfaceDeclaration(
  interfaceDeclaration: ts.InterfaceDeclaration
) {
  // Only look at attribute interface declarations
  if (!interfaceDeclaration.name.escapedText.toString().endsWith('Attributes')) {
    return;
  }
  // Create an attribute name to type string mapping
  const attributeMap = new TSMap<string, string>();
  const interfaceName = interfaceDeclaration.name.escapedText.toString();
  interfaces.set(interfaceName, attributeMap);
  // Visit all attributes
  interfaceDeclaration.members.forEach(m => {
    switch (m.kind) {
      case ts.SyntaxKind.PropertySignature:
        extractAttributeType(m as ts.PropertySignature, attributeMap);
    }
  });
  // Save interface declaration for being able to flatten the heritance hirarchy later
  interfaceDeclarationsMap.set(interfaceName, interfaceDeclaration);
}

function extractAttributeType(
  propDeclaration: ts.PropertySignature,
  attributeMap: TSMap<string, string>
) {
  if (propDeclaration.type) {
    attributeMap.set(
      (propDeclaration.name as ts.Identifier).text.toString(),
      propDeclaration.type.getFullText()
    );
  }
}

function flattenHeritance() {
  interfaceDeclarationsMap.values().forEach(interfaceDeclaration => {
    const attributeMap = interfaces.get(interfaceDeclaration.name.escapedText.toString());
    flattenHeritanceForInterface(interfaceDeclaration, attributeMap);
  });
}

function flattenHeritanceForInterface(
  interfaceDeclaration: ts.InterfaceDeclaration,
  attributeMap: TSMap<string, string>
) {
  if (interfaceDeclaration.heritageClauses) {
    interfaceDeclaration.heritageClauses.forEach(clause => {
      clause.types.forEach(t => {
        const parentName = t.expression
          .getFullText()
          .toString()
          .trim();
        const parent = interfaces.get(parentName);

        if (parent) {
          parent.entries().forEach(([key, value]) => {
            attributeMap.set(key, value);
          });
        }
        const parentInterfaceDeclaration = interfaceDeclarationsMap.get(parentName);
        if (parentInterfaceDeclaration)
          flattenHeritanceForInterface(parentInterfaceDeclaration, attributeMap);
      });
    });
  }
}
