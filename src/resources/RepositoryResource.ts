import {AxiosResponse} from 'axios';
import axios from 'src/libs/axios';

export interface IRepository {
  namespace: string;
  name: string;
  description: string;
  is_public: boolean;
  kind: string;
  state?: string;
  last_modified?: string;
  popularity?: number;
  is_starred?: boolean;
}

export interface RepositoryCreationResponse {
  namespace: string;
  name: string;
  kind: string;
}

// TO DO - use axios.all for doing multiple GETs for all ns query parameter
export async function fetchAllRepos(namespaces: string[]) {
  try {
    const repoList = await Promise.all(
      namespaces.map((ns) => {
        return axios.get(
          `/api/v1/repository?last_modified=true&namespace=${ns}`,
        );
      }),
    );
    return repoList;
  } catch (error) {
    console.log(error);
  }
}

export async function createNewRepository(
  namespace: string,
  repository: string,
  visibility: string,
  description: string,
  repo_kind: string,
) {
  const newRepositoryApiUrl = `/api/v1/repository`;
  try {
    const response: AxiosResponse<RepositoryCreationResponse> =
      await axios.post(newRepositoryApiUrl, {
        namespace,
        repository,
        visibility,
        description,
        repo_kind,
      });
    return response;
  } catch (e) {
    console.error(e);
  }
}

export async function setRepositoryVisibility(
  namespace: string,
  repositoryName: string,
  visibility: string,
) {
  const repositoryVisibilityUrl =
    `/api/v1/repository/` +
    namespace +
    `/` +
    repositoryName +
    `/changevisibility`;
  try {
    const response = await axios.post(repositoryVisibilityUrl, {
      visibility,
    });
  } catch (e) {
    // TODO: Find a better way to propagate errors
    console.error(e);
  }
}
