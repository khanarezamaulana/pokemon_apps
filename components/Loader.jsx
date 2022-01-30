export default function Loader () {
  return (
    <div className='h-screen'>
      <div className='fixed inset-0 z-50 top-20'>
        <div style={{ marginTop: '-140px' }} className='flex justify-center items-center h-screen'>
          <img 
            className='animate-spin'
            src='/pokeball_3.png'
            width={50}
            height={50}
          />
        </div>
      </div>
      <div className='opacity-50 fixed inset-0 z-40 bg-white' />
    </div>
  )
}
