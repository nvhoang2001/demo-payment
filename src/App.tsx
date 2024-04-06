import { App as AntApp } from 'antd';

import AppRouter from '@/routes';

import '@/styles/App.css';

function App() {
  return (
    <AntApp>
      <AppRouter />
    </AntApp>
  );
}

export default App;
