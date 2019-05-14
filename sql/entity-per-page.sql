SELECT
  canonicalDomain,
  SUM(totalExecutionTime) AS totalExecutionTime,
  COUNT(totalExecutionTime) AS totalOccurrences,
  SUM(totalOccurrences) AS totalScripts,
  AVG(totalExecutionTime) AS averageExecutionTime,
  AVG(averageExecutionTime) AS averageScriptExecutionTime
FROM (
  SELECT
    pageUrl,
    canonicalDomain,
    SUM(executionTime) AS totalExecutionTime,
    COUNT(executionTime) AS totalOccurrences,
    AVG(executionTime) AS averageExecutionTime
  FROM <%= from_statement %>
  GROUP BY pageUrl, canonicalDomain
)
GROUP BY
  canonicalDomain
HAVING
  totalOccurrences > 100
ORDER BY
  totalOccurrences DESC
