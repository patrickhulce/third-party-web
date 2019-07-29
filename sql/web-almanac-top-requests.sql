SELECT
  requestUrl,
  COUNT(*) AS totalRequests,
  SUM(requestBytes) AS totalBytes
FROM (
  SELECT
      url AS requestUrl,
      SAFE_CAST(REGEXP_EXTRACT(payload, r'_bytesIn":(\d+)') AS INT64) AS requestBytes
    FROM
      `httparchive.sample_data.requests_mobile_1k`
)
ORDER BY
  totalRequests DESC
GROUP BY
  requestUrl
LIMIT 1000

