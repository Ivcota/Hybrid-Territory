import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Card from './Card'

export default {
  title: 'Components/Card',
  component: Card,
  args: {
    cardType: 'green',
  },
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />

export const Story = Template.bind({})
Story.args = {}
