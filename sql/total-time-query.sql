SELECT
  SUM(FLOAT(JSON_EXTRACT(report, '$.audits.bootup-time.rawValue'))) AS totalExecutionTime
FROM [httparchive:lighthouse.2018_07_01_mobile]
