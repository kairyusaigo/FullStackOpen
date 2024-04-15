const Notification = ({message, isError}) => {
  if (message === '') {
    return null
  }
  const type = (isError ? 'error' : 'success')
  console.log ('isError: ', isError)
  console.log('type: ', type)
  return (
    <div className={`${type} notification`}>{message}</div>
  )
}
export default Notification