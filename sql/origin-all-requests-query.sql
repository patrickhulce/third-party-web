SELECT
  REGEXP_EXTRACT(url, r'http.*?://([^\/]+)') AS origin,
  COUNT(url) AS totalOccurrences,
FROM
  [httparchive:requests.2019_02_01_mobile]
GROUP BY
  origin
HAVING
  totalOccurrences > 100
ORDER BY
  totalOccurrences DESC
LIMIT
  10000
