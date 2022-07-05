import React, { Suspense, useEffect, useRef } from 'react'
import { useParams } from '@fs/zion-router'
import MyFamily from '../components/my_family/src/MyFamily'
import DadJokes from '../components/dad_jokes/src/DadJokes'
import MovieLoadingSkeleton from '../components/favorite_movies/MovieLoadingSkeleton'
import VendingMachine from '../components/vending_machine/VendingMachine'

const FavoriteMovies = React.lazy(() => import('../components/favorite_movies/FavoriteMoviesPage'))

export default function ComponentWrapper() {
  const { selectionId } = useParams()
  const hexString = useRef('#')

  useEffect(() => {
    while (hexString.current.length <= 7) {
      hexString.current += Math.floor(Math.random() * 256).toString(16)
    }
  })

  switch (selectionId) {
    case 'my-family':
      return <MyFamily />
    case 'dad-jokes':
      return <DadJokes />
    case 'favorite-movies':
      return (
        <Suspense fallback={<MovieLoadingSkeleton />}>
          <FavoriteMovies randomColor={hexString} />
        </Suspense>
      )
    case 'vending-machine':
      return <VendingMachine />
    default:
      return <div>Whoopsie!</div>
  }
}
