import { Loading, Empty, Failure, Success } from './AvailableTerritoriesCell'
import { standard } from './AvailableTerritoriesCell.mock'

export const loading = () => {
  return Loading ? <Loading /> : null
}

export const empty = () => {
  return Empty ? <Empty /> : null
}

export const failure = () => {
  return Failure ? <Failure error={new Error('Oh no')} /> : null
}

export const success = () => {
  return Success ? (
    <Success availableTerritories={standard().availableTerritories} />
  ) : null
}

export default { title: 'Cells/AvailableTerritoriesCell' }
