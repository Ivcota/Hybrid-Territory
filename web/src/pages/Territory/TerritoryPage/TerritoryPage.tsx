import { Link, routes } from '@redwoodjs/router'
import TerritoryCell from 'src/components/Territory/TerritoryCell'

type TerritoryPageProps = {
  id: string
}

const TerritoryPage = ({ id }: TerritoryPageProps) => {
  return <TerritoryCell id={id} />
}

export default TerritoryPage
