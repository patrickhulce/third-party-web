import React, {useRef, Suspense, useState} from 'react'
import useComponentSize from '@rehooks/component-size'
import classNames from 'classnames'

import SEO from '../components/seo'

const DataPicker = ({currentValue, setValue, options}) => {
  return (
    <div className="data-picker">
      {options.map(({label, value, tooltip}) => (
        <div
          title={tooltip}
          key={value}
          className={classNames('data-picker__option', {
            'data-picker__option--active': value === currentValue,
          })}
          onClick={() => setValue(value)}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

const VisualizationPage = () => {
  const [metric, setMetric] = useState('totalExecutionTime')
  const [vizType, setVizType] = useState('treemap')
  const ref = useRef(null)
  const {width: clientWidth, height: clientHeight} = useComponentSize(ref)
  const loader = <div className="loader-ring" />

  let element = loader
  if (typeof window !== 'undefined') {
    const DataVisualizationD3 = React.lazy(() =>
      import('../components/data-visualizations/d3-viz.js')
    )

    element = (
      <Suspense fallback={loader}>
        <DataVisualizationD3
          vizType={vizType}
          metric={metric}
          width={clientWidth}
          height={clientHeight - 180}
        />
      </Suspense>
    )
  }

  return (
    <>
      <SEO title="Data" keywords={['third-party', 'report', 'web', 'lighthouse', 'HTTPArchive']} />
      <div className="data-pickers-container">
        <DataPicker
          currentValue={metric}
          setValue={setMetric}
          options={[
            {
              label: 'Total Impact',
              value: 'totalExecutionTime',
              tooltip: [
                'This measure how long all of the scripts across the entire web for the entity take to execute, in aggregate.',
                'Largest entities here have the most impact on the performance of the web as a whole.',
              ].join(' '),
            },
            {
              label: 'Total Usage',
              value: 'totalOccurrences',
              tooltip: [
                'This measure how many scripts across the entire web are seen for the entity.',
                'Largest visualizations here are the most popular third parties.',
              ].join(' '),
            },
            {
              label: 'Average Impact',
              value: 'averageExecutionTime',
              tooltip: [
                'This measure how long each script for the entity takes to execute, on average.',
                'Largest entities here are the worst performing third parties.',
              ].join(' '),
            },
          ]}
        />
        {clientWidth < 600 ? null : (
          <DataPicker
            currentValue={vizType}
            setValue={setVizType}
            options={[{label: 'Treemap', value: 'treemap'}, {label: 'Bar', value: 'barchart'}]}
          />
        )}
      </div>
      <div ref={ref} className="visualizations transparent-container">
        {element}
      </div>
    </>
  )
}

export default VisualizationPage
