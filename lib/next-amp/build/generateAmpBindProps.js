module.exports = (config, amp) => {
  const bindAttrs = Array.from(
    new Set(amp.tags.map(tag => tag.bindAttrs.map(a => `${a.name}?: string`)).flat()).values()
  );
  return `${config.lincenseHeader}

  import * as React from 'react';

  type AmpBindProps = {
    children: React.ReactElement;
    ${bindAttrs.join(';\n')}
  };
  export default AmpBindProps;
`;
};
