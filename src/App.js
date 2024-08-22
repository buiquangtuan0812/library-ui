import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
    const accessToken = localStorage.getItem('token');

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={accessToken ? <Page /> : <Navigate to="/user/login" />}
                            />
                        );
                    })}
                </Routes>
                {process.env.NODE_ENV === 'production' && <SpeedInsights />}
            </div>
        </Router>
    );
}

export default App;
