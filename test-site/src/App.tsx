import { provideHeadless, SearchHeadlessProvider } from '@yext/search-headless-react';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './pages/PeoplePage';
import { ProductsPage } from './pages/ProductsPage';
import { LocationsPage } from './pages/LocationsPage';
import UniversalPage from './pages/UniversalPage';
import { FunctionPage } from './pages/FunctionPage';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { AnalyticsProvider, SearchTranslationOverrides, SearchI18nextProvider } from '@yext/search-ui-react';
import acquireSessionId from './utils/acquireSessionId';
import {analyticsConfig, config} from './config';

const searcher = provideHeadless(config);

searcher.setSessionTrackingEnabled(true);
const sessionId = acquireSessionId();
sessionId && searcher.setSessionId(sessionId);

const translationOverrides: SearchTranslationOverrides = {
  en: {
    aiGeneratedAnswer: 'The ✨ ANSWER ✨'
  },
  es: {
    aiGeneratedAnswer: '✨ RESPUETA ✨'
  }
}

function App() {
  return (
    <div className='p-4'>
      <SearchHeadlessProvider searcher={searcher}>
        <SearchI18nextProvider searcher={searcher} translationOverrides={translationOverrides}>
        <AnalyticsProvider {...analyticsConfig}>
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route index element={<UniversalPage />} />
              <Route path='people' element={<PeoplePage />} />
              <Route path='products' element={<ProductsPage />} />
              <Route path='locations' element={<LocationsPage />} />
              <Route path='function' element={<FunctionPage/>} />
            </Routes>
          </BrowserRouter>
        </AnalyticsProvider>
        </SearchI18nextProvider>
      </SearchHeadlessProvider>
    </div>
  );
}

export default App;
