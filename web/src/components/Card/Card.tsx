import { FC } from 'react'

type CardType = 'green' | 'red'

interface Props {
  cardType: CardType
}

const Card: FC<Props> = ({ cardType }) => {
  return (
    <div
      className={`max-w-sm p-2 rounded-sm shadow shadow-em ${
        cardType === 'green' ? 'bg-emerald-500' : 'bg-red-500'
      }`}
    >
      <h2 className="text-xl font-black">{'Card'}</h2>
      <p>{'Find me in ./web/src/components/Card/Card.tsx'}</p>
    </div>
  )
}

export default Card
