SELECT
  domain,
  canonicalDomain,
  JSON_EXTRACT(report, '$.requestedUrl') AS pageUrl,
  NET.HOST(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[<%= i %>].url')) as origin,
  JSON_EXTRACT(report, '$.audits.bootup-time.details.items[<%= i %>].url') AS url,
  SAFE_CAST(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[<%= i %>].scripting') AS FLOAT64) as executionTime
FROM
  `httparchive.lighthouse.2019_03_01_mobile`
JOIN
  `lighthouse-infrastructure.third_party_web.2019_05`
ON NET.HOST(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[<%= i %>].url')) = domain
<%= where %>
