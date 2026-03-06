export interface ConnectorResult {
    connectorType: string;
    query: string;
    results: SearchResult[];
    generatedAt: string;
}

export interface SearchResult {
    title: string;
    url: string;
    description: string;
    category: string;
    platform?: string;
    isVerified?: boolean;
    error?: string;
    metadata?: Record<string, any>;
}
