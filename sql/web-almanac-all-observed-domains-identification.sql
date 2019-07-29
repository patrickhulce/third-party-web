SELECT
  requestDomain,
  COUNT(*) as numberOfPages,
  SUM(requestsOnPage) as totalRequests
FROM (
  SELECT
    page AS pageUrl,
    NET.HOST(url) AS requestDomain,
    COUNT(*) as requestsOnPage
  FROM
    `httparchive.requests.2019_07_01_mobile`
    GROUP BY pageUrl, requestDomain
)
GROUP BY requestDomain
HAVING numberOfPages >= 50
