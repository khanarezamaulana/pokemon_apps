import { createContext, useState } from 'react'

const AppsContext = createContext()

const AppsProvider = ({ children }) => {
  let pokemonOwned = []
  if (typeof window !== 'undefined') {
    const pokemonOwnedData = localStorage.getItem('pokemonOwned')
    if (pokemonOwnedData) {
      pokemonOwned = JSON.parse(pokemonOwnedData)
    }
  }

  const [myPokemons, setMyPokemons] = useState(pokemonOwned || [])

  const addPokemonOwned = (newPokemon) => {
    let tmpPokemonOwned = [...myPokemons]
    if (tmpPokemonOwned.findIndex(item => item.nickName === newPokemon.nickName) > -1) {
      return {
        success: false,
        reason: `Nickname ${newPokemon.nickName} already exist!`
      }
    } else {
      tmpPokemonOwned = [...tmpPokemonOwned, newPokemon]
      setMyPokemons(tmpPokemonOwned)
      localStorage.setItem('pokemonOwned', JSON.stringify(tmpPokemonOwned))
    } return {
      success: true
    }
  }

  const releasePokemonOwned = (pokemon) => {
    let tmpPokemonOwned = [...myPokemons]
    const indexToRemove = tmpPokemonOwned.findIndex(item => item.nickName === pokemon.nickName)
    tmpPokemonOwned.splice(indexToRemove, 1)
    setMyPokemons(tmpPokemonOwned)
    localStorage.setItem('pokemonOwned', JSON.stringify(tmpPokemonOwned))
  }

  return (
    <AppsContext.Provider value={{
        myPokemons,
        addPokemonOwned,
        releasePokemonOwned
      }}
    >
      {children}
    </AppsContext.Provider>
  )
}

export {
  AppsProvider,
  AppsContext
}

