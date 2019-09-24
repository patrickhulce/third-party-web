SELECT
  domain,
  canonicalDomain,
  category,
  JSON_EXTRACT(report, '$.requestedUrl') AS pageUrl,
  NET.HOST(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[<%= i %>].url')) AS observedDomain,
  JSON_EXTRACT(report, '$.audits.bootup-time.details.items[<%= i %>].url') AS scriptUrl,
  SAFE_CAST(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[<%= i %>].scripting') AS FLOAT64) AS executionTime
FROM
  `httparchive.lighthouse.2019_07_01_mobile`
LEFT JOIN
  `lighthouse-infrastructure.third_party_web.2019_07_01`
ON NET.HOST(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[<%= i %>].url')) = domain
<%= where %>
