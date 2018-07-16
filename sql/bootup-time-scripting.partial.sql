SELECT
  JSON_EXTRACT(report, '$.audits.bootup-time.details.items[<%= i %>].url') AS url,
  FLOAT(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[<%= i %>].scripting')) as executionTime
FROM
  [httparchive:lighthouse.2018_07_01_mobile]
<%= where %>
