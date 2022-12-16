import { createGlobalStyle, ThemeProvider } from "styled-components";

import SearchBar from "./components/searchBar";
import Greeter from "./components/greeter";
import AppList from "./components/appList";
import BookmarkList from "./components/bookmarks";
import ReadlaterList from "./components/readlater";
import Settings from "./components/settings";

import { IThemeProps, getTheme, setScheme } from "./lib/useTheme";
import useFetch from "./lib/useFetch";
import useMediaQuery from "./lib/useMediaQuery";

export const GlobalStyle = createGlobalStyle<{ theme: IThemeProps }>`
  body {
    background-color: ${(props) => props.theme.backgroundColor};
    font-family: Roboto, sans-serif;

    margin: auto;
    padding-top: 1rem;
    max-width: 80%;
    max-height: 100%;

    @media (min-width: 1366px) {
      max-width: 70%;
    }
  }
`;

/**
 * Renders the entire app by calling individual components
 */
const App = () => {
  const {
    appData,
    bookmarkData,
    readlaterData,
    searchData,
    themeData,
    greeterData,
  } = useFetch();

  const theme = getTheme();
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");
  setScheme(isDark ? "dark-theme" : "light-theme");

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <SearchBar search={searchData.response} />
        <Greeter greeter={greeterData.response} />
        <AppList
          apps={appData.response?.apps}
          categories={appData.response?.categories}
        />
        <BookmarkList groups={bookmarkData.response?.groups} />
        <ReadlaterList readlater={readlaterData.response?.readlater} />
        <Settings themes={themeData.response} search={searchData.response} />
      </div>
    </ThemeProvider>
  );
};

export default App;
