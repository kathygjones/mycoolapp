import { React, useState, createContext } from 'react'

export const FavoriteMovieContext = createContext({})
export const FavoriteMovieStateUpdateContext = createContext({})

export default function FavoriteMovieProvider({ children }) {
  const [movieInput, setMovieInput] = useState('')
  const [shownGenres, setShownGenres] = useState([])
  const [faveMovies, setFaveMovies] = useState([])

  return (
    <FavoriteMovieStateUpdateContext.Provider value={(setMovieInput, setShownGenres, setFaveMovies)}>
      <FavoriteMovieContext.Provider value={(movieInput, shownGenres, faveMovies)}>
        {children}
      </FavoriteMovieContext.Provider>
    </FavoriteMovieStateUpdateContext.Provider>
  )
}
