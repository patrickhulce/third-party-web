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
  WHERE canonicalDomain IS NOT NULL
  GROUP BY pageUrl, canonicalDomain
)
GROUP BY
  canonicalDomain
ORDER BY
  totalOccurrences DESC
