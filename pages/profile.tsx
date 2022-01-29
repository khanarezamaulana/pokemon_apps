import { useState, useContext } from 'react'
import { AppsContext } from '../context/AppsContext'
import Modal from '../components/Modal'
import Alert from '../components/Alert'

const BASE_URL = 'https://pokeapi.co/api/v2/'

export async function getServerSideProps(context: any){
  const pokemonName = context?.query?.name

  if (!pokemonName) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  const detailData = await fetch(`${BASE_URL}pokemon/${pokemonName}`).then(res => {
    if (res.status !== 404) {
      return res.json()
    } else {
      return 'Data Not Found!'
    }
  })

  return {
    props: {
      pokemonDetail: detailData
    }
  }
}

const Detail = (props: any) => {
  const { pokemonDetail } = props
  const { addPokemonOwned } = useContext(AppsContext)
  const [ visibleModal, setVisibleModal ] = useState(false)
  const [ visibleValidate, setVisibleValidate ] = useState(false)
  const [ visibleAlert, setVisibleAlert ] = useState(false)
  const [ nickName, setNickName ] = useState('')
  const [ catched, setCatched ] = useState(true)
  const [errorMessage, setErrorMessage ] = useState('')

  const handleCatch = () => {
    const catched = Math.random() < 0.5
    if (catched) {
      setCatched(true)
      setVisibleModal(true)
    } else {
      setCatched(false)
      setVisibleModal(true)
    }
  }

  const saveMyPokemon = () => {
    if (nickName.trim() === '') {
      setVisibleValidate(true)
    } else {
      const dataPayload = {
        ...pokemonDetail, nickName
      }
      const validate = addPokemonOwned(dataPayload)
      const { success, reason } = validate
      if (success) {
        setVisibleModal(false)
        setVisibleAlert(true)
        setNickName('')
        setErrorMessage('')
      } else {
        setVisibleValidate(true)
        setErrorMessage(reason)
      }
    }
  }

  const closeAlert = () => {
    setVisibleAlert(false)
    setVisibleValidate(false)
    setErrorMessage('')
  }

  const renderValidateMessage = () => {
    if (visibleValidate === true && !nickName) {
      return (
        <p style={{ marginTop: '-13px' }} className='text-left text-sm text-red-500'>Nickname must be filled!</p>
      )
    } else if (visibleValidate === true && nickName) {
      return (
        <p style={{ marginTop: '-13px' }} className='text-left text-sm text-red-500'>{errorMessage}</p>
      )
    } else {
      return ''
    }
  }

  if (pokemonDetail === 'Data Not Found!') {
    return (
      <div style={{ marginTop: '-60px' }} className='h-screen text-center p-10 justify-center items-center flex flex-col'>
        <img
          src={'/pokeball_4.png'}
          width={100}
          height={100}
        />
        <div className='text-md font-medium mt-4'>Pokemon not found!</div>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '-60px' }} className='h-screen text-center p-5'>
      <div>
        <h1 className='text-xl mt-20 mb-1'>Hi, my name is <span className='capitalize'>{pokemonDetail.name}</span>!</h1>
        <div
          className='text-blue-500 cursor-grab active:bg-emerald-500 font-medium text-sm'
          onClick={handleCatch}
        >
          Click here to catch me!
        </div>
      </div>
      <img
        onClick={handleCatch}
        width={100}
        height={100}
        className='bg-teal-500 rounded-full m-auto my-2 p-1 cursor-grab'
        src={pokemonDetail.sprites.front_default}
        alt={pokemonDetail.sprites.front_default}
      />
      <div className='bg-white p-4 max-w-md mx-auto rounded-xl shadow-md'>
        <div>
          <div className='text-md text-black flex justify-center mb-1'>
            Type
          </div>
          <p className='text-slate-500 text-sm capitalize'>{pokemonDetail.types.map((poke: any) => poke.type.name).join(', ')}</p>
        </div>
        <div>
          <div className='text-md text-black mt-5 mb-1 flex justify-center'>
            Moves
          </div>
          <p className='text-slate-500 text-sm flex justify-center items-center pl-8 capitalize'>
            <div className='grid grid-cols-2 gap-1'>
              {pokemonDetail.moves.slice(0, 15).map((poke: any) =>
                <div className='text-left'>
                  <li className='pr-5' key={poke.move.name}>{poke.move.name}</li>
                </div>
              )}
              {pokemonDetail.moves.slice(15, 30).map((poke: any) =>
                <div className='text-left'>
                  <li key={poke.move.name}>{poke.move.name}</li>
                </div>
              )}
            </div>
          </p>
        </div>
      </div>
      {visibleModal &&
        <Modal title={catched ? 'Yeay, Catched!' : 'Whoops!'} visible={visibleModal}>
          <div className='relative p-6 flex-auto'>
            <p className='my-4 text-light text-left text-base leading-relaxed'>
              {
                catched ? (
                  'Give him a new Nickname'
                ) : (
                  <span className='flex flex-row space-x-6 px-6 items-center'>
                    <span>
                      <img
                        src='/pokeball_4.png'
                        width={50}
                        height={50}
                      />
                    </span>
                    <span className='capitalize'>{pokemonDetail.name}</span>&nbsp;just run away!
                  </span>
                )
              }
              {catched && <input value={nickName} onChange={(e) => setNickName(e.target.value)} className='shadow rounded border apperance-none w-full py-2 px-3 text-teal-600 leading-light focus:outline-none focus:shadow-outline' id='nickName' type='text' placeholder='New Nickname' />}
            </p>
            {renderValidateMessage()}
          </div>

          <div className='flex justify-end p-5 border-t border-solid border-teal-200 rounded-b'>
            {
              catched ? (
                <div>
                  <button
                    className='text-red-500 background-transparent font-medium uppercase px-4 py-2 text-sm outline-none shadow hover:shadow-lg focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded'
                    type='button'
                    onClick={() => setVisibleModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className='bg-teal-500 text-white active:bg-emerald-600 font-medium uppercase px-4 py-2 text-sm shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded'
                    type='button'
                    onClick={() => saveMyPokemon()}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className='text-red-500 background-transparent font-medium uppercase px-4 py-2 text-sm outline-none shadow hover:shadow-lg focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded'
                    type='button'
                    onClick={() => setVisibleModal(false)}
                  >
                    Re-catch
                  </button>
                </div>
              )
            }
          </div>
        </Modal>
      }
      {visibleAlert &&
        <Alert
          src={pokemonDetail.sprites.front_default}
          onClick={() => closeAlert()}
          visible={visibleAlert}
          children={null}
          title={errorMessage ? 'Failed!' : 'Yeay, Congrats!'}
          description={errorMessage ? errorMessage : <span><span className='capitalize'>{pokemonDetail.name}</span> has been saved!</span>}
        />
      }
    </div>
  )
}

export default Detail
