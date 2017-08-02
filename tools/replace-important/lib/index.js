/**
 * Copyright 2017 The AMP Start Authors. All Rights Reserved.
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

const csstree = require('css-tree');
const specificity = require('specificity');
let selectorList = [];


function replaceImportant(cssString) {
  const cssVarObj = {};
  var ast = csstree.parse(cssString,
    {
      parseSelector: false,
      parseValue: false
    }
  );
  ast = csstree.toPlainObject(ast);
  processChildren(ast.children);
  ast = csstree.fromPlainObject(ast);
  return csstree.translate(ast)
    .split('~~~~PLACEHOLDER~~~~').join(getPlaceholder());
}

function processChildren(childrenArr) {
  const newRules = [];
  childrenArr.forEach(function(child) {
    if (child.type) {
      if (child.type == "Rule") {
        selectorList = selectorList.concat(child.selector.value.split(','));
        const importantProperties = child.block.children.filter(function(property) {
            return property.important;
        });

        child.block.children = child.block.children.filter(function(property) {
            return !property.important;
        });

        importantProperties.forEach(function(property) {
          property.important = false;
        });

        if (importantProperties.length > 0) {
          var selectorValue = child.selector.value.split(',').map(function(sel) {
            return sel.trim();
          }).join(',~~~~PLACEHOLDER~~~~ ')
          var newRule = {
            "type": "Rule",
            "loc": child.loc,
            "selector": {
              "type": child.selector.type,
              "loc": child.selector.loc,
              "value": "~~~~PLACEHOLDER~~~~ " + selectorValue
            },
            "block": {
              "type": "Block",
              "loc": null,
              "children": importantProperties
            }
          };
          newRules.push(newRule);
        }
      } else {
        if (child.block && child.block.children) {
          processChildren(child.block.children);
        }
      }
    }
  });
  newRules.forEach(function(rule) {
    childrenArr.push(rule);
  });
}

function getPlaceholder() {
  //console.log('Computing placeholder');
  var specificityArr = specificity.calculate(highestSpecificity(selectorList))[0].specificity;
  var placeholder = ":root:not(#FK_ID)";
  //console.log(specificityArr);
  // Example array [0,1,0,1] - details -https://specificity.keegan.st/
  // Ignore specificityArr[0] - iniline styles - These can only be added by
  // AMP Runtime.
  if (specificityArr[1] > 0) {
    for (var i=0; i < specificityArr[1]; i++ ) {
      placeholder += ":not(#FK_ID)"
    }
  }
  if (specificityArr[2] > 0) {
    placeholder += ":not(#FK_ID)"
  }

  if (specificityArr[3] > 0) {
    placeholder += ":not(#FK_ID)"
  }

  //console.log('END Computing placeholder');
  return placeholder;
}


function highestSpecificity() {
  //console.log('Computing highest Specificity');
  try {
    selectorList = selectorList.map(function (selector) {
      return selector.trim();
    });
    selectorList.sort(specificity.compare);
  } catch (e) {
    console.log(e);
  }

  //console.log('END Computing highest Specificity');
  return selectorList[selectorList.length - 1];
}

module.exports = replaceImportant;
