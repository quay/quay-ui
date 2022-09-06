import {AxiosError, AxiosResponse} from 'axios';
import axios from 'src/libs/axios';
import {assertHttpCode, BulkOperationError} from './ErrorHandling';

export interface IRepository {
  namespace: string;
  name: string;
  description?: string;
  is_public: boolean;
  kind?: string;
  state?: string;
  last_modified?: number;
  popularity?: number;
  is_starred?: boolean;
}

export interface RepositoryCreationResponse {
  namespace: string;
  name: string;
  kind: string;
}

export async function fetchAllRepos(
  namespaces: string[],
  flatten = false,
): Promise<IRepository[] | Map<string, IRepository[]>> {
  const namespacedRepos = await Promise.all(
    namespaces.map((ns) => fetchRepositoriesForNamespace(ns)),
  );
  // Flatten responses to a single list of all repositories
  if (flatten) {
    return namespacedRepos.reduce(
      (allRepos, namespacedRepos) => allRepos.concat(namespacedRepos),
      [],
    );
  } else {
    return namespacedRepos;
  }
}

export async function fetchRepositoriesForNamespace(ns: string) {
  // TODO: Add return type to AxiosResponse
  const response: AxiosResponse = await axios.get(
    `/api/v1/repository?last_modified=true&namespace=${ns}`,
  );
  assertHttpCode(response.status, 200);
  return response.data?.repositories;
}

export async function createNewRepository(
  namespace: string,
  repository: string,
  visibility: string,
  description: string,
  repo_kind: string,
) {
  const newRepositoryApiUrl = `/api/v1/repository`;
  const response: AxiosResponse<RepositoryCreationResponse> = await axios.post(
    newRepositoryApiUrl,
    {
      namespace,
      repository,
      visibility,
      description,
      repo_kind,
    },
  );
  assertHttpCode(response.status, 201);
  return response.data;
}

export async function setRepositoryVisibility(
  namespace: string,
  repositoryName: string,
  visibility: string,
) {
  // TODO: Add return type to AxiosResponse
  const api = `/api/v1/repository/${namespace}/${repositoryName}/changevisibility`;
  const response: AxiosResponse = await axios.post(api, {
    visibility,
  });
  assertHttpCode(response.status, 200);
  return response.data;
}

export async function bulkDeleteRepositories(repos: IRepository[]) {
  const responses = await Promise.allSettled(
    repos.map((repo) => deleteRepository(repo.namespace, repo.name)),
  );

  // Aggregate failed responses
  const errResponses = responses.filter(
    (r) => r.status == 'rejected',
  ) as PromiseRejectedResult[];

  // If errors, collect and throw
  if (errResponses.length > 0) {
    const bulkDeleteError = new BulkOperationError<RepoDeleteError>(
      'error deleting tags',
    );
    for (const response of errResponses) {
      const reason = response.reason as RepoDeleteError;
      bulkDeleteError.addError(reason.repo, reason);
    }
    throw bulkDeleteError;
  }
}

export class RepoDeleteError extends Error {
  error: Error;
  repo: string;
  constructor(message: string, repo: string, error: AxiosError) {
    super(message);
    this.repo = repo;
    this.error = error;
    Object.setPrototypeOf(this, RepoDeleteError.prototype);
  }
}

// Not returning response from deleting repository for now as
// it's not required but may want to add it in the future.
export async function deleteRepository(ns: string, name: string) {
  try {
    const response: AxiosResponse = await axios.delete(
      `/api/v1/repository/${ns}/${name}`,
    );
    assertHttpCode(response.status, 204);
  } catch (err) {
    throw new RepoDeleteError(
      'failed to delete repository',
      `${ns}/${name}`,
      err,
    );
  }
}
