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

import {ReactElement, Children, ReactNode} from 'react';

function isScriptTemplate(element: ReactElement): boolean {
  return (
    element.type === 'script' && element.props['type'] === 'text/plain' && element.props['template']
  );
}

function isTemplate(element: ReactElement): boolean {
  return element.type === 'template' && element.props['type'];
}

export function hasTemplate(node?: ReactNode): boolean {
  if (!node) {
    return false;
  }
  const children = Children.toArray(node);
  const elements: ReactElement[] = [];
  for (const child of children) {
    if ((child as ReactElement).type && (child as ReactElement).props) {
      const element = child as ReactElement;
      if (isScriptTemplate(element) || isTemplate(element)) {
        return true;
      }
      elements.push(element);
    }
  }
  for (const element of elements) {
    if (hasTemplate(element.props.children)) {
      return true;
    }
  }
  return false;
}
