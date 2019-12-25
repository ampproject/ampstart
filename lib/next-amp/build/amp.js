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

const validatorRules = require('@ampproject/toolbox-validator-rules');

const {toCamelCase} = require('./strings');
const AMP_BIND_ATTR_PREFIX = 'data-amp-bind-';

class Amp {
  constructor() {
    this.extensions_ = new Map();
    this.tags_ = new Map();
    this.ampTags_ = new Map();
  }

  addExtension(extension) {
    this.extensions_.set(extension.name, extension);
  }

  addAmpTag(tag) {
    this.ampTags_.set(tag.name, tag);
  }

  addTag(tag) {
    this.tags_.set(tag.name, tag);
  }

  get extensions() {
    return Array.from(this.extensions_.values());
  }

  get tags() {
    return Array.from(this.tags_.values());
  }

  get ampTags() {
    return Array.from(this.ampTags_.values());
  }

  getAmpTagByName(name) {
    return this.ampTags_.get(name);
  }

  getExtensionByName(name) {
    return this.extensions_.get(name);
  }
}

async function loadAmp() {
  const rules = await validatorRules.fetch();
  const amp = new Amp();
  addExtensions(amp, rules);
  addTags(amp, rules);
  return amp;
}

function addExtensions(amp, rules) {
  for (const extension of rules.extensions.filter(extension =>
    extension.htmlFormat.includes('AMP')
  )) {
    amp.addExtension({
      name: extension.name,
      camelCase: toCamelCase(extension.name),
      extensionType: 'CUSTOM_TEMPLATE',
      version: extension.version[extension.version.length - 2],
    });
  }
}

function transformAttribute(attr, isAmpTag, tag) {
  let name = attr.name;
  attr.requiresExtension = attr.requiresExtension || [];
  // JSX can't handle '[attr]' => use data-amp-bind-attr syntax instead
  if (name.startsWith('[')) {
    name = 'data-amp-bind-' + name.substring(1, name.length - 1);
  }
  // amp-lightbox-gallery is currently not listed as a required extension for the lightbox attribute
  if (name === 'lightbox') {
    attr.requiresExtension.push('amp-lightbox-gallery');
  }
  const result = [
    {
      name,
      global: attr.global,
      value: attr.value,
      // Treat all attributes as non-mandatory
      mandatory: false,
      requiresExtension: attr.requiresExtension,
    },
  ];
  // Duplicate attributes with alternative names
  // e.g. amp-img src => srcset
  if (attr.alternativeNames) {
    attr.alternativeNames.forEach(alt => {
      const altAttr = Object.assign({}, result[0]);
      altAttr.name = alt;
      result.push({
        altAttr,
      });
    });
  }
  return result;
}

function addTags(amp, rules) {
  //const tags = rules.getTagsForFormat('AMP');
  const tags = rules.tags;
  // Merge attributes of tags defined multiple times
  const mergedTags = new Map();
  for (const tag of tags) {
    const existingTag = mergedTags.get(tag.tagName);
    if (existingTag) {
      tag.attrs.forEach(newAttr => {
        if (!existingTag.attrs.some(existingAttr => existingAttr.name === newAttr.name)) {
          existingTag.attrs.push(newAttr);
        }
      });
    } else {
      mergedTags.set(tag.tagName, tag);
    }
  }
  // Transform tags
  for (const tag of mergedTags.values()) {
    // Create a new component abstraction optimized for type code generation
    const component = {
      name: tag.tagName.toLowerCase(),
      camelCase: toCamelCase(tag.tagName.substring(4)),
      requiresExtension: tag.requiresExtension || [],
      isAmpTag: tag.tagName.startsWith('AMP-'),
    };
    // Explicity import amp-video to avoid warning
    if (component.name === 'amp-video') {
      component.requiresExtension.push('amp-video');
    }
    // Transform attributes for JSX usage
    if (tag.attrs.length > 0) {
      component.attrs = transformAttributes(tag, component.isAmpTag);
      component.bindAttrs = transformBindAttributes(component.attrs);
    }
    if (tag.ampLayout) {
      component.supportedLayouts = tag.ampLayout.supportedLayouts;
    }
    if (component.isAmpTag) {
      amp.addAmpTag(component);
    } else if (/^[a-zA-Z]+$/.test(tag.tagName)) {
      amp.addTag(component);
    }
  }
}

function transformAttributes(tag, isAmpTag) {
  const attrs = tag.attrs;
  let transformedAttributes = [];
  for (const a of attrs) {
    transformedAttributes = transformedAttributes.concat(transformAttribute(a, isAmpTag, tag));
  }
  // dedup attributes
  const names = new Set();
  const uniqueAttrs = [];
  for (const a of transformedAttributes) {
    if (!names.has(a.name)) {
      uniqueAttrs.push(a);
      names.add(a.name);
    }
  }
  return uniqueAttrs;
}

function transformBindAttributes(attrs) {
  const bindAttrs = [];
  attrs.forEach(attr => {
    if (!attr.name || !attr.name.startsWith(AMP_BIND_ATTR_PREFIX)) {
      return;
    }
    let name = attr.name.replace(AMP_BIND_ATTR_PREFIX, '');
    if (name.includes('-')) {
      return;
    }
    name = `bind${toCamelCase(name)}`;
    bindAttrs.push(
      Object.assign({}, attr, {
        name,
        originalName: attr.name,
      })
    );
  });
  return bindAttrs;
}

module.exports = loadAmp;
