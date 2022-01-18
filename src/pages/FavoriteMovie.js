import React from 'react'
import { css } from '@emotion/core'
import { Card, Grid, Cell, Bleed, Separator, colors } from '@fs/zion-ui'
import { SocialStar } from '@fs/zion-icon/dist/cjs/icons'

const imageCss = css`
  width: 100%;
  height: 'auto';
  padding: 0px;
  margin: 0px;
`
const overviewCss = css`
  font-size: small;
  margin-bottom: 5px;
  padding-bottom: 0px;
`

// const starCss = css`
//   margin-left: 50px;
// `
const ratingCss = css`
  padding: 0px;
  margin: 0px;
  line-height: 100%;
  color: ${colors.billboard.blue40};
  font-weight: bolder;
  border-radius: 5px;
  background-image: linear-gradient(to bottom right, ${colors.billboard.red10}, white);
`
const ratingLabelCss = css`
  font-size: large;
  padding-left: 0px;
  margin-left: 0px;
  text-align: 'left';
`

const titleCss = css`
  padding-top: 10px;
  font-size: x-large;
  font-weight: bolder;
  color: ${colors.billboard.blue30};
`
export default function FavoriteMovie({ data, name }) {
  const result = data.results?.find((res) => res.title.toLowerCase() === name.toLowerCase())
  const { overview, poster_path, title, vote_average } = result
  const imageUrl = `https://image.tmdb.org/t/p/original/${poster_path}`

  return (
    <div style={{ width: 600 }}>
      <Card>
        <Bleed left bottom>
          <Grid>
            <Cell columns={4}>
              <img src={imageUrl} alt="Movie poster" css={imageCss} />
            </Cell>
            <Cell columns={8}>
              <h1 css={titleCss}>{title}</h1>
              <p css={overviewCss}>{overview}</p>
              <div css={ratingCss}>
                <Grid columns={8} density="tight">
                  <Cell columns={1} verticalAlign="middle">
                    <SocialStar color={colors.billboard.yellow00} size="md" />
                  </Cell>
                  <Cell columns={5}>
                    <p css={ratingLabelCss}>Average user rating:</p>
                  </Cell>
                  <Cell columns={2} verticalAlign="middle">
                    <p style={{ fontSize: 'medium' }}>{vote_average * 10}%</p>
                  </Cell>
                </Grid>
              </div>
            </Cell>
          </Grid>
        </Bleed>
      </Card>
    </div>
  )
}
