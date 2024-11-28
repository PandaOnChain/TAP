import React from 'react'

function HomeHeader() {
  return (
		<div class="relative flex items-center w-full ">
			<div class="absolute left-1/2 transform -translate-x-1/2 text-2xl">
				October
			</div>
			<div class="ml-auto mr-3 text-2xl">2024</div>
		</div>
  );
}

export default HomeHeader