import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Card, Grid, Cell, Bleed, colors } from '@fs/zion-ui'
import { SocialStar } from '@fs/zion-icon/dist/cjs/icons'

const cardCss = css`
  width: 400px;
  border-radius: 5px;
  margin-right: auto;
  margin-left: auto;
`

const imageCss = css`
  width: 100%;
  height: 'auto';
  padding: 0px;
  margin: 0px;
`

const overviewCss = css`
  font-size: small;
  margin: 5px 0px;
  padding: 0px;
  line-height: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
`

const titleCss = css`
  padding-top: 10px;
  font-size: large;
  font-weight: bolder;
  color: ${colors.billboard.blue30};
`

const ratingCss = css`
  position: absolute;
  bottom: 10px;
  margin-right: 10px;
  line-height: 100%;
  color: ${colors.billboard.blue40};
  font-weight: bolder;
  border-radius: 5px;
  background-image: linear-gradient(to bottom right, ${colors.billboard.red10}, white);
`

export default function FavoriteMovie({ movieString }) {
  const movieObject = JSON.parse(movieString)
  const { id, title, overview, vote_average, poster_path } = movieObject
  const imageUrl = `https://image.tmdb.org/t/p/original/${poster_path}`
  const movieUrl = `https://themoviedb.org/movie/${id}-${title.split(' ').join('-')}`

  return (
    <div css={cardCss}>
      <Card to={movieUrl} external>
        <Bleed left bottom>
          <Grid>
            <Cell columns={5}>
              <img src={imageUrl} alt="Movie poster" css={imageCss} />
            </Cell>
            <Cell columns={7}>
              <Bleed left>
                <h1 css={titleCss}>{title}</h1>
                <p css={overviewCss}>{overview}</p>
                <MovieRating voteAverage={vote_average} />
              </Bleed>
            </Cell>
          </Grid>
        </Bleed>
      </Card>
    </div>
  )
}

FavoriteMovie.propTypes = {
  /* Stringified movie object, to be JSON parsed */
  movieString: PropTypes.string.isRequired,
}

function MovieRating({ voteAverage }) {
  return (
    <div css={ratingCss}>
      <Grid columns={7} density="tight">
        <Cell columns={1} verticalAlign="middle">
          <SocialStar color={colors.billboard.yellow00} size="sm" />
        </Cell>
        <Cell columns={4}>
          <p css={{ fontSize: 'medium' }}>Average user rating:</p>
        </Cell>
        <Cell columns={2} verticalAlign="middle">
          <p style={{ fontSize: 'small' }}>{voteAverage * 10}%</p>
        </Cell>
      </Grid>
    </div>
  )
}

MovieRating.propTypes = {
  /* vote  average passed down from parent component */
  voteAverage: PropTypes.number.isRequired,
}
