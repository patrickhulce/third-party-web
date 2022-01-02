SELECT
  observedDomain,
  SUM(totalExecutionTime) AS totalExecutionTime,
  COUNT(totalExecutionTime) AS totalOccurrences,
  SUM(totalOccurrences) AS totalScripts,
  AVG(totalExecutionTime) AS averageExecutionTime,
  AVG(averageExecutionTime) AS averageScriptExecutionTime
FROM (
  SELECT
    pageUrl,
    observedDomain,
    SUM(executionTime) AS totalExecutionTime,
    COUNT(executionTime) AS totalOccurrences,
    AVG(executionTime) AS averageExecutionTime
  FROM (
    SELECT
  domain,
  canonicalDomain,
  category,
  JSON_VALUE(report, '$.requestedUrl') AS pageUrl,
  NET.HOST(JSON_VALUE(bootupTimeItems, '$.url')) AS observedDomain,
  JSON_VALUE(bootupTimeItems, '$.url') AS scriptUrl,
  SAFE_CAST(JSON_VALUE(bootupTimeItems,
      "$.scripting") AS FLOAT64) AS executionTime
FROM (
  SELECT
    url AS page,
    report
  FROM
    `httparchive.lighthouse.2020_05_01_mobile`
  ),
  UNNEST(JSON_QUERY_ARRAY(report,
      '$.audits.bootup-time.details.items')) AS bootupTimeItems
  INNER JOIN
    `lighthouse-infrastructure.third_party_web.2020_05_01`
  ON NET.HOST(JSON_VALUE(bootupTimeItems, "$.url")) = domain
  )
  GROUP BY pageUrl, observedDomain
)
GROUP BY
  observedDomain
HAVING
  totalOccurrences > 50
ORDER BY
  totalOccurrences DESC
