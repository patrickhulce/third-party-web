SELECT
  COUNT(*),
  COUNTIF(pageDomain = requestDomain) AS matchingDomains,
  COUNTIF(pageETld = requestETld) AS matchingETlds,
  COUNTIF(requestCanonicalDomain IS NULL) as hasNoMatchingThirdParty,
  COUNTIF(requestDomainOver50 IS NULL) as hasNoMatchingDomainOver50
FROM (
  SELECT
    page AS pageUrl,
    NET.HOST(page) AS pageDomain,
    REGEXP_EXTRACT(NET.HOST(page), r'([^.]+\.(?:[^.]+|(?:gov|com|co|ne)\.\w{2})$)') AS pageETld,
    url AS requestUrl,
    NET.HOST(url) AS requestDomain,
    REGEXP_EXTRACT(NET.HOST(url), r'([^.]+\.(?:[^.]+|(?:gov|com|co|ne)\.\w{2})$)') AS requestETld,
    canonicalDomain as requestCanonicalDomain,
    DomainsOver50Table.requestDomain as requestDomainOver50
  FROM
    `httparchive.requests.2019_05_01_desktop`
  LEFT JOIN
    `lighthouse-infrastructure.third_party_web.2019_05_22`
  ON NET.HOST(url) = domain
  LEFT JOIN
    `lighthouse-infrastructure.third_party_web.2019_05_22_all_observed_domains` AS DomainsOver50Table
  ON NET.HOST(url) = DomainsOver50Table.requestDomain
)

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
    `httparchive.requests.2019_05_01_desktop`
    GROUP BY pageUrl, requestDomain
)
GROUP BY requestDomain
HAVING numberOfPages >= 50
