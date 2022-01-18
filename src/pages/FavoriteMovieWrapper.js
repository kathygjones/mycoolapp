import React from 'react'
import { useAxios } from '@fs/zion-axios'
import FavoriteMovie from './FavoriteMovie'

export default function FavoriteMovieWrapper({ name }) {
  const formattedName = name.split(' ').join('+')
  const api_key = process.env.REACT_APP_MOVIE_API_KEY
  const { data, error, loading } = useAxios({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${formattedName}`,
  })

  return (
    <>
      {loading && <div>Loading. . . </div>}
      {error && <div>{error.message}</div>}
      {data && <FavoriteMovie data={data} name={name} />}
    </>
    // <>
    //   <h1>{name}</h1>
    //   <img src={picture} alt="me" />
    //   <p>{description}</p>
    //   <p>userRating</p>
    // </>
  )
}
