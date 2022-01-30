export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/home?tab=pokemons',
      permanent: true
    }
  }
}

const App = () => {
  return <></>
}

export default App
