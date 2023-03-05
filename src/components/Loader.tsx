import React from 'react'

const Loader: React.FC = () => {
	return (
		<div className="progress" style={{width: '60%', margin: '30px 0'}}>
			<div className="indeterminate"></div>
		</div>
	)
}

export default Loader