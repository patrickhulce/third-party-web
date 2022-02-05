import React, {useRef, Suspense, useState} from 'react'
import useComponentSize from '@rehooks/component-size'
import classNames from 'classnames'

import SEO from '../components/seo'

const DataPicker = ({currentValue, setValue, options}) => {
  const activeOption = options.find(option => option.value === currentValue)

  return (
    <>
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
      {activeOption && activeOption.tooltip ? (
        <div className="data-picker__explanation">{activeOption.tooltip}</div>
      ) : null}
    </>
  )
}

const VisualizationPage = () => {
  const [metric, setMetric] = useState('averageExecutionTime')
  const [vizType, setVizType] = useState('treemap')
  const ref = useRef(null)
  const {width: clientWidth, height: clientHeight} = useComponentSize(ref)
  const loader = <div className="loader-ring" />

  let element = loader
  if (typeof window !== 'undefined') {
    const DataVisualizationD3 = React.lazy(() => import('../components/data-visualizations/d3-viz'))

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
              label: 'Average Cost',
              value: 'averageExecutionTime',
              tooltip: [
                "This visualizes how long the entity's scripts take to execute, on average.",
                "Largest entities here have the worst performance impact to the pages they're on.",
              ].join(' '),
            },
            {
              label: 'Total Impact',
              value: 'totalExecutionTime',
              tooltip: [
                'This visualizes how long all of the scripts across the entire web take to execute, in aggregate.',
                'Largest entities here have the largest impact on the performance of the web as a whole.',
              ].join(' '),
            },
            {
              label: 'Popularity',
              value: 'totalOccurrences',
              tooltip: [
                'This visualizes how many pages across the entire web include the entity.',
                'Largest visualizations here are the most popular third parties.',
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
