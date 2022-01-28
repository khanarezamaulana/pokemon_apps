module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['https://diproses.id', 'diproses.id']
  },
  async redirects(){
    return [
      {
        source: '/',
        destination: '/home?tab=pokemons',
        permanent: true
      }
    ]
  }
}
