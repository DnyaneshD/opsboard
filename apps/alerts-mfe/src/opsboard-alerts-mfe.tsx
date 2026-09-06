import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import Root from './root.component';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  domElementGetter: () => document.getElementById('alerts-mfe-container')!,
  errorBoundary(err) {
    console.error('[alerts-mfe] render error', err);
    return <p>Something went wrong loading alerts.</p>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
