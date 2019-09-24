SELECT
  thirdPartyDomain,
  COUNT(*) AS totalRequests,
  SUM(requestBytes) AS totalBytes
FROM (
  SELECT
      page AS pageUrl,
      NET.HOST(page) AS pageOrigin,
      url AS requestUrl,
      REGEXP_EXTRACT(payload, r'(?i)content-type:\s*([a-z0-9_\/-]+)') AS contentType,
      SAFE_CAST(REGEXP_EXTRACT(payload, r'_bytesIn":(\d+)') AS INT64) AS requestBytes,
      NET.HOST(url) AS requestOrigin,
      DomainsOver50Table.requestDomain as thirdPartyDomain,
      ThirdPartyTable.category as thirdPartyCategory
    FROM
      `httparchive.sample_data.requests_mobile_1k`
    LEFT JOIN
      `lighthouse-infrastructure.third_party_web.2019_06_20` AS ThirdPartyTable
    ON NET.HOST(url) = ThirdPartyTable.domain
    LEFT JOIN
      `lighthouse-infrastructure.third_party_web.2019_05_22_all_observed_domains` AS DomainsOver50Table
    ON NET.HOST(url) = DomainsOver50Table.requestDomain
)
GROUP BY
  thirdPartyDomain
ORDER BY
  totalRequests DESC
LIMIT 1000

