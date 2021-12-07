import React from 'react';
import {css, cx} from '@leafygreen-ui/emotion';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { MongoDBLogo } from '@leafygreen-ui/logo';
import Button from '@leafygreen-ui/button';
import { H1 } from '@leafygreen-ui/typography'

function App() {
  return (
    <LeafygreenProvider>
      <header className={css`display: flex; align-items: baseline; gap: 12px; justify-content: center;`}>
        <MongoDBLogo />
      </header>
      <main className={css`text-align: center;`}>
        <H1>Leafygreen App</H1>
        <br/>
        <Button
          variant="primary"
          className="App-link"
          href="https://mongodb.design"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the Leafygreen Docs
        </Button>
      </main>
    </LeafygreenProvider>
  );
}

export default App;