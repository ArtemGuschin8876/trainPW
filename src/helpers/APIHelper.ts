import { APIRequestContext, APIResponse, expect } from 'playwright/test';
import { Logger } from '../utils/logger';

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiRequestOptions {
  data?: any;
  headers?: Record<string, string>;
  expectedStatus?: number;
  invalidUrl?: string;
}

export async function sendApiRequest<T>(
  request: APIRequestContext,
  method: ApiMethod,
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<{ responseBody: T; response: APIResponse }> {
  const logger = new Logger('APIHelper');
  const { data, headers, expectedStatus = 200, invalidUrl } = options;
  const finalUrl = invalidUrl ?? endpoint;

  const response = await request.fetch(finalUrl, {
    method,
    data,
    headers
  });

  const status = response.status();

  expect(status).toBe(expectedStatus);
  if (status !== expectedStatus) {
    logger.error(`Expected status ${expectedStatus}, but got ${status} for endpoint ${endpoint}`);
  }

  const responseBody = (await response.json()) as T;
  return { responseBody, response };
}
