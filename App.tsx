import React from 'react';
import { Route, Routes } from "react-router-dom"
import Navbar from './src/components/Navbar';
import Footer from './src/components/Footer';
import Main from './src/pages/Main';
import NotFound from './src/pages/404';
import Parser from './src/pages/Parser';
import Products from './src/pages/products';
import ConcreteProduct from './src/pages/products/ConcreteProduct';
import Projects from './src/pages/projects';
import ConcreteProject from './src/pages/projects/ConcreteProject';
import Cabinet from './src/pages/Cabinet';
import Registration from './src/pages/Registration';
import '../styles/global.css';

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
