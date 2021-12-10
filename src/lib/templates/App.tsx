import React from 'react';
import {css, keyframes} from '@leafygreen-ui/emotion';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { MongoDBLogoMark } from '@leafygreen-ui/logo';
import Button from '@leafygreen-ui/button';
import { H1 } from '@leafygreen-ui/typography'
import packageJson from '../package.json'

const leafAnimation = keyframes`
  from {
    transform: rotate(-5deg);
  }
  to {
    transform: rotate(5deg);
  }
`

const logoStyle = css`
  display: inline-block;
  margin: 24px;
  animation: ${leafAnimation} 3s infinite alternate-reverse ease-in-out;
  transform-origin: 50% 100%;
`

function App() {
  return (
    <LeafygreenProvider>
      <header className={css`text-align: center;`}>
        <H1>{packageJson.name}</H1>
      </header>
      <main className={css`display: flex; flex-direction: column; align-items: center; gap: 12px; justify-content: center;`}>
        <MongoDBLogoMark height={196} className={logoStyle}/>
        <Button
          variant="primary"
          href="https://mongodb.design"
          rel="noopener noreferrer"
        >
          Read the Leafygreen Docs
        </Button>
      </main>
    </LeafygreenProvider>
  );
}

export default App;