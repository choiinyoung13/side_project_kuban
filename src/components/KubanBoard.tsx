import styled from "styled-components";
import KubanCard from "./KubanCard";
import { useEffect, useRef } from "react";
import { useFetchData } from "../hooks/useData";
import { useSetRecoilState } from "recoil";
import { idState } from "../atoms/idAtom";

interface DateType {
  id: string;
  title: string;
  contents: [
    {
      id: string;
      title: string;
      desc: string;
      tags: string[];
    }
  ];
}

export default function KubanBoard() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, error, isLoading } = useFetchData();
  const setId = useSetRecoilState(idState);

  useEffect(() => {
    const handleWheel = (e: { deltaY: number }) => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;
    setId(data.length + 1);
  }, [data]);

  if (isLoading) {
    return null;
  }

  if (error) {
    return null;
  }

  return (
    <KubanBoardCon>
      <KubanHeaderCon>
        <Title>Kunban Board</Title>
        <Desc>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi quam
          illo rerum perspiciatis quis ad nulla itaque id laboriosam et sequi
        </Desc>
        <Link href="#">link</Link>
      </KubanHeaderCon>
      <KubanMainCon ref={scrollRef}>
        {data.map((data: DateType, i: number) => {
          return <KubanCard key={i} type={"default"} data={data} />;
        })}
        <KubanCard type={"add"} />
      </KubanMainCon>
    </KubanBoardCon>
  );
}

const KubanBoardCon = styled.div`
  padding: 5vw;
  height: 100vh;

  @media (max-width: 414px) {
    height: 100%;
  }
`;

const KubanHeaderCon = styled.div`
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const KubanMainCon = styled.div`
  height: 73%;
  display: flex;
  overflow-x: auto;
  scrollbar-width: none; /* 기본 상태에서 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    width: 0; /* 기본 상태에서 스크롤바 숨기기 */
    height: 0; /* 기본 상태에서 스크롤바 숨기기 */
  }

  /* hover 상태에서 스크롤바 보이기 */
  &:hover::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(70, 70, 70);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* Firefox 기반 브라우저용 스크롤바 스타일 */
  &:hover {
    scrollbar-width: thin; /* hover 상태에서 스크롤바 보이기 */
    scrollbar-color: rgb(70, 70, 70) #fff;
  }

  @media (max-width: 414px) {
    display: flex;
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 5rem;

  @media (max-width: 414px) {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const Desc = styled.div`
  font-size: 1.5rem;
  max-width: 800px;

  @media (max-width: 414px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

const Link = styled.a`
  max-width: 90px;
  font-size: 1.5rem;
  text-decoration: underline;

  @media (max-width: 414px) {
    font-size: 1rem;
  }
`;
