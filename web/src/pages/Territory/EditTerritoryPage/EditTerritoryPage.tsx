import EditTerritoryCell from 'src/components/Territory/EditTerritoryCell'

type TerritoryPageProps = {
  id: string
}

const EditTerritoryPage = ({ id }: TerritoryPageProps) => {
  return <EditTerritoryCell id={id} />
}

export default EditTerritoryPage
