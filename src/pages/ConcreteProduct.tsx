import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { IProductItem } from '../types/interface';
import { API_URL } from '../http';
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

	useEffect(() => {
		axios.get<IProductItem>(`${API_URL}/products/${id}/`)
			.then(response => {
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

	return (
		<div className='product-item'>
			{/* TODO: реализовать карусель из картинок, вытягивая ссылки по ключу */}
			{/* <Carousel images={item.images}/> */}
			<div className="card">
				<div className="card-image waves-effect waves-block waves-light">
					<img src={item.images} alt='' />
				</div>
				<div className="card-content">
					<span className="card-title activator">{item.name}<i className="material-icons right">more_vert</i></span>
					<div>{
						param?.map((item, index) => {
							return (
								<div className='product-info' key={index}>
									<h6 style={{margin: '1rem 0'}}>{item.title}</h6>
									<div className='parameter'>
										{
											item.info.map((detail, id) => (
												<p key={id} className='parameter-button'>
													<label className='parameter-label'>
														<input
															type="radio"
															name={item.title}
														/>
														<span>{detail.name}</span>
													</label>
												</p>
											))
										}
									</div>
								</div>
							)
						})
					}</div>
				</div>
				<div className="card-reveal">
					<span className="card-title grey-text text-darken-4">{item.name}<i className="material-icons right">close</i></span>
					<iframe
						title={item.unique_id}
						srcDoc={item.additional_parameters}
					/>
				</div>
			</div>
		</div >
	)
}

export default ConcreteProduct