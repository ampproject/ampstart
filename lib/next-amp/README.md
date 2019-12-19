# AMP Next.js Library

Simplify building AMP pages in Next.js.

# High-level APIs

The high-level APIs provide wrapper components for all AMP extensions, which:

- Take care of **always** importing the necessary AMP extensions. Developers should not have to worry about importing an extension.
- Implement JSX specific workarounds (e.g. for rendering JSON in script tags).
- Reduce syntactic noise (e.g. `<AmpMustache>` instead of `<template type="amp-mustache">`).

The goal is here to make use of Next/React specific features to further simplify AMP APIs.

## Extensions with Tag

For most AMP extensions with a matching tag (e.g. amp-video, amp-youtube,...) the Next.js component wrappers match the original AMP component API 1:1 with the addition that extension scripts will be imported automatically.

### amp-youtube

For example:

```
<AmpYoutube
  data-videoid="mGENRKrdoGY"
  layout="responsive"
  width="480"
  height="270"></AmpYoutube>
```

Will expand to:

```
<head>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
</head>
<body>
  <amp-youtube
      data-videoid="mGENRKrdoGY"
      layout="responsive"
      width="480"
      height="270"></amp-youtube>
</body>
```

Duplicate extension imports are avoided by using the `next/head` component.

### amp-script

For some components we integrate hand-written versions that provide further simplifications. For example, defining inline `amp-script` becomes easier, as no extra `script` element is needed:

```
<AmpScript id="hello-world" layout="container" script="
    const btn = document.querySelector('button');
    btn.addEventListener('click', () => {
      document.body.textContent = 'Hello World!'
    })">
  <button>Hello amp-script!</button>
</AmpScript>
```

Which expands to:

```
<amp-script layout="container" script="hello-world" class="amp-script-sample">
  <button id="hello2">Click!</button>
</amp-script>

<script id="hello-world" type="text/plain" target="amp-script">
  const button = document.querySelector('#hello2');
  button.addEventListener('click', () => {
    document.body.textContent = 'Hello World!'
  });
</script>
```

The `amp-script-src` meta tag will automatically be added by AMP Optimizer.

## Extensions without Tag

Many AMP extensions don’t have a tag associated (amp-form, amp-access, amp-fx-collection,...). We will use different strategies to implement these in Next.js.

### amp-form

AMP has to re-use the `form` tag, In Next.js we can make this more explicit by providing an `AmpForm` component:

```
<AmpForm method='post' action-xhr='/submit' target='_top'>
  <input type='text' name='email' />
  <input type='submit' value='Subscribe' />
</AmpForm>
```

Which expands to:

```
<head>
  <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
</head>
<body>
<form method="post" action-xhr="/submit" target="_top">
  <input type="text" name="email"/>
  <input type="submit" value="Subscribe"/>
</form>
</body>
```

### amp-mustache

The `AmpMustache` component simplifies AMP’s template syntax from `<template type="amp-mustache">` to `AmpMustache` and imports the amp-mustache extension:

```
<AmpList src='/test' layout='fixed-height'>
  <AmpMustache>
    <a href={`{{url}}`}>{`{{ name }}`}</a>
  </AmpMustache>
</AmpList>
```

...and for `amp-access`:

```
<AmpMustache amp-access-template="">
  <a href={`{{url}}`}>{`{{ name }}`}</a>
</AmpMustache>
```

**Alternative approach:** wrap mustache directives in components. This has the positive side-effect of making it possible to render the same template server-side and client-side:

```
<AmpMustache>
  <h1>Seats</h1>
  <Loop id="seats">
    <p><Token id="name"/>
    <If id="disabled">
      Disabled Seat
    </If>
    <IfNot id="disabled">
      Normal Seat
    </IfNot>
    </p>
  </Loop>
</AmpMustache>
```

### amp-access

AMP does not define an `amp-access` tag, but you can use the `AmpAccess` component to configure the JSON config in the head:

```
<AmpAccess>{{
  authorization: "/auth",
  pingback: "/pingback",
  login: "/login",
}}</AmpAccess>

…

<section amp-access="loggedIn">
  This section is only visible if you're logged in. Welcome back!
</section>
```

We will use a similar approach for amp-access-laterpay, amp-access-poool, amp-access-scroll, amp-subscription,...

For example, `amp-access-laterpay` becomes:

```
<AmpAccessLaterpay>{{
  property: "value"
}}</AmpAccessLaterpay>
```

Which expands to:

```
<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "property": value
    }
  }
</script>
```

### amp-fx-collection

There’s not going to be an `AmpFxCollection` component, instead we will automatically add the extension import if any tag includes the `amp-fx` attribute.

```
<AmpImg amp-fx="fade-in" ....></AmpImg>
```

Other options considered:

- Option 1: Explicit component import

  ```
  <AmpIncludeFxCollection />
  <AmpImg amp-fx="fade-in" ....></AmpImg>
  ```

Rejected, as it doesn’t feel like idiomatic React.

- Option 2: Wrapper component

  ```
  <AmpFxCollection>
   <AmpImg amp-fx="fade-in" ....></AmpImg>
  </AmpFxCollection>
  ```

Better than Option 1, but makes things more complicated.

### amp-bind

For `amp-bind` expressions, the `amp-bind` extension is automatically imported using the same approach as for `amp-fx-collection`. The following will work out-of-the-box:

```
<div data-amp-bind-text="hello"/>
<button on="tap:AMP.setState({ "hello": "world" })">
```

State can be initialized via:

```
<AmpState id="myState">{{
  property: "value"
}}</AmpState>
```

### amp-dynamic-css-classes

```
const Page = () => (
  <>
    <AmpDynamicCssClasses />
    <div className='referrer-google-com'>
      Referrer: <code>google.com</code>
    </div>
    <style jsx global>{`
      body:not(.amp-referrer-google-com) .referrer-google-com {
        display: none;
      }
    `}</style>
  </>
);
```

### More extensions

The other AMP extensions without associated tag, will be implemented using similar patterns as described above:

- amp-inputmask
- amp-lightbox-gallery
- amp-video-docking
- amp-inputmask

## JSON in script tags

AMP uses JSON embedded in `<script>` tags in several places. However React returns an error message if a JSON object is specified in the content. For example, the following generates an error:

```
<script type="application/json">{{
  "dog": 3
}}</script>
```

In these cases, JSON strings can be passed in as objects or object literals:

```
<AmpState id="my-state">{{
     price: 23,
     color: "red"
  }}</AmpState>
```

# Low-level API Helpers

The low level API helpers should make it possible to import and use AMP components.

### AMPHTML type definitions

Provide type definitions for all AMPHTML components to avoid compile errors when using typescript. This requires adding type definitions for:

- All AMP tags (e.g. amp-img)
- All AMP-specific standard HTML tag extensions (e.g. `type` attribute for the `template` tag).

This will be generated from the validator rules:

```
export interface AmpImgProps {
  'placeholder'?: string;
  'media'?: string;
  'noloading'?: boolean;
  …
}

namespace JSX {
  interface IntrinsicElements {
    'amp-img': AmpImgProps;
    'amp-layout': AmpLayoutProps;
    'amp-pixel': AmpPixelProps;
    ...
  }
}
```

### Extension import helper

The extension import helpers (`AmpIncludeCustomElement`, `AmpIncludeCustomTemplate`) simplifies importing AMP components:

```
 <AmpIncludeCustomElement name='amp-3d-gltf' version='0.1' />
```

The `version` attribute is optional and can be omitted which will result in the latest prod version being used:

```
 <AmpIncludeCustomElement name='amp-3d-gltf' />
```
