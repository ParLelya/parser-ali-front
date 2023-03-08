import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { IProductItem } from '../types/interface';
// import Carousel from '../components/Carousel';

const ConcreteProduct: React.FC = () => {
	const [params, setParams]: any = useState([])
	// const [color, setColor] = useState(0)
	// const [size, setSize] = useState(0)
	// const [delivery, setDelivery] = useState(0)

	// titles.map((value: string, id: number) => {
	// 	return (
	// 		<ul
	// 			key={id}
	// 		>
	// 			<span>{value}</span>
	// 			{
	// 				title.toLowerCase().includes('цвет') &&
	// 				infos.map((name: string, id: number) => {
	// 					return <li
	// 						key={id}
	// 						onClick={() => setColor(id)}
	// 						className={color === id ? 'active' : ''}
	// 					>{color[name]}</li>
	// 				})
	// 			}
	// 			{
	// 				title.toLowerCase().includes('доставка') &&
	// 				infos.map((name: string, id: number) => {
	// 					return <li
	// 						key={id}
	// 						onClick={() => setDelivery(id)}
	// 						className={delivery === id ? 'active' : ''}
	// 					>{name}</li>
	// 				})
	// 			}
	// 			{
	// 				title.toLowerCase().includes('длина') &&
	// 				infos.map((name: string, id: number) => {
	// 					return <li
	// 						key={id}
	// 						onClick={() => setSize(id)}
	// 						className={size === id ? 'active' : ''}
	// 					>{name}</li>
	// 				})
	// 			}
	// 		</ul>
	// 	)
	// })

	// const obj = [
	// 	{
	// 		'title': 'Цвет',
	// 		'info': [
	// 			{
	// 				'name': 'Red Micro USB',
	// 				'id': '337948'
	// 			},
	// 			{
	// 				'name': 'Green Micro USB',
	// 				'id': '337907'
	// 			},
	// 			{
	// 				'name': 'Blue Micro USB',
	// 				'id': '337905'
	// 			},
	// 			{
	// 				'name': 'Colorful Micro USB',
	// 				'id': '337910'
	// 			},
	// 			{
	// 				'name': 'Red Type C',
	// 				'id': '337913'
	// 			},
	// 			{
	// 				'name': 'Green Type C',
	// 				'id': '337915'
	// 			},
	// 			{
	// 				'name': 'Blue Type C',
	// 				'id': '337933'
	// 			},
	// 			{
	// 				'name': 'Colorful Type C',
	// 				'id': '337927'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		'title': 'Длина',
	// 		'info': [
	// 			{
	// 				'name': '1 м',
	// 				'id': '389812'
	// 			},
	// 			{
	// 				'name': '2 м',
	// 				'id': '389806'
	// 			}
	// 		]
	// 	}]


	const { id } = useParams()
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
				const parsedParameters = JSON.parse(fixedParameters) //сделать кнопки или таблицу с параметрами
				// console.log(parsedImages)
				// console.log(parsedParameters) 
				const url = parsedImages[0].image

				const titles = []
				for (let i = 0; i < parsedParameters.length; i++) {
					titles.push(parsedParameters[i]['title'])
				}
				console.log(titles);

				const infos = []
				for (let i = 0; i < parsedParameters.length; i++) {
					infos.push(parsedParameters[i]['info'])
				}
				console.log(infos);

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
				<div className="card-image waves-effect waves-block waves-light">
					<img className="activator" src={item.images} alt='' />
				</div>
				<div className="card-content">
					<span className="card-title activator brown-text text-darken-4">
						{item.name}
						<i className="material-icons right">more_vert</i>
					</span>
					<p className="brown-text text-darken-2">
						{item.parameters}
						{/* <a href="#!">This is a link</a> */}
					</p>
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

		</div>
	)
}

export default ConcreteProduct