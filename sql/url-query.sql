SELECT
  REGEXP_EXTRACT(url, r'http.*?://(.+)"') as schemelessURL,
  SUM(executionTime) AS totalExecutionTime,
  COUNT(executionTime) AS totalOccurrences,
  AVG(executionTime) AS averageExecutionTime
FROM <%= from_statement %>
<%= where %>
GROUP BY
  schemelessURL
HAVING
  totalOccurrences > 50
ORDER BY
  totalOccurrences DESC
LIMIT
  1000
