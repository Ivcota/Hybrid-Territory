import { Loading, Empty, Failure, Success } from './MyTerritoriesCell'
import { standard } from './MyTerritoriesCell.mock'

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
  return Success ? <Success {...standard().myTerritories} /> : null
}

export default { title: 'Cells/MyTerritoriesCell' }
