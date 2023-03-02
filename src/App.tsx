import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Main from './pages/main';
import Parser from './pages/Parser';
import Products from './pages/Products';
import Cabinet from './pages/Cabinet';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <div className="App">
     <Routes>
		<Route path="/" element={<Main />}/>
		<Route path="/parse" element={<Parser />}/>
		<Route path="/products" element={<Products />}/>
		<Route path="/cabinet" element={<Cabinet />}/>
		<Route path="/*" element={<NotFound />}/>
	 </Routes>
    </div>
  );
}

export default App;
