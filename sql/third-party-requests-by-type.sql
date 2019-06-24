SELECT
  COUNT(*),
  COUNTIF(pageOrigin = requestOrigin) AS matchingOrigins,
  COUNTIF(pageETld = requestETld) AS matchingETlds,
  SUM(bytes) AS totalBytes,
  contentType
FROM (
  SELECT
    page AS pageUrl,
    NET.HOST(page) AS pageOrigin,
    REGEXP_EXTRACT(NET.HOST(page), r'([^.]+\.(?:[^.]+|(?:gov|com|co|ne)\.\w{2})$)') AS pageETld,
    url AS requestUrl,
    NET.HOST(url) AS requestOrigin,
    REGEXP_EXTRACT(NET.HOST(url), r'([^.]+\.(?:[^.]+|(?:gov|com|co|ne)\.\w{2})$)') AS requestETld,
    REGEXP_EXTRACT(payload, r'(?i)content-type:\s*([a-z0-9_\/-]+)') AS contentType,
    SAFE_CAST(REGEXP_EXTRACT(payload, r'_bytesIn":(\d+)') AS INT64) AS bytes
  FROM
    `httparchive.requests.2019_05_01_desktop` )
JOIN
  `lighthouse-infrastructure.third_party_web.2019_05_22_all_observed_domains`
GROUP BY
  contentType
LIMIT
  100
