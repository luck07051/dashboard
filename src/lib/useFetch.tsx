import { useCallback, useEffect, useState } from "react";

import { IAppListProps } from "../components/appList";
import { IBookmarkListProps } from "../components/bookmarks";
import { ISearchProps } from "../components/searchBar";
import { IThemeDataProps } from "./useTheme";
import { IGreeterDataProps } from "../components/greeter";

export interface IDataProps<I> {
  response?: I;
  error?: string | boolean;
}

const inProduction = process.env.NODE_ENV === "production";

/**
 * Handles the response from the fetch requests
 * @param {Response} response - The response given by the fetch request
 * @returns - The response in JSON
 * @throws - Error with given error message if request failed
 */
export const handleResponse = async (response: Response) => {
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

const fetchFile = (f: string) => {
  if (!inProduction) return require(`../data/${f}.json`);

  return fetch(`/data/${f}.json`)
    .then(handleResponse)
    .catch((error: Error) => {
      return { error: error.message };
    });
};

interface IFetchProps {
  appData: IDataProps<IAppListProps>;
  bookmarkData: IDataProps<IBookmarkListProps>;
  searchData: IDataProps<ISearchProps>;
  themeData: IDataProps<IThemeDataProps>;
  greeterData: IDataProps<IGreeterDataProps>;
  callback?: () => void;
}

/**
 * Fetches app, bookmark, search, theme and imprint data and returns it.
 */
export const useFetcher = (): IFetchProps => {
  const defaults: IDataProps<any> = { error: true };

  const [appData, setAppData] = useState<IDataProps<IAppListProps>>(defaults);
  const [bookmarkData, setBookmarkData] =
    useState<IDataProps<IBookmarkListProps>>(defaults);
  const [searchData, setSearchData] =
    useState<IDataProps<ISearchProps>>(defaults);
  const [themeData, setThemeData] =
    useState<IDataProps<IThemeDataProps>>(defaults);
  const [greeterData, setGreeterData] =
    useState<IDataProps<IGreeterDataProps>>(defaults);

  const callback = useCallback(() => {
    const files = [
      "apps",
      "bookmarks",
      "search",
      "themes",
      "greeter",
    ];

    Promise.all(files.map((f) => fetchFile(f))).then(
      ([apps, bookmarks, search, themes, greeter]: any) => {
        setAppData({ response: apps });
        setBookmarkData({
          response: bookmarks,
        });
        setSearchData({ response: search });
        setThemeData({ response: themes });
        setGreeterData({ response: greeter });
      },
    );
  }, []);

  useEffect(() => callback(), [callback]);

  return {
    appData,
    bookmarkData,
    searchData,
    themeData,
    greeterData,
  };
};

export default useFetcher;
