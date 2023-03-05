import React from 'react'

const Carousel: React.FC<Array<string>> = (carouselItems) => {

	const [active, setActive] = React.useState(0);

	React.useEffect(() => {
		setTimeout(() => {
			setActive((active + 1) % carouselItems.length);
		}, 2000);
	}, [active, carouselItems]);

	return (
		<div className="carousel">
			{
			carouselItems.map((url: string, index: number) => {
				const activeClass = active === index ? ' visible' : '';
				return (
						<a className={`carousel-item${activeClass}`} href = "#!" >
							<img src={url} alt={`pic${index}`} />
						</a>
						)
				})
			}
		</div>
	)
}

export default Carousel