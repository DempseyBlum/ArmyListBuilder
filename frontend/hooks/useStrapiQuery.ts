import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery,
} from "@apollo/client";

export function useStrapiQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> {
  return useQuery<TData, TVariables>(query, {
    ...options,
    context: {
      serviceName: "strapi",
    },
    fetchPolicy: "cache-and-network",
  });
}
