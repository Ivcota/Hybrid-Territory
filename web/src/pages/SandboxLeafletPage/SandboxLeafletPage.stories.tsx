import type { ComponentMeta } from '@storybook/react'

import SandboxLeafletPage from './SandboxLeafletPage'

export const generated = () => {
  return <SandboxLeafletPage />
}

export default {
  title: 'Pages/SandboxLeafletPage',
  component: SandboxLeafletPage,
} as ComponentMeta<typeof SandboxLeafletPage>
