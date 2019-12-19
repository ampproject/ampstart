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

import * as React from 'react';
import {DetailedHTMLProps, TemplateHTMLAttributes} from 'react';
import {AmpIncludeCustomTemplate} from '../../src-gen/';
import * as ReactDOMServer from 'react-dom/server';
import * as Mustache from 'mustache';

/**
 * Renders an amp-mustache template element.
 */
class AmpMustache extends React.Component<
  DetailedHTMLProps<TemplateHTMLAttributes<HTMLTemplateElement>, HTMLTemplateElement> & {
    context?: any;
  }
> {
  static universal(element: JSX.Element, context: any) {
    return {
      clientSideTemplate: element,
      serverSideTemplate: React.cloneElement(element, context),
    };
  }
  static Section: React.FunctionComponent<SectionProps> = ({children, id, inverted}) => (
    <>
      {`{{${inverted ? '^' : '#'}${id}}}`}
      {children}
      {`{{/${id}}}`}
    </>
  );
  static Variable: React.FunctionComponent<VariableProps> = ({id, unescape}) => (
    <>{`{{${unescape ? '{' : ''}${id}${unescape ? '}' : ''}}}`}</>
  );

  static Comment: React.FunctionComponent<CommentProps> = ({text}) => <>{`{{!${text}}`}</>;

  render() {
    const {children, context, ...rest} = this.props;
    if (context !== undefined) {
      return this.serverSideRender(children, context);
    } else {
      return this.clientSideRender(rest, children);
    }
  }

  private clientSideRender(rest, children) {
    return (
      <>
        <AmpIncludeCustomTemplate name='amp-mustache' />
        <template type='amp-mustache' {...rest}>
          {children}
        </template>
      </>
    );
  }

  private serverSideRender(children, context) {
    const templateString = renderToString(<>{children}</>);
    const html = Mustache.render(templateString, context);
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    );
  }
}

function renderToString(element: JSX.Element) {
  return ReactDOMServer.renderToStaticMarkup(element);
}

type SectionProps = {
  id: string;
  inverted?: boolean;
};
type VariableProps = {
  id: string;
  unescape?: boolean;
};
type CommentProps = {
  text: string;
};

export default AmpMustache;
