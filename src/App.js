import React from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { VariableProvider } from './components/Context/VariableContext';
import Editor from './components/Editor';

export default function App() {

    return (
        <VariableProvider>
            <HashRouter>
                <Routes >
                    <Route path="/" element={<Navigate to="/root" />} />
                    <Route path="/editor/:logId" element={<Editor />} />
                    <Route path="/*" element={<Home />} />
                </Routes>
            </HashRouter>
        </VariableProvider>
    )
}
