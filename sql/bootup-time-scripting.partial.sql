SELECT
  JSON_EXTRACT(report, '$.audits.bootup-time.details.items[<%= i %>].url') AS url,
  FLOAT(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[<%= i %>].scripting')) as executionTime
FROM
  [httparchive:lighthouse.2019_03_01_mobile]
<%= where %>
