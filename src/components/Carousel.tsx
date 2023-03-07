import React from 'react'

const Carousel: React.FC<Array<string>> = (images) => {

	const [active, setActive] = React.useState(0);

	React.useEffect(() => {
		setTimeout(() => {
			setActive(prev => prev + 1)
			if (active === images.length) {
				setActive(0)
			}
		}, 3000);
	});

	return (
		<div className="carousel">
			{
				images.map((image: string, i: number) => {
					const activeClass = active === i ? ' visible' : '';
					return (
						<a className={`carousel-item${activeClass}`} href="#!" key={i}>
							<img src={image} alt={`pic${i}`} />
						</a>
					)
				})
			}
		</div>
	)
}

export default Carousel