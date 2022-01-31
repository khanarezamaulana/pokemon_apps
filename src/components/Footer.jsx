import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Footer () {
  const router = useRouter()
  return (
    <div className='flex justify-center items-center border-t border-solid border-teal-200 p-4 mt-16 text-sm'>
      <Image
        onClick={() => router.push('/')}
        className='cursor-pointer'
        src='/pokeball_1.png'
        alt='pokeball_1.png'
        width={20}
        height={20}
      />
      <span onClick={() => router.push('/')} className='text-teal-500 cursor-pointer ml-2'>Created by Khana Reza Maulana</span>
    </div>
  )
}