import React from 'react'
import HomeHeader from './HomeHeader';

const HomePage = ({children}) => {
  return (
		<div className='flex h-screen flex-col md:flex-row'>
			<div className='w-full flex-none'><HomeHeader/></div>
			<div>{children}</div>
		</div>
  );
}

export default HomePage