import { Button, createStyles, Menu } from '@mantine/core'
import { BsEnvelopeOpenFill, BsTelephoneFill } from 'react-icons/bs'
import { GiMountainRoad } from 'react-icons/gi'
import { IoBag, IoBusiness } from 'react-icons/io5'

interface Props {
  requestTerritoryHandler?: (territoryType: string) => void
}

const useStyles = createStyles(() => ({
  item: {
    '&[data-hovered]': {
      backgroundColor: 'transparent',
    },
  },
}))

const RequestTerritoryButton = ({ requestTerritoryHandler }: Props) => {
  const { classes } = useStyles()
  return (
    <>
      <Menu classNames={classes}>
        <Menu.Target>
          <button className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-sm shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Request New Territory
          </button>
        </Menu.Target>

        <Menu.Dropdown className="flex w-full max-w-[263.02px] lg:max-w-[300px] bg-white/90 border-2 border-solid border-htd-grey/30 dark:border-htd-grey-dark/30 dark:bg-black/90 backdrop-blur-sm">
          <Menu.Label>Request Territory Type</Menu.Label>
          <Menu.Item
            onClick={() => {
              requestTerritoryHandler('Standard Territory')
            }}
            className="group"
          >
            <div className="flex items-center w-full gap-3 text-base font-medium tracking-wide font-OpenSans text-off-black dark:text-white group-hover:text-dark-blue dark:group-hover:text-light-blue group-disabled:text-htd-grey disabled:text-off-black/50">
              <IoBag className="text-off-black/75 dark:text-off-white/50 group-hover:text-dark-blue/60 dark:group-hover:text-light-blue/60 group-disabled:text-htd-grey/50" />
              <span>Standard</span>
            </div>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              requestTerritoryHandler('Business Territory')
            }}
            disabled
            className="group"
          >
            <div className="flex items-center w-full gap-3 text-base font-medium tracking-wide group-disabled:text-htd-grey disabled:text-off-black/50 font-OpenSans text-off-black dark:text-white hover:dark:text-light-blue">
              <IoBusiness className="text-off-black/75 dark:text-off-white/50 group-hover:text-dark-blue/60 dark:group-hover:text-light-blue/60 group-disabled:text-htd-grey/50" />
              <span>Business</span>
            </div>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              requestTerritoryHandler('Rural Territory')
            }}
            disabled
            className="group"
          >
            <div className="flex items-center w-full gap-3 text-base font-medium tracking-wide font-OpenSans text-off-black dark:text-white group-hover:text-dark-blue dark:group-hover:text-light-blue group-disabled:text-htd-grey disabled:text-off-black/50">
              <GiMountainRoad className="text-off-black/75 dark:text-off-white/50 group-hover:text-dark-blue/60 dark:group-hover:text-light-blue/60 group-disabled:text-htd-grey/50" />
              <span>Rural</span>
            </div>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              requestTerritoryHandler('Letter Writing Territory')
            }}
            className="group"
          >
            <div className="flex items-center w-full gap-3 text-base font-medium tracking-wide font-OpenSans text-off-black dark:text-white group-hover:text-dark-blue dark:group-hover:text-light-blue group-disabled:text-htd-grey disabled:text-off-black/50">
              <BsEnvelopeOpenFill className="text-off-black/75 dark:text-off-white/50 group-hover:text-dark-blue/60 dark:group-hover:text-light-blue/60 group-disabled:text-htd-grey/50" />
              <span>Letter Writing</span>
            </div>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              requestTerritoryHandler('Telephone Territory')
            }}
            className="group"
          >
            <div className="flex items-center w-full gap-3 text-base font-medium tracking-wide font-OpenSans text-off-black dark:text-white group-hover:text-dark-blue dark:group-hover:text-light-blue group-disabled:text-htd-grey disabled:text-off-black/50">
              <BsTelephoneFill className="text-off-black/75 dark:text-off-white/50 group-hover:text-dark-blue/60 dark:group-hover:text-light-blue/60 group-disabled:text-htd-grey/50" />
              <span>Telephone</span>
            </div>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}

export default RequestTerritoryButton
