import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';
import { IProductItem } from '../types/interface';
import $api from '../http';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
// import Carousel from '../components/Carousel';
import Dropdown from '../components/dropdown/Dropdown';

interface IParamsObj {
	title: string;
	info: {
		name: string,
		id: string
	}[];
};

const ConcreteProduct: React.FC = () => {

	const { isAuth } = useAppSelector((state: RootState) => state.auth)
	const redirect = useNavigate()

	useEffect(() => {
		if (!isAuth) {
			redirect('/cabinet')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuth])

	const { id } = useParams()
	const [item, setItem] = useState<IProductItem>({ 
		id: 0, name: '', 
		images: '', 
		unique_id: '', 
		from_whom: '', 
		prices: '', 
		parameters: '', 
		additional_parameters: '' 
	})
	const [param, setParam] = useState<IParamsObj[]>()


	useEffect(() => {
		$api.get<IProductItem>(`/api/products/${id}/`)
			.then(response => {
				const name = response.data.name
				const from_whom = response.data.from_whom
				const unique_id = response.data.unique_id
				const additional_parameters = response.data.additional_parameters

				const prices = response.data.prices //сделать массив и развернуть его
				
				const images = response.data.images
				const fixedImages = images.replace(/\'/g, '\"')
				const parsedImages = JSON.parse(fixedImages)
				const url = parsedImages[0].image

				const parameters = response.data.parameters
				const fixedParameters = parameters!.replace(/\'/g, '\"')
				const parsedParameters = JSON.parse(fixedParameters)

				setParam(parsedParameters)

				const item: IProductItem = {
					id: Number(id),
					name: name,
					images: url,
					unique_id: unique_id,
					from_whom: from_whom,
					prices: prices,
					parameters: parameters,
					additional_parameters: additional_parameters
				}
				setItem(item)
			})
			.catch(error => console.log(error.message))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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
									<h6 style={{ margin: '1rem 0' }}>{item.title}</h6>
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
														{/* <span>{item.prices[id]}</span> */}
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
			<Dropdown {...item} />
		</div >
	)
}

export default ConcreteProduct