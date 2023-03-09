import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { IProductItem } from '../types/interface';
type Index = { index: number }

const Parameters: React.FC<Index> = ({ index }) => {

	const { id } = useParams()
	const defaultInfos: any[] = []
	const [infos, setInfos]: [any[], (info: any[]) => void] = useState(defaultInfos)
	const [param, setParam] = useState(0)

	useEffect(() => {
		axios.get<IProductItem[]>(`https://parserali.me/api/products/${id}/`)
			.then(response => {
				const parameters = response.data[0]["parameters"] as string
				const fixedParameters = parameters.replace(/\'/g, '\"')
				const parsedParameters = JSON.parse(fixedParameters)
				const infos = []
				for (let i = 0; i < parsedParameters.length; i++) {
					infos.push(parsedParameters[i]['info'])
				}
				setInfos(infos)
			})
			.catch(error => console.log(error.message))
	}, [id])

	console.log(infos) //пустой массив

	const innerArray = infos[index]
	console.log(innerArray) //undefined

	const createParams = () => {
		const namesFromObj = ['']
		for (let i = 0; i < innerArray.length; i++) {
			namesFromObj.push(innerArray[i].name)
		}
		console.log(namesFromObj) //пустой массив
		return namesFromObj
	}

	const arr = createParams()
	console.log(arr) //undefined

	return (
		<>
			{
				arr.map((name: string, id: number) => {
					return (
						<li
							key={id}
							onClick={() => setParam(id)}
							className={param === id
								? 'btn-flat parameter selected'
								: 'btn-flat parameter'}
						>{name}</li>
					)
				})
			}
		</>
	)
}

export default Parameters