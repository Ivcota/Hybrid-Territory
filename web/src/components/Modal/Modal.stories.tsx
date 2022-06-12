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
      fn={fn}
    />
  )
}

export default { title: 'Components/Modal' }
