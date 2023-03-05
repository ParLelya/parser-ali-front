import React from 'react'
// import Carousel from './Carousel'
// import { IProductItem } from '../types/interface'

const Item: React.FC = () => {
//TODO: доделать окмпоненту с отрисовкой полей + кликабельная плашка товара для открытия iframe
	return (
		<div className='product-item'>
			{/* <Carousel carouselItems={carouselItems}/> */}
			<h6>Product name</h6>
			<p>Product description</p>
			<iframe src="https://www.google.com/" style={{ border: '0', width: '500px', height: '150px' }}></iframe>
		</div>
	)
}

export default Item