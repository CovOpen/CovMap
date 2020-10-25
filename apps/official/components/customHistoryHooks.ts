import { useHistory, useLocation } from "react-router-dom";

type QueryChanges = { [name: string]: string | undefined };

export function getChangedQueryString(oldSearch: string, queryChanges: QueryChanges): string {
  const searchParams = new URLSearchParams(oldSearch);

  Object.entries(queryChanges).forEach(([name, value]) => {
    if (value === undefined) {
      searchParams.delete(name);
    } else {
      searchParams.set(name, value);
    }
  });

  return searchParams.toString();
}

export function usePathPreservingQueryChange() {
  const history = useHistory();
  const location = useLocation();

  return (queryChanges: QueryChanges) => {
    history.push({ search: getChangedQueryString(location.search, queryChanges) });
  };
}

export function useQueryPreservingHistoryPush() {
  const history = useHistory();
  const location = useLocation();

  return (pathname: string, queryChanges?: QueryChanges) => {
    history.push({ pathname, search: getChangedQueryString(location.search, queryChanges || {}) });
  };
}
