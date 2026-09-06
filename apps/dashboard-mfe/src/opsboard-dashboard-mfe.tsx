import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import Root from './root.component';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  domElementGetter: () => document.getElementById('dashboard-mfe-container')!,
  errorBoundary(err) {
    console.error('[dashboard-mfe] render error', err);
    return <p>Something went wrong loading the dashboard.</p>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
