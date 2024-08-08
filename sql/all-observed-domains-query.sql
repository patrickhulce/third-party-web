CREATE TEMP TABLE
    entities (name STRING, domain STRING) AS
SELECT
    JSON_VALUE(entity, '$.name') AS name,
    JSON_VALUE(entity, '$.domain') as domain
FROM
    UNNEST (JSON_QUERY_ARRAY(@entities_string, '$')) AS entity;

-- Map each observed domain and count to entity
CREATE TEMP TABLE
    entity_domain_count (domain STRING, totalOccurrences INT, name STRING) AS
SELECT
    domain_occurrences.domain as domain,
    domain_occurrences.totalOccurrences as totalOccurrences,
    entities.name as name,
FROM
    (
        -- How many times an observed domain is called in archive
        SELECT
            domain,
            COUNT(0) AS totalOccurrences
        FROM
            (
                SELECT
                    page,
                    NET.HOST(url) AS domain
                FROM
                    `httparchive.requests.2022_01_01_mobile`
                GROUP BY
                    page,
                    domain
            )
        GROUP BY
            domain
    ) as domain_occurrences
    JOIN
    -- Mapping between a domain and an entity
    entities ON domain_occurrences.domain LIKE REPLACE(entities.domain, '*', '%');

-- Get entities with at least 50 observed domains
WITH
    entity_count AS (
        SELECT
            name,
            SUM(totalOccurrences) as totalOccurrences
        FROM
            entity_domain_count
        GROUP BY
            name
        HAVING
            totalOccurrences >= 50
    )
    -- Get observed domains owned by entities with at least 50 observed domains
SELECT
    entity_domain_count.domain,
    entity_domain_count.totalOccurrences
FROM
    entity_domain_count
    JOIN entity_count ON entity_count.name = entity_domain_count.name
ORDER BY
    totalOccurrences DESC