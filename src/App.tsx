import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Main from './pages/Main';
import Parser from './pages/Parser';
import Products from './pages/Products';
import Cabinet from './pages/Cabinet';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
	return (
		<div className="App z-depth-3">
			<header>
				<Navbar />
			</header>
			<main className='valign-wrapper'>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/parse" element={<Parser />} />
					<Route path="/products" element={<Products />} />
					<Route path="/cabinet" element={<Cabinet />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
