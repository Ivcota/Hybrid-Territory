import { Button, Menu, createStyles } from '@mantine/core'

import { IoBag, IoBusiness } from 'react-icons/io5'
import { GiMountainRoad } from 'react-icons/gi'
import { BsEnvelopeOpenFill, BsTelephoneFill } from 'react-icons/bs'

interface Props {
  requestTerritoryHandler?: (territoryType: string) => void
}

const useStyles = createStyles(() => ({
  item: {
    '&[data-hovered]': {
      backgroundColor: 'transparent',

    },
  },
}));

const RequestTerritoryButton = ({ requestTerritoryHandler }: Props) => {
  const { classes } = useStyles();
  return (
    <>
      <Menu shadow="md" classNames={classes}>
        <Menu.Target>
          <Button className="px-10 py-1 min-h-[40px] w-full mt-4 font-medium text-base text-white transition-all duration-100 rounded-sm lg:min-h-[48px] lg:max-w-[300px] active:bg-teal-blue bg-accent dark:bg-accent-dark hover:bg-accent/70 font-Roboto">
            Request New Territory
          </Button>
        </Menu.Target>

        <Menu.Dropdown  className="flex w-full max-w-[263.02px] lg:max-w-[300px] bg-white/90 border-2 border-solid border-htd-grey/30 dark:border-htd-grey-dark/30 dark:bg-black/90 backdrop-blur-sm">
          <Menu.Label>Request Territory Type</Menu.Label>
          <Menu.Item
            onClick={() => {
              requestTerritoryHandler('Standard Territory')
            }}
          >
            <div className='flex items-center w-full gap-3 text-base font-medium tracking-wide font-OpenSans text-off-black dark:text-white hover:text-dark-blue hover:dark:text-light-blue'>
              <IoBag className='text-off-black/75 dark:text-off-white/50' />
              <span>Standard</span>
            </div>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              requestTerritoryHandler('Business Territory')
            }}
          >
            <div className='flex items-center w-full gap-3 text-base font-medium tracking-wide font-OpenSans text-off-black dark:text-white hover:text-dark-blue hover:dark:text-light-blue'>
              <IoBusiness className='text-off-black/75 dark:text-off-white/50' />
              <span>Business</span>
            </div>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              requestTerritoryHandler('Rural Territory')
            }}
          >
            <div className='flex items-center w-full gap-3 text-base font-medium tracking-wide font-OpenSans text-off-black dark:text-white hover:text-dark-blue hover:dark:text-light-blue'>
              <GiMountainRoad className='text-off-black/75 dark:text-off-white/50' />
              <span>Rural</span>
            </div>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              requestTerritoryHandler('Letter Writing Territory')
            }}
          >
            <div className='flex items-center w-full gap-3 text-base font-medium tracking-wide font-OpenSans text-off-black dark:text-white hover:text-dark-blue hover:dark:text-light-blue'>
              <BsEnvelopeOpenFill className='text-off-black/75 dark:text-off-white/50' />
              <span>Letter Writing</span>
            </div>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              requestTerritoryHandler('Telephone Territory')
            }}
          >
            <div className='flex items-center w-full gap-3 text-base font-medium tracking-wide font-OpenSans text-off-black dark:text-white hover:text-dark-blue hover:dark:text-light-blue'>
              <BsTelephoneFill className='text-off-black/75 dark:text-off-white/50' />
              <span>Telephone</span>
            </div>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}

export default RequestTerritoryButton
