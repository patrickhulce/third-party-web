SELECT
    domain,
    COUNT(0) AS totalOccurrences
FROM
    (
        SELECT
            page,
            NET.HOST(url) AS domain,
            COUNT(0) AS totalOccurrences
        FROM
            `httparchive.requests.2022_01_01_mobile`
        GROUP BY
            page,
            domain
    )
GROUP BY
    domain
HAVING
    totalOccurrences >= 50
ORDER BY
    totalOccurrences DESC