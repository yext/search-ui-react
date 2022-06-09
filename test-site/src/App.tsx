import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './pages/PeoplePage';
import { ProductsPage } from './pages/ProductsPage';
import UniversalPage from './pages/UniversalPage';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { AnalyticsProvider } from '@yext/answers-react-components';
import { config } from './config';
import React from 'react';

function App() {
  return (
    <div className='p-4'>
      <AnswersHeadlessProvider {...config}>
        <AnalyticsProvider {...config}>
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route index element={<UniversalPage />} />
              <Route path='people' element={<PeoplePage />} />
              <Route path='products' element={<ProductsPage />} />
            </Routes>
          </BrowserRouter>
        </AnalyticsProvider>
      </AnswersHeadlessProvider>
    </div>
  );
}

export default App;
