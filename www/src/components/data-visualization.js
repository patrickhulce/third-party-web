import React, {useState, useEffect} from 'react'

/** @type {typeof import('third-party-web')} */
let thirdPartyWebModule
const asyncThirdPartyData = import('third-party-web').then(value => (thirdPartyWebModule = value))

const DataVisualization = () => {
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    const requestData = async () => {
      setHasLoaded(!!thirdPartyWebModule)
      await asyncThirdPartyData
      setHasLoaded(!!thirdPartyWebModule)
    }

    requestData()
    return requestData
  })

  if (!hasLoaded) {
    return <h1>Loading...</h1>
  }

  return <h1>Loaded!</h1>
}
export default DataVisualization
