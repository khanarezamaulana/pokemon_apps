export default function Modal({ children, visible, title }){
  if (visible) {
    return (
      <>
        <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
          <div className='relative w-auto my-6 mx-auto max-w-sm'>
            {/* Content */}
            <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
              {/* Header */}
              <div className='flex items-start justify-between p-5 border-b border-solid border-teal-300 rounded-t'>
                <h4 className='text-xl font-medium text-black'>
                  {title}
                </h4>
              </div>
              {/* Description */}
              {children}
            </div>
          </div>
        </div>
        <div className='opacity-50 fixed inset-0 z-40 bg-black' />
      </>
    )
  } else {
    return null
  }
}