textwidth
========================

Get some text's offsetWidth without rendering it in the DOM

##Usage

Define a style you want to compute:

```js
var element = document.getElementById('foo');

textwidth.define('styleName', element);
```

Then, once defined, compute a string's width in that style like so:

```js
textwidth.get('styleName', 'string whose width to compute');
```

##Compatability

All browsers IE5 and up (in theory - untested in not-Webkit!)

##How do I use this with package manager X?

Yes.