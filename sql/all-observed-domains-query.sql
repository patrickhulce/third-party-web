SELECT domain, COUNT(*) as totalOccurrences
FROM (
  SELECT page, NET.REG_DOMAIN(url) AS domain,
  FROM `httparchive.requests.2024_06_01_mobile`
  GROUP BY page, domain
)
GROUP BY domain
HAVING totalOccurrences >= 50
ORDER BY totalOccurrences DESC
