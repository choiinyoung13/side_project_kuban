import styled from "styled-components";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import Tag from "./Tag";
import { useEffect, useRef, useState } from "react";
import KunbanContentAddFrom from "./KubanContentAddForm";
import KunbanAddCard from "./KubanAddCard";
import { useDeleteContent, useDeleteData } from "../hooks/useData";

interface KubanCardProps {
  type: string;
  data?: DateType; // Optional prop
}

interface DateType {
  id: string;
  title: string;
  contents: {
    id: string;
    title: string;
    desc: string;
    tags: string[];
  }[];
}

interface KubanCardContentProps {
  id: string;
  title: string;
  desc: string;
  tags: string[];
}

interface AddContentBtnProps {
  $cardType: string;
}

export default function KubanCard({ type, data }: KubanCardProps) {
  const [addPlan, setAddPlan] = useState(false);
  const [addDetailPlan, setAddDetailPlan] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { mutate: deleteDatas } = useDeleteData();
  const { mutate: deleteContent } = useDeleteContent();

  const handleDelete = (id: string) => {
    deleteDatas(id);
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (scrollRef.current) {
        event.stopPropagation(); // 이벤트 전파 중지
      }
    };

    const contentElement = scrollRef.current;
    if (contentElement) {
      contentElement.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  if (type === "add") {
    if (addPlan) {
      return <KunbanAddCard setAddPlan={setAddPlan} />;
    }

    return (
      <Card
        $cardType={type}
        onClick={() => {
          setAddPlan(true);
        }}
      >
        <AddContentBtn $cardType={type}>
          <AiOutlinePlus />
        </AddContentBtn>
      </Card>
    );
  }

  if (data === undefined) {
    return null;
  }

  return (
    <Card $cardType={type}>
      <CardInputCon>
        <CardInputLabel htmlFor="kubanInput">: {data.title}</CardInputLabel>
        <CardInput type="text" id="kubanInput" />
        <CardInputDeleteBtn
          onClick={() => {
            handleDelete(data.id);
          }}
        />
      </CardInputCon>
      {!addDetailPlan && (
        <AddContentBtn
          $cardType={type}
          onClick={() => {
            setAddDetailPlan(true);
          }}
        >
          <AiOutlinePlus />
        </AddContentBtn>
      )}

      <CardContentCon ref={scrollRef} $addDetailPlan={addDetailPlan}>
        {addDetailPlan && (
          <KunbanContentAddFrom
            handleCancel={setAddDetailPlan}
            cardId={data.id}
          />
        )}
        {data.contents.length !== 0
          ? data.contents.map((content: KubanCardContentProps) => {
              return (
                <CardContents key={content.id}>
                  <CardContentsHeader>
                    <CardContentsHeaderTitle>
                      {content.title}
                    </CardContentsHeaderTitle>
                    <CardContentsHeaderDeleteBtn
                      onClick={() => {
                        deleteContent({ id: data.id, contentId: content.id });
                      }}
                    >
                      x
                    </CardContentsHeaderDeleteBtn>
                  </CardContentsHeader>
                  <CardContentsDesc>{content.desc}</CardContentsDesc>
                  <TagsCon>
                    {content.tags.map((tag, i) => {
                      return <Tag tagType={"default"} value={tag} key={i} />;
                    })}
                    <Tag tagType={"add"} />
                  </TagsCon>
                </CardContents>
              );
            })
          : null}
      </CardContentCon>
    </Card>
  );
}

const Card = styled.div<AddContentBtnProps>`
  width: 600px;
  height: 100%;
  border: 1px solid black;
  flex-shrink: 0;
  padding: ${(props) => (props.$cardType === "add" ? "0" : "20px")};
  margin-right: 30px;

  &:last-of-type {
    margin-right: 0px;
  }

  @media (max-width: 414px) {
    width: 100%;
    height: 100%;
    margin: 50px 0 0 0;

    &:first-of-type {
      margin: 0;
    }

    &:last-of-type {
      margin: 30px 0 0 0;
    }
  }
`;

const CardInputCon = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardInputLabel = styled.label`
  font-size: 2.5rem;
  cursor: pointer;

  @media (max-width: 414px) {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const CardInput = styled.input`
  display: none;
`;

const CardInputDeleteBtn = styled(AiOutlineDelete)`
  font-size: 2.3rem;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  margin-top: 8px;
  cursor: pointer;

  @media (max-width: 414px) {
    font-size: 1.5rem;
    margin-top: 3px;
  }
`;

const AddContentBtn = styled.button<AddContentBtnProps>`
  font-size: ${(props) => (props.$cardType === "add" ? "6rem" : "2.5rem")};
  background-color: rgba(0, 0, 0, 0);
  border: ${(props) =>
    props.$cardType === "add" ? "none" : "2.5px solid black"};
  width: 100%;
  height: ${(props) => (props.$cardType === "add" ? "725px" : "")};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => (props.$cardType === "add" ? "0" : "20px")};
  padding: ${(props) => (props.$cardType === "add" ? "0" : "30px 0")};
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 414px) {
    font-size: ${(props) => (props.$cardType === "add" ? "2.5rem" : "1.5rem")};
    height: ${(props) => (props.$cardType === "add" ? "20%" : "")};
    padding: ${(props) => (props.$cardType === "add" ? "12px 0" : "30px 0")};
    border: ${(props) =>
      props.$cardType === "add" ? "none" : "1px solid black"};
  }
`;

const CardContentCon = styled.div<{ $addDetailPlan: boolean }>`
  max-height: ${(props) => (props.$addDetailPlan ? "620px" : "500px")};
  overflow-x: hidden;
  margin-top: 20px;

  /* Webkit 기반 브라우저용 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  &::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }

  /* Firefox 기반 브라우저용 스크롤바 스타일 */
  scrollbar-width: thin;
  scrollbar-color: rgb(70, 70, 70) #fff;

  @media (max-width: 414px) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 414px) {
    margin-top: 20px;
    max-height: 480px;
  }
`;

const CardContents = styled.div`
  margin-top: 20px;
  border: 1px solid black;
  padding: 10px 20px 20px;

  &:first-of-type {
    margin-top: 0px;
  }

  &:last-of-type {
    margin-bottom: 10px;
  }

  @media (max-width: 414px) {
    &:first-of-type {
      margin-top: 0px;
    }
  }
`;

const CardContentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CardContentsHeaderTitle = styled.div`
  font-size: 2rem;

  @media (max-width: 414px) {
    font-size: 1.5rem;
  }
`;

const CardContentsHeaderDeleteBtn = styled.div`
  margin-bottom: 8px;
  cursor: pointer;
  font-size: 2.3rem;
  font-weight: 500;

  @media (max-width: 414px) {
    font-size: 1.6rem;
  }
`;

const CardContentsDesc = styled.div`
  font-size: 1.4rem;
  margin-bottom: 8px;
  line-height: 36px;
  min-height: 70px;
  display: -webkit-box; /* Flexbox 레이아웃 설정 */
  -webkit-box-orient: vertical; /* 수직 방향으로 설정 */
  -webkit-line-clamp: 2; /* 최대 2줄로 제한 */
  overflow: hidden; /* 넘치는 내용 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트는 ...으로 표시 */
  max-height: 72px; /* 2줄의 텍스트 높이에 맞게 설정 */

  @media (max-width: 414px) {
    font-size: 1.1rem;
    line-height: 30px;
    min-height: 50px;
  }
`;

const TagsCon = styled.div`
  display: flex;
`;
