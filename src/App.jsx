import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Signup from './UI/Signup';
import Login from './UI/Login';
import Todos from './UI/Todos';
import './App.css';
import { VStack } from '@chakra-ui/react';

export default function App() {
  return (
    <Router>
    <VStack className='app'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </VStack>
    </Router>
  );
}
