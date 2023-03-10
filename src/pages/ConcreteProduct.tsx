import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { IProductItem } from '../types/interface';
// import Carousel from '../components/Carousel';

interface IParamsObj {
	title: string;
	info: {
		name: string,
		id: string
	}[];
};

const ConcreteProduct: React.FC = () => {

	const { id } = useParams()
	const [item, setItem]: [IProductItem, (item: IProductItem) => void] = useState({ id: 0, name: '', images: '' })
	const [param, setParam] = useState<IParamsObj[]>()
	const [active, setActive] = useState('')

	useEffect(() => {
		axios.get<IProductItem[]>(`https://parserali.me/api/products/${id}/`)
			.then(response => {
				const name = response.data[0]["name"]
				const unique_id = response.data[0]["unique_id"]
				const additional_parameters = response.data[0]["additional_parameters"]
				const images = response.data[0]["images"]
				const parameters = response.data[0]["parameters"]
				const fixedImages = images.replace(/\'/g, '\"')
				const fixedParameters = parameters!.replace(/\'/g, '\"')
				const parsedImages = JSON.parse(fixedImages)
				const parsedParameters = JSON.parse(fixedParameters)
				const url = parsedImages[0].image

				setParam(parsedParameters)

				const item: IProductItem = {
					id: Number(id),
					name: name,
					images: url,
					unique_id: unique_id,
					parameters: parameters,
					additional_parameters: additional_parameters
				}
				setItem(item)
			})
			.catch(error => console.log(error.message))
	}, [id])

	return (
		<div className='product-item'>
			{/* TODO: реализовать карусель из картинок, вытягивая ссылки по ключу */}
			{/* <Carousel images={item.images}/> */}
			<div className="card">
				<div className="card-image">
					<img src={item.images} alt='' />
				</div>
				<div className="card-content">
					<span className="card-title brown-text text-darken-4">
						{item.name}
					</span>
					<div className="container brown-text text-darken-2">
						{
							param?.map((item, index) => {
								return (
									<div key={index}>
										<span>{item.title}</span>
										<ul className="product-info">
											{item.info.map((detail, id) => (
												<li
													key={id}
													onClick={() => {
														setActive(String(index) + String(id))
													}}
													className={active === String(index) + String(id)
														? 'parameter selected'
														: 'parameter'
													}
												>
													{detail.name}
												</li>
											))}
										</ul>
									</div>
								)
							})
						}
					</div>
					<iframe
						className="brown-text text-darken-3"
						title={item.unique_id}
						srcDoc={item.additional_parameters}
					/>
				</div>
			</div>
			{/* <div className="card-reveal">
				<span className="card-title brown-text text-darken-4">
					{item.name}
					<i className="material-icons right">close</i>
				</span>
				
			</div> */}
		</div >
	)
}

export default ConcreteProduct