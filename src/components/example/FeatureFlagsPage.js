import React from 'react'
import { css } from '@emotion/core'
import { HeaderBlock, Separator, LayoutBand, WhiteText } from '@fs/zion-ui'
import { useFeatureFlags } from '@fs/zion-flags'
import grumpyCatImage from './grumpy-cat.jpg'

const layoutBandCss = css`
  min-height: 500px;
  background-size: cover;
  background-position: center;
  background-image: url('https://picsum.photos/1200/500');
  &[type='grumpy'] {
    background-image: url('${grumpyCatImage}');
  }
`

const textWrapperCss = css`
  max-width: 500px;
`

const FeatureFlagsPage = () => {
  const { frontier_craTemplate_flagTab, frontier_craTemplate_flagTabWhiteText } = useFeatureFlags([
    'frontier_craTemplate_flagTab',
    'frontier_craTemplate_flagTabWhiteText',
  ])
  const TextColorWrapper =
    frontier_craTemplate_flagTabWhiteText.isOn || frontier_craTemplate_flagTabWhiteText.isControl ? WhiteText : 'span'
  const textOptions = {
    happy: "Today is not just another day. It's a new opportunity.",
    grumpy: 'I tried looking at the bright side. It hurt my eyes.',
  }
  let text = 'A bit awkward, but you have found the control version of this flag.'
  if (frontier_craTemplate_flagTab.treatment === 'custom') {
    text = frontier_craTemplate_flagTab.config.text
  } else if (textOptions[frontier_craTemplate_flagTab.treatment]) {
    text = textOptions[frontier_craTemplate_flagTab.treatment]
  }

  return (
    <LayoutBand css={layoutBandCss} type={frontier_craTemplate_flagTab.treatment === 'grumpy' ? 'grumpy' : 'happy'}>
      <TextColorWrapper>
        <Separator size="xl" />
        <div css={textWrapperCss}>
          <HeaderBlock heading={text} size="lg" />
        </div>
      </TextColorWrapper>
    </LayoutBand>
  )
}
export default FeatureFlagsPage
