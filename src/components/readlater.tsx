import styled from "styled-components";
import {
  Headline,
  Item,
  ItemList,
  ListContainer,
  SubHeadline,
} from "./elements";

const ReadlaterElement = styled.a`
  font-weight: 400;
  text-decoration: none;
  color: ${(props) => props.theme.accentColor};
  padding: 0;
  padding-top: 0.75rem;
  font-size: 0.9rem;

  display: flex;
  flex-direction: column;

  &:hover {
    text-decoration: underline;
  }
`;

export interface IReadlaterProps {
  name: string;
  url: string;
  newTab?: boolean;
}

export interface IReadlaterListProps {
  readlater?: Array<IReadlaterProps>;
}

export const Readlater = ({ name, url, newTab }: IReadlaterProps) => {
  const linkAttrs =
    newTab !== undefined && newTab
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

  return (
    <ReadlaterElement href={url} {...linkAttrs}>
      {name}
    </ReadlaterElement>
  );
};

/**
 * Renders a given list of categorized readlater
 * @param {IReadlaterListProps} props props of the given readlater list
 * @returns {React.ReactNode} the readlater list component
 */
const ReadlaterList = ({ readlater }: IReadlaterListProps) => {
  if (readlater === undefined || readlater.length <= 0) return <></>;

  return (
    <ListContainer>
      <Headline>Readlater</Headline>
      {readlater.map(({ name, url, newTab }, index) => (
          <Readlater
            key={[name, index].join("")}
            name={name}
            url={url}
            newTab={newTab}
          />
        ))}
    </ListContainer>
  );
};

export default ReadlaterList;
