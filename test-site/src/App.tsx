import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './pages/PeoplePage';
import UniversalPage from './pages/UniversalPage';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

const config = {
  apiKey: '2d8c550071a64ea23e263118a2b0680b',
  experienceKey: 'slanswers-hier-facets',
  locale: 'en'
}

function App() {
  return (
    <div className='p-4'>
      <AnswersHeadlessProvider {...config}>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route index element={<UniversalPage />} />
            <Route path='people' element={<PeoplePage />} />
          </Routes>
        </BrowserRouter>
      </AnswersHeadlessProvider>
    </div>
  );
}

export default App;
