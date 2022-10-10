import { Button, Menu } from '@mantine/core'

interface Props {
  requestTerritoryHandler?: (territoryType: string) => void
}

const RequestTerritoryButton = ({ requestTerritoryHandler }: Props) => {
  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button className="px-10 py-1 min-h-[40px] w-full mt-4 font-medium text-base text-white transition-all duration-100 rounded-sm lg:min-h-[48px] lg:max-w-[300px] active:bg-teal-blue bg-accent dark:bg-accent-dark hover:bg-accent/70 font-Roboto">
            Request New Territory
          </Button>
        </Menu.Target>

        <Menu.Dropdown className="dark:bg-dark-grey-dark dark:border-dark-grey-dark">
          <Menu.Label>Request Territory Type</Menu.Label>
          <Menu.Item
            onClick={() => {
              requestTerritoryHandler('Normal Territory')
            }}
            className="dark:text-white dark:hover:bg-gray-600"
          >
            Normal Territory
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              requestTerritoryHandler('Letter Writing Territory')
            }}
            className="dark:text-white dark:hover:bg-gray-600"
          >
            Letter Writing
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}

export default RequestTerritoryButton
