import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { AboutPage } from './pages/AboutPage';
import { ErrorPage } from './pages/ErrorPage';
import { HomePage } from './pages/HomePage';

function App() {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/404' element={<ErrorPage />} />
            </Routes>
        </>
    );
}

export default App;
