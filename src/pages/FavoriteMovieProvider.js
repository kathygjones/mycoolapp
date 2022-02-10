import { React, useState, createContext, useMemo } from 'react'

export const FavoriteMovieContext = createContext({})

export default function FavoriteMovieProvider({ children }) {
  const [shownGenres, setShownGenres] = useState([])
  const [faveMovies, setFaveMovies] = useState([])

  const contextValues = useMemo(
    () => ({
      faveMovies,
      shownGenres,
      setFaveMovies,
      setShownGenres,
    }),
    [faveMovies, shownGenres, setFaveMovies, setShownGenres]
  )

  return <FavoriteMovieContext.Provider value={contextValues}>{children}</FavoriteMovieContext.Provider>
}
