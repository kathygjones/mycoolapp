import React from 'react'
import { css } from '@emotion/core'
import { Carousel, CarouselSlide, useAtSize } from '@fs/zion-ui'

function importAll(r) {
  return r.keys().map(r)
}
const images = require.context('../static/family', true, /\.(jpeg)$/)

const imageKeys = images.keys()

const imageFiles = importAll(images)

const carouselCss = css`
  width: auto;
`

const desktopHeight = css`
  height: 500px;
`

const tabletHeight = css`
  height: 1000px;
`

const mobileHeight = css`
  height: 500px;
`

const descriptions = [
  'I have two children: a boy in high school and a girl in middle school. They are my absolute world!',
  "We love to geek out! I recently took my son to see a 'recreation' of the Stranger Things world.",
  "Uh, bud, there's something behind you.",
  'We had a  nice time and made it out alive.',
  'My daughter is something of a Potterhead. A couple  years ago, I  took the kids to Harry Potter World in Universal Studios Orlando.',
  'We had the time of our lives! The pictures can only capture so much.',
]

const capitalized = imageKeys.map((image) =>
  image
    .slice(3)
    .split('.')[0]
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
)

export default function MyFamily() {
  const atSize = useAtSize()
  const carouselHeight = atSize({ default: mobileHeight, lg: tabletHeight, xxl: desktopHeight })

  return (
    <div css={[carouselCss, carouselHeight]}>
      <Carousel>
        {imageFiles.map((image, index) => (
          <CarouselSlide
            key={imageKeys[index]}
            src={image.default}
            alt={capitalized[index]}
            heading={capitalized[index]}
            subHeading={descriptions[index]}
          />
        ))}
      </Carousel>
    </div>
  )
}
