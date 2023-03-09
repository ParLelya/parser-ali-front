import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { IProductItem } from '../types/interface';
import Parameters from '../components/Parameters';
// import Carousel from '../components/Carousel';

const ConcreteProduct: React.FC = () => {

	const { id } = useParams()
	const [titles, setTitles] = useState([''])
	const [item, setItem]: [IProductItem, (item: IProductItem) => void] = useState({ id: 0, name: '', images: '' })
	
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

				const item: IProductItem = {
					id: Number(id),
					name: name,
					images: url,
					unique_id: unique_id,
					parameters: parameters,
					additional_parameters: additional_parameters
				}
				setItem(item)

				const titles = []
				for (let i = 0; i < parsedParameters.length; i++) {
					titles.push(parsedParameters[i]['title'])
				}
				setTitles(titles)
			})
			.catch(error => console.log(error.message))
	}, [id])

	return (
		<div className='product-item'>
			{/* TODO: реализовать карусель из картинок, вытягивая ссылки по ключу */}
			{/* <Carousel images={item.images}/> */}
			<div className="card">
				<div className="card-image waves-effect waves-block waves-light">
					<img className="activator" src={item.images} alt='' />
				</div>
				<div className="card-content">
					<span className="card-title activator brown-text text-darken-4">
						{item.name}
						<i className="material-icons right">more_vert</i>
					</span>
					<div className="container brown-text text-darken-2">
						{/* {item.parameters} */}
						{
							titles.map((title: string, index: number) => {
								return (
									<ul key={index}>
										<span>{title}</span><br/>
										{
											// <Parameters index={index}/>
										}
									</ul>
								)
							})}
					</div>
					{/* <a href="#!">This is a link</a> */}
				</div>
			</div>
			<div className="card-reveal">
				<span className="card-title brown-text text-darken-4">
					{item.name}
					<i className="material-icons right">close</i>
				</span>
				<iframe
					className="brown-text text-darken-3"
					title={item.unique_id}
					srcDoc={item.additional_parameters}
				/>
			</div>
		</div>
	)
}

export default ConcreteProduct