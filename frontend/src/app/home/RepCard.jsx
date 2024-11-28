import React from 'react'

const RepCard = ({title}) => {
  return (
		<div className=" w-[95%] m-3 bg-yellow-500 rounded-lg place-items-center flex flex-col">
			<div className="p-1">{title}</div>
			<div className="container px-3 py-1 columns-7">
				<div className="flex flex-col">
					<h6 className="text-center">mon</h6>
					<div className="flex flex-col rounded-md border-2">
						<h6 className='text-center text-xs'>14</h6>
                        <div className='place-content-center'>
                            V
                        </div>
					</div>
				</div>
				<div className="flex flex-col">
					<h6 className="text-center">tue</h6>
					<div className="flex flex-col rounded-md border-2">
						<h6 className='text-center text-xs'>15</h6>
                        <div className='place-content-center'>
                            V
                        </div>
					</div>
				</div>
				<div className="flex flex-col">
					<h6 className="text-center">wed</h6>
					<div className="flex flex-col rounded-md border-2">
						<h6 className='text-center text-xs'>16</h6>
                        <div className='place-content-center'>
                            V
                        </div>
					</div>
				</div>
				<div className="flex flex-col">
					<h6 className="text-center">thu</h6>
					<div className="flex flex-col rounded-md border-2">
						<h6 className='text-center text-xs'>17</h6>
                        <div className='place-content-center'>
                            V
                        </div>
					</div>
				</div>
				<div className="flex flex-col">
					<h6 className="text-center">fri</h6>
					<div className="flex flex-col rounded-md border-2">
						<h6 className='text-center text-xs'>18</h6>
                        <div className='place-content-center'>
                            V
                        </div>
					</div>
				</div>
				<div className="flex flex-col">
					<h6 className="text-center">sat</h6>
					<div className="flex flex-col rounded-md border-2">
						<h6 className='text-center text-xs'>19</h6>
                        <div className='place-content-center'>
                            V
                        </div>
					</div>
				</div>
				<div className="flex flex-col">
					<h6 className="text-center">sun</h6>
					<div className="flex flex-col rounded-md border-2">
						<h6 className='text-center text-xs'>20</h6>
                        <div className='place-content-center'>
                            V
                        </div>
					</div>
				</div>
			</div>
		</div>
  );
}

export default RepCard