SELECT
  SUM(executionTime) AS totalExecutionTime,
  COUNT(executionTime) AS totalOccurrences
FROM <%= from_statement %>
