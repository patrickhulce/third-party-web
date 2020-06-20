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
  FROM <%= from_statement %>
  GROUP BY pageUrl, observedDomain
)
GROUP BY
  observedDomain
HAVING
  totalOccurrences > 50
ORDER BY
  totalOccurrences DESC
