import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

export default function Alert({ visible, title, description, onClick, src }){
  if (visible) {
    return (
      <>
        <div className='fixed inset-0 z-50 top-80'>
          <div className='bg-white p-6 max-w-sm mx-auto rounded-xl shadow-lg'>
            <div style={{ marginTop: '-15px', marginRight: '-10px' }} className='flex justify-end'>
              <FontAwesomeIcon onClick={onClick} icon={faTimes} width={12} className='text-teal-500 cursor-pointer' />
            </div>
            <div className='flex items-center space-x-6 text-left'>
              <div className='shrink-0'>
                <Image 
                  className='h-20 w-20 rounded-full bg-teal-500 p-1'
                  src={src ? src : '/pokeball_4.png'}
                  alt='pokeball_4.png' 
                  width={80}
                  height={80}
                />
              </div>
              <div>
                <div className='text-lg font-medium text-black'>{title}</div>
                <p className='text-slate-500'>{description}</p>
              </div>
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