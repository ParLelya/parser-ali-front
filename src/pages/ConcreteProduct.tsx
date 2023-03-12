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
	const [item, setItem]: [IProductItem, (item: IProductItem) => void] = useState({ id: 0, name: '', images: '', unique_id: '', parameters: '', additional_parameters: '' })
	const [param, setParam] = useState<IParamsObj[]>()
	const [active, setActive] = useState([''])

	useEffect(() => {
		axios.get<IProductItem>(`https://parserali.me/api/products/${id}/`)
			.then(response => {
				console.log(response.data)
				const name = response.data.name
				const unique_id = response.data.unique_id
				const additional_parameters = response.data.additional_parameters
				const images = response.data.images
				const parameters = response.data.parameters
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

	const handleClick = (index: number, id: number) => {
		const selectedParam = []
		selectedParam.push(String(index))
		selectedParam.push(String(id))
		setActive(selectedParam)
	}

	return (
		<div className='product-item'>
			{/* TODO: реализовать карусель из картинок, вытягивая ссылки по ключу */}
			{/* <Carousel images={item.images}/> */}
			<div className="card">
				<div className="card-image">
					<img src={item.images} alt='' />
				</div>
				<div className="card-content">
					<span className="card-title">
						{item.name}
					</span>
					<div className="container">
						{
							param?.map((item, index) => {
								return (
									<div key={index}>
										<span>{item.title}</span>
										<ul className="product-info">
											{item.info.map((detail, id) => (
												<li
													key={id}
													onClick={() => handleClick(index, id)}
													className={
														active[0] === String(index) && active[1] === String(id)
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