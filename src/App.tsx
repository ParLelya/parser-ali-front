import React from 'react';
import { Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './pages/Main';
import NotFound from './pages/404';
import Parser from './pages/Parser';
import Products from './pages/products';
import ConcreteProduct from './pages/products/ConcreteProduct';
import Projects from './pages/projects';
import ConcreteProject from './pages/projects/ConcreteProject';
import Cabinet from './pages/Cabinet';
import Registration from './pages/Registration';
import './styles/global.css';

const App: React.FC = () => {

	return (
		<div className="app z-depth-3">
			<header>
				<Navbar />
			</header>
			<main className='valign-wrapper'>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/parse" element={<Parser />} />
					<Route path="/products/*" element={<Products />} />
					<Route path="/products/:id" element={<ConcreteProduct />} />
					<Route path="/projects/*" element={<Projects />} />
					<Route path="/projects/:id" element={<ConcreteProject />} />
					<Route path="/cabinet" element={<Cabinet />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
