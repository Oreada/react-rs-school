import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Product } from './components/Product';
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
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Product image={''} name={''} brand={''} volume={0} color={''} weight={0} price={0} popular={''} storage={0} />
        </>
    );
}

export default App;
