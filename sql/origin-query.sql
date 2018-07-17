SELECT
  REGEXP_EXTRACT(url, r'http.*?://([^\/]+)') as origin,
  SUM(executionTime) AS totalExecutionTime,
  COUNT(executionTime) AS totalOccurrences,
  AVG(executionTime) AS averageExecutionTime
FROM <%= from_statement %>
GROUP BY
  origin
HAVING
  totalOccurrences > 100
ORDER BY
  totalOccurrences DESC
LIMIT
  1000
