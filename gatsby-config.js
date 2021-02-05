module.exports = {
    plugins: [
        // Simple config, passing URL
        {
            resolve: "gatsby-source-graphql",
            options: {
                // Arbitrary name for the remote schema Query type
                typeName: "lolly",
                // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
                fieldName: "lolly",
                // Url to query from
                url: "https://virtual-lolly-1234.netlify.app/.netlify/functions/graphql",
                // refetch interval in seconds
                refetchInterval: 60,
            },
        }
    ]
}