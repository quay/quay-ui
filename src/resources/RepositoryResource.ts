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
    // console.log('repoList', repoList);
    return repoList;
  } catch (error) {
    console.log(error);
  }

  // await Promise.all(
  //   namespaces.map((ns) => {
  //     return axios.get(`/api/v1/repository?last_modified=true&namespace=${ns}`);
  //   }),
  // )
  //   .then(data => data)
  //   .catch((e) => console.log(e));

  // try {
  //   const repoList = namespaces.map(async (ns) => {
  //     return await axios.get(
  //       `/api/v1/repository?last_modified=true&namespace=${ns}`,
  //     );
  //   });
  //   console.log('repoList1', repoList);
  //   return repoList;
  // } catch (error) {
  //   console.log(error);
  // }
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
    const response = await axios.post(newRepositoryApiUrl, {
      namespace,
      repository,
      visibility,
      description,
      repo_kind,
    });
  } catch (e) {
    console.error(e);
  }
}
