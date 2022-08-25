import {AxiosResponse} from 'axios';
import axios from 'src/libs/axios';
import {assertHttpCode} from './ErrorHandling';

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

export async function fetchAllRepos(namespaces: string[]) {
  const namespacedRepos = await Promise.all(
    namespaces.map((ns) => {
      return getRepositoriesForNamespace(ns);
    }),
  );
  // Flatten responses to a single list of all repositories
  const allRepos: IRepository[] = namespacedRepos.reduce(
    (allRepos, namespacedRepos) =>
      allRepos.concat(namespacedRepos.repositories),
    [],
  );

  return allRepos.sort((r1, r2) => {
    return r1.last_modified > r2.last_modified ? -1 : 1;
  });
}

export async function getRepositoriesForNamespace(ns: string) {
  // TODO: Add return type to AxiosResponse
  const response: AxiosResponse = await axios.get(
    `/api/v1/repository?last_modified=true&namespace=${ns}`,
  );
  assertHttpCode(response.status, 200);
  return response.data;
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
  await Promise.all(
    repos.map((repo) => {
      return deleteRepository(repo.namespace, repo.name);
    }),
  );
}

// Not returning response from deleting repository for now as
// it's not required but may want to add it in the future.
export async function deleteRepository(ns: string, name: string) {
  const response: AxiosResponse = await axios.delete(
    `/api/v1/repository/${ns}/${name}`,
  );
  assertHttpCode(response.status, 204);
}
