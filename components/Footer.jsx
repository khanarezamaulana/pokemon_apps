import { useRouter } from 'next/router'

export default function Footer () {
  const router = useRouter()
  return (
    <div className='flex justify-center items-center border-t border-solid border-teal-200 p-4 mt-5'>
      <img
        onClick={() => router.push('/')}
        className='mr-2 cursor-pointer'
        src='/pokeball_1.png'
        alt='pokeball'
        width={25}
        height={25}
      />
      <span onClick={() => router.push('/')} className='text-teal-500 cursor-pointer'>Created by Khana Reza Maulana</span>
    </div>
  )
}