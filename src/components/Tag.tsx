import styled from "styled-components";

interface TagProps {
  tagType: string;
  value?: string;
}

export default function Tag({ tagType, value }: TagProps) {
  if (tagType === "add") {
    return <TagCon $tagType={tagType}>+</TagCon>;
  }

  return <TagCon $tagType={tagType}>#{value}</TagCon>;
}

interface TagConProps {
  $tagType: string;
}

const TagCon = styled.div<TagConProps>`
  font-size: 1.5rem;
  border: 1px solid black;
  margin-right: 10px;
  margin-top: 20px;
  padding: 0 10px 5px;
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.$tagType === "add" ? "pointer" : "none")};

  &:hover {
    background-color: ${(props) =>
      props.$tagType === "add" ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0)"};
  }

  @media (max-width: 414px) {
    font-size: 1rem;
    margin-top: 10px;
    padding: 3px 8px 6px;
  }
`;
