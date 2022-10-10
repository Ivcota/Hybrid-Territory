// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof RequestTerritoryButton> = (args) => {
//   return <RequestTerritoryButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import RequestTerritoryButton from './RequestTerritoryButton'

export const generated = () => {
  return <RequestTerritoryButton />
}

export default {
  title: 'Components/RequestTerritoryButton',
  component: RequestTerritoryButton,
} as ComponentMeta<typeof RequestTerritoryButton>
