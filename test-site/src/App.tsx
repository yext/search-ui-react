import { SearchHeadlessProvider } from '@yext/search-headless-react';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './pages/PeoplePage';
import { ProductsPage } from './pages/ProductsPage';
import UniversalPage from './pages/UniversalPage';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { AnalyticsProvider } from '@yext/search-ui-react';
import { config } from './config';

function App() {
  return (
    <div className='p-4'>
      <SearchHeadlessProvider {...config}>
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
      </SearchHeadlessProvider>
    </div>
  );
}

export default App;
