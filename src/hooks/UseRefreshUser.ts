import {useSetRecoilState} from 'recoil';
import {UserRequestId} from 'src/atoms/UserState';

// Updates UserRequestId to refresh cache for UserState,
export function useRefreshUser() {
  const setUserRequestId = useSetRecoilState(UserRequestId);
  return () => setUserRequestId((requestId) => requestId + 1);
}
