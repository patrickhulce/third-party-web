SELECT
  COUNT(*) as numberOfPages,
  COUNTIF(numberOfThirdPartyRequests > 0) AS numberOfPagesWithThirdParty,
  COUNTIF(numberOfAdRequests > 0) AS numberOfPagesWithAd,
  APPROX_QUANTILES(numberOfThirdPartyRequests / numberOfRequests, 100) AS percentThirdPartyRequestsQuantiles,
  APPROX_QUANTILES(numberOfAdRequests / numberOfRequests, 100) AS percentAdRequestsQuantiles,
  APPROX_QUANTILES(numberOfAnalyticsRequests / numberOfRequests, 100) as percentAnalyticsRequestsQuantiles,
  APPROX_QUANTILES(numberOfSocialRequests / numberOfRequests, 100) as percentSocialRequestsQuantiles,
  APPROX_QUANTILES(numberOfVideoRequests / numberOfRequests, 100) as percentVideoRequestsQuantiles,
  APPROX_QUANTILES(numberOfUtilityRequests / numberOfRequests, 100) as percentUtilityRequestsQuantiles,
  APPROX_QUANTILES(numberOfHostingRequests / numberOfRequests, 100) as percentHostingRequestsQuantiles,
  APPROX_QUANTILES(numberOfMarketingRequests / numberOfRequests, 100) as percentMarketingRequestsQuantiles,
  APPROX_QUANTILES(numberOfCustomerSuccessRequests / numberOfRequests, 100) as percentCustomerSuccessRequestsQuantiles,
  APPROX_QUANTILES(numberOfContentRequests / numberOfRequests, 100) as percentContentRequestsQuantiles,
  APPROX_QUANTILES(numberOfCdnRequests / numberOfRequests, 100) as percentCdnRequestsQuantiles,
  APPROX_QUANTILES(numberOfTagManagerRequests / numberOfRequests, 100) as percentTagManagerRequestsQuantiles,
  APPROX_QUANTILES(numberOfOtherRequests / numberOfRequests, 100) as percentOtherRequestsQuantiles,
  APPROX_QUANTILES(numberOfThirdPartyBytes / numberOfBytes, 100) AS percentThirdPartyBytesQuantiles,
  APPROX_QUANTILES(numberOfAdBytes / numberOfBytes, 100) AS percentAdBytesQuantiles,
  APPROX_QUANTILES(numberOfAnalyticsBytes / numberOfBytes, 100) as percentAnalyticsBytesQuantiles,
  APPROX_QUANTILES(numberOfSocialBytes / numberOfBytes, 100) as percentSocialBytesQuantiles,
  APPROX_QUANTILES(numberOfVideoBytes / numberOfBytes, 100) as percentVideoBytesQuantiles,
  APPROX_QUANTILES(numberOfUtilityBytes / numberOfBytes, 100) as percentUtilityBytesQuantiles,
  APPROX_QUANTILES(numberOfHostingBytes / numberOfBytes, 100) as percentHostingBytesQuantiles,
  APPROX_QUANTILES(numberOfMarketingBytes / numberOfBytes, 100) as percentMarketingBytesQuantiles,
  APPROX_QUANTILES(numberOfCustomerSuccessBytes / numberOfBytes, 100) as percentCustomerSuccessBytesQuantiles,
  APPROX_QUANTILES(numberOfContentBytes / numberOfBytes, 100) as percentContentBytesQuantiles,
  APPROX_QUANTILES(numberOfCdnBytes / numberOfBytes, 100) as percentCdnBytesQuantiles,
  APPROX_QUANTILES(numberOfTagManagerBytes / numberOfBytes, 100) as percentTagManagerBytesQuantiles,
  APPROX_QUANTILES(numberOfOtherBytes / numberOfBytes, 100) as percentOtherBytesQuantiles
FROM (
  SELECT
    pageUrl,
    COUNT(*) as numberOfRequests,
    COUNTIF(thirdPartyDomain IS NULL) AS numberOfFirstPartyRequests,
    COUNTIF(thirdPartyDomain IS NOT NULL) AS numberOfThirdPartyRequests,
    COUNTIF(thirdPartyCategory = 'ad') AS numberOfAdRequests,
    COUNTIF(thirdPartyCategory = 'analytics') as numberOfAnalyticsRequests,
    COUNTIF(thirdPartyCategory = 'social') as numberOfSocialRequests,
    COUNTIF(thirdPartyCategory = 'video') as numberOfVideoRequests,
    COUNTIF(thirdPartyCategory = 'utility') as numberOfUtilityRequests,
    COUNTIF(thirdPartyCategory = 'hosting') as numberOfHostingRequests,
    COUNTIF(thirdPartyCategory = 'marketing') as numberOfMarketingRequests,
    COUNTIF(thirdPartyCategory = 'customer-success') as numberOfCustomerSuccessRequests,
    COUNTIF(thirdPartyCategory = 'content') as numberOfContentRequests,
    COUNTIF(thirdPartyCategory = 'cdn') as numberOfCdnRequests,
    COUNTIF(thirdPartyCategory = 'tag-manager') as numberOfTagManagerRequests,
    COUNTIF(thirdPartyCategory = 'other') as numberOfOtherRequests,
    SUM(requestBytes) AS numberOfBytes,
    SUM(IF(thirdPartyDomain IS NULL, requestBytes, 0)) AS numberOfFirstPartyBytes,
    SUM(IF(thirdPartyDomain IS NOT NULL, requestBytes, 0)) AS numberOfThirdPartyBytes,
    SUM(IF(thirdPartyCategory = 'ad', requestBytes, 0)) AS numberOfAdBytes,
    SUM(IF(thirdPartyCategory = 'analytics', requestBytes, 0)) as numberOfAnalyticsBytes,
    SUM(IF(thirdPartyCategory = 'social', requestBytes, 0)) as numberOfSocialBytes,
    SUM(IF(thirdPartyCategory = 'video', requestBytes, 0)) as numberOfVideoBytes,
    SUM(IF(thirdPartyCategory = 'utility', requestBytes, 0)) as numberOfUtilityBytes,
    SUM(IF(thirdPartyCategory = 'hosting', requestBytes, 0)) as numberOfHostingBytes,
    SUM(IF(thirdPartyCategory = 'marketing', requestBytes, 0)) as numberOfMarketingBytes,
    SUM(IF(thirdPartyCategory = 'customer-success', requestBytes, 0)) as numberOfCustomerSuccessBytes,
    SUM(IF(thirdPartyCategory = 'content', requestBytes, 0)) as numberOfContentBytes,
    SUM(IF(thirdPartyCategory = 'cdn', requestBytes, 0)) as numberOfCdnBytes,
    SUM(IF(thirdPartyCategory = 'tag-manager', requestBytes, 0)) as numberOfTagManagerBytes,
    SUM(IF(thirdPartyCategory = 'other', requestBytes, 0)) as numberOfOtherBytes
  FROM (
    SELECT
      page AS pageUrl,
      NET.HOST(page) AS pageOrigin,
      url AS requestUrl,
      resp_content_type as contentType,
      respBodySize AS requestBytes,
      NET.HOST(url) AS requestOrigin,
      DomainsOver50Table.requestDomain as thirdPartyDomain,
      ThirdPartyTable.category as thirdPartyCategory
    FROM
      `httparchive.almanac.summary_requests`
    LEFT JOIN
      `lighthouse-infrastructure.third_party_web.2019_06_20` AS ThirdPartyTable
    ON NET.HOST(url) = ThirdPartyTable.domain
    LEFT JOIN
      `lighthouse-infrastructure.third_party_web.2019_05_22_all_observed_domains` AS DomainsOver50Table
    ON NET.HOST(url) = DomainsOver50Table.requestDomain
  )
  GROUP BY
    pageUrl
)
