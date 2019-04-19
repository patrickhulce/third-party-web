import React, {useState, useEffect, useRef, Suspense} from 'react'
import useComponentSize from '@rehooks/component-size'

const DataVisualization = () => {
  const ref = useRef(null)
  const {width: clientWidth, height: clientHeight} = useComponentSize(ref)
  const loader = <div className="loader-ring" />

  let element = loader
  if (typeof window !== 'undefined') {
    const DataVisualizationD3 = React.lazy(() => import('./data-visualization-d3'))

    element = (
      <Suspense fallback={loader}>
        <DataVisualizationD3 width={clientWidth} height={clientHeight - 180} />
      </Suspense>
    )
  }

  return (
    <div ref={ref} className="data-visualization transparent-container">
      {element}
    </div>
  )
}
export default DataVisualization
