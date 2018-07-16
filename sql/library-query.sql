SELECT
  CASE
    WHEN url CONTAINS "ajax.googleapis.com/ajax/libs" THEN REGEXP_REPLACE(REGEXP_EXTRACT(url, r'ajax.libs.([^\/]+)'), r'\.js', 'js')
    WHEN url CONTAINS "cdnjs.cloudflare.com/ajax/libs" THEN REGEXP_REPLACE(REGEXP_EXTRACT(url, r'ajax.libs.([^\/]+)'), r'\.js', 'js')
    WHEN url CONTAINS "code.jquery.com/ui/" THEN "jqueryui"
    WHEN url CONTAINS "code.jquery.com" THEN "jquery"
    WHEN url CONTAINS "use.fontawesome.com" THEN "fontawesome"
    WHEN url CONTAINS "cdn.jsdelivr.net/npm" THEN REGEXP_REPLACE(REGEXP_EXTRACT(url, r'jsdelivr.net.npm.([^\/]+)'), r'\.js', 'js')
    WHEN url CONTAINS "cdn.jsdelivr.net/" THEN REGEXP_REPLACE(REGEXP_EXTRACT(url, r'jsdelivr.net.([^\/]+)'), r'\.js', 'js')
  END as library,
  SUM(executionTime) AS totalExecutionTime,
  COUNT(executionTime) AS totalOccurrences,
  AVG(executionTime) AS averageExecutionTime
FROM <%= from_statement %>
<%= where %>
GROUP BY
  library
HAVING
  totalOccurrences > 50
ORDER BY
  totalOccurrences DESC
LIMIT
  1000
