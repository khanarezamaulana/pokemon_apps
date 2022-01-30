import React, { useState, useEffect, useContext } from "react"
import { useRouter } from 'next/router'
import { AppsContext } from '../../context/AppsContext'
import Image from 'next/image'
import Loader from '../components/Loader'
import Tabs from '../components/Tabs'
import Alert from '../components/Alert'

const BASE_URL = 'https://pokeapi.co/api/v2/'

const tabs = [
  {
    title: 'All Pokemon',
    route: 'pokemons'
  },
  {
    title: 'My Pokemon',
    route: 'mypokemons'
  }
]

export async function getServerSideProps(context: any){
  return {
    props: {
      activeTab: context?.query?.tab || 'pokemons'
    }
  }
}

const Home = (props: any) => {
  // router
  const router = useRouter()

  // context
  const { myPokemons, releasePokemonOwned } = useContext<any>(AppsContext)

  // state
  const [activeTab, setActiveTab] = useState(props.activeTab)
  const [isLoading, setIsLoading] = useState(false)
  const [pokemons, setPokemons] = useState<any>([])
  const [visibleAlert, setVisibleAlert] = useState(false)
  const [pokemonNickName, setPokemonNickName] = useState('')
  const [pokemonImage, setPokemonImage] = useState('')

  useEffect(() => {
    getPokemons()
  }, [])

  const handleToDetail = (name: string) => {
    router.push(`/profile?name=${name}`)
  }

  const handleReleasePokemon = (pokemon: any) => {
    releasePokemonOwned(pokemon)
    setPokemonNickName(pokemon.nickName)
    setVisibleAlert(true)
    setPokemonImage(pokemon.sprites.front_default)
  }

  const closeAlert = () => {
    setVisibleAlert(false)
    setPokemonImage('')
  }

  const renderPokemons = () => {
    return (
      <div className='flex flex-col'>
        <div style={{ maxWidth: '25.3rem', boxShadow: '0.5px 0 5px 0 #00000014' }} className='p-6 mx-auto bg-white rounded-xl shadow-inner flex items-center space-x-9 w-full'>
          <div className='shrink-0'>
            <Image width={80} height={80} className='h-20 w-20' src='/pokeball_4.png' alt='pokeball_4.png' />
          </div>
          <div>
            <div className='text-md font-medium text-black'>Total Pokemon</div>
            <p className='text-slate-500'>{pokemons.length}</p>
            <div className='text-md font-medium text-black mt-2'>Total Pokemons Owned</div>
            <p className='text-slate-500'>{myPokemons.length}</p>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          {pokemons.map((item: any) => (
            <div 
              key={item.url}
              onClick={() => handleToDetail(item.name)}
              style={{ boxShadow: 'rgb(180 180 180) 0.4rem 0.4rem 0.4rem', marginBottom: '0.1rem' }}
              className='p-5 rounded m-5 bg-teal-500 text-white capitalize hover:bg-teal-300 cursor-pointer'
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderMyPokemons = () => {
    if (!myPokemons || myPokemons.length === 0) {
      return (
        <div style={{ marginTop: '-217px' }} className='flex flex-col justify-center items-center h-screen'>
          <div className='ml-16'>
            <Image
              src='/pokemon_5.png'
              alt='pokemon_5.png'
              width={200}
              height={200}
            />
          </div>
          <div className='text-md font-medium mt-2'>Opps..</div>
          <div>You haven't catch any pokemons!</div>
        </div>
      )
    } else {
      return (
        <>
          <div className={myPokemons.length > 3 ? 'flex flex-col w-full' : 'flex flex-col w-full h-screen'}>
            {myPokemons.map((item: any) => {
              return (
                <React.Fragment key={item.nickName}>
                  <div
                    style={{ boxShadow: 'rgb(180 180 180) 0.4rem 0.4rem 0.4rem' }}
                    className='pl-5 rounded m-5 bg-teal-500 text-white'
                  >
                    <div className='flex flex-row items-center'>
                      <div className='mr-10 w-20 my-5 p-1'>
                        <Image
                          width={150}
                          height={150}
                          className='bg-white rounded-full'
                          src={item.sprites.front_default}
                          alt={item.sprites.front_default}
                        />
                      </div>
                      <div>
                        <tr>
                          <td width='100'>Name</td>
                          <td width='10'>:</td>
                          <td><p className='capitalize'>{item.name}</p></td>
                        </tr>
                        <tr>
                          <td width='100'>Nickname</td>
                          <td width='10'>:</td>
                          <td><p className='capitalize'>{item.nickName}</p></td>
                        </tr>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center items-center'>
                    <button
                      className='text-teal-500 background-transparent font-medium uppercase px-4 py-2 text-sm outline-none shadow hover:shadow-lg focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded'
                      type='button'
                      onClick={() => handleReleasePokemon(item)}
                    >
                      Release
                    </button>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </>
      )
    }
  }

  const getPokemons = async () => {
    try {
      setIsLoading(true)
      const result = await fetch(`${BASE_URL}pokemon`).then(res => res.json())
      const { results } = result
      setPokemons(results)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const { tab } = router.query
    if (tab !== activeTab) {
      router.push(`/home?tab=${activeTab}`, undefined, { shallow: true })
    }
  }, [activeTab])

  const handleOnChangeTab = (newTab: any) => {
    setActiveTab(newTab.route)
  }
  

  return (
    <>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={handleOnChangeTab}
      />

      {
        isLoading && <Loader />
      }

      {
        (activeTab === 'pokemons' && !isLoading) &&
        renderPokemons()
      }
      {
        (activeTab === 'mypokemons' && !isLoading) &&
        renderMyPokemons()
      }
      {visibleAlert &&
        <div className=''>
          <Alert
            src={pokemonImage}
            onClick={() => closeAlert()}
            children=''
            title={'Success!'}
            description={`${pokemonNickName} has been released!`}
            visible={visibleAlert}
          />
        </div>
      }
    </>
  )
}

export default Home
