SELECT
  observedDomain as domain,
  SUM(executionTime) AS totalExecutionTime,
  COUNT(executionTime) AS totalOccurrences,
  AVG(executionTime) AS averageExecutionTime
FROM <%= from_statement %>
GROUP BY
  domain
HAVING
  totalOccurrences > 50
ORDER BY
  totalOccurrences DESC
