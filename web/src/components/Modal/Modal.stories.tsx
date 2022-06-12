import Modal from './Modal'

export const generated = () => {
  const fn = () => {
    alert('Hello World')
  }

  return (
    <Modal
      title="Test Component"
      heading="This component is working"
      text="Everything is working so far!"
      className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      fn={fn}
    />
  )
}

export default { title: 'Components/Modal' }
