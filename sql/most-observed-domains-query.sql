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
            `httparchive.crawl.requests`
        WHERE
            date = "2022-01-01"
        AND
            client = "mobile"
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