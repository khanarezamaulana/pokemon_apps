import { useRouter } from 'next/router'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

export default function Header () {
  const router = useRouter()
  return (
    <div className='flex justify-center items-center bg-teal-500 p-4 sticky top-0 z-20'>
      {
        router.pathname === '/profile' &&
        <FontAwesomeIcon onClick={() => router.back()} icon={faArrowCircleLeft} width={20} color='white' className='left-5 cursor-pointer absolute' />
      }
      {
        router.pathname === '/profile' ? (
          <span onClick={() => router.push('/')} className='text-white cursor-pointer'>About Me</span>
        ) : (
          <>
            <Image
              onClick={() => router.push('/')}
              className='cursor-pointer'
              src='/pokeball_2.png'
              alt='pokeball'
              width={25}
              height={25}
            />
            <span onClick={() => router.push('/')} className='text-white cursor-pointer ml-2'>Pokemon Trip</span>
          </>
        )
      }
    </div>
  )
}
