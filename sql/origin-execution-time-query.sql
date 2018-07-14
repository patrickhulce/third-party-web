SELECT
  REGEXP_EXTRACT(url, r'http.*?://([^\/]+)') as origin,
  SUM(executionTime) AS totalExecutionTime,
  COUNT(executionTime) AS totalOccurrences,
  AVG(executionTime) AS averageExecutionTime
FROM (
  SELECT
    JSON_EXTRACT(report, '$.audits.bootup-time.details.items[0].url') AS url,
    FLOAT(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[0].scripting')) as executionTime
  FROM
    [httparchive:lighthouse.2018_07_01_mobile]),
  (
  SELECT
    JSON_EXTRACT(report, '$.audits.bootup-time.details.items[1].url') AS url,
    FLOAT(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[1].scripting')) as executionTime
  FROM
    [httparchive:lighthouse.2018_07_01_mobile]),
  (
  SELECT
    JSON_EXTRACT(report, '$.audits.bootup-time.details.items[2].url') AS url,
    FLOAT(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[2].scripting')) as executionTime
  FROM
    [httparchive:lighthouse.2018_07_01_mobile]),
  (
  SELECT
    JSON_EXTRACT(report, '$.audits.bootup-time.details.items[3].url') AS url,
    FLOAT(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[3].scripting')) as executionTime
  FROM
    [httparchive:lighthouse.2018_07_01_mobile]),
  (
  SELECT
    JSON_EXTRACT(report, '$.audits.bootup-time.details.items[4].url') AS url,
    FLOAT(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[4].scripting')) as executionTime
  FROM
    [httparchive:lighthouse.2018_07_01_mobile]),
  (
  SELECT
    JSON_EXTRACT(report, '$.audits.bootup-time.details.items[5].url') AS url,
    FLOAT(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[5].scripting')) as executionTime
  FROM
    [httparchive:lighthouse.2018_07_01_mobile]),
  (
  SELECT
    JSON_EXTRACT(report, '$.audits.bootup-time.details.items[6].url') AS url,
    FLOAT(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[6].scripting')) as executionTime
  FROM
    [httparchive:lighthouse.2018_07_01_mobile]),
  (
  SELECT
    JSON_EXTRACT(report, '$.audits.bootup-time.details.items[7].url') AS url,
    FLOAT(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[7].scripting')) as executionTime
  FROM
    [httparchive:lighthouse.2018_07_01_mobile]),
  (
  SELECT
    JSON_EXTRACT(report, '$.audits.bootup-time.details.items[8].url') AS url,
    FLOAT(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[8].scripting')) as executionTime
  FROM
    [httparchive:lighthouse.2018_07_01_mobile]),
  (
  SELECT
    JSON_EXTRACT(report, '$.audits.bootup-time.details.items[9].url') AS url,
    FLOAT(JSON_EXTRACT(report, '$.audits.bootup-time.details.items[9].scripting')) as executionTime
  FROM
    [httparchive:lighthouse.2018_07_01_mobile])
GROUP BY
  origin
HAVING
  totalOccurrences > 100
ORDER BY
  totalOccurrences DESC
LIMIT
  1000
