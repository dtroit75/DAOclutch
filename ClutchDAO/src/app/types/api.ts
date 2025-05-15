
export type APIError = {
  code: string;
  error: string;
  message: string;
};
export function isApiError(response: unknown): response is APIError {
  return (
    response !== null && 
    typeof response === 'object' && 
    'error' in response
  );
}
