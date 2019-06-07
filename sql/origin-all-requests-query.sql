SELECT
  REGEXP_EXTRACT(url, r'http.*?://([^\/]+)') AS origin,
  COUNT(url) AS totalOccurrences,
FROM
  `httparchive.lighthouse.2019_04_01_mobile`
GROUP BY
  origin
HAVING
  totalOccurrences > 50
ORDER BY
  totalOccurrences DESC
LIMIT
  10000
