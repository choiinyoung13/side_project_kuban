import { FormEvent, useState } from "react";
import styled from "styled-components";
import { usePatchData } from "../hooks/useData";
import { contentIdState } from "../atoms/idAtom";
import { useRecoilState } from "recoil";

interface AddFormType {
  handleCancel?: (value: boolean) => void;
  cardId: string;
}

const updateData = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

export default function KunbanContentAddFrom({
  handleCancel,
  cardId,
}: AddFormType) {
  const [contentId, setContentId] = useRecoilState(contentIdState);
  const { mutate: petchDatas } = usePatchData();
  const [datas, setDatas] = useState({
    id: String(contentId),
    title: "",
    desc: "",
    tags: [] as string[],
  });

  return (
    <Form
      onSubmit={(e) => {
        updateData(e);
        petchDatas({ id: cardId, datas: datas });
        setContentId((prev) => prev + 1);
        if (handleCancel === undefined) return;
        handleCancel(false);
      }}
    >
      <TitleInput
        type="text"
        required
        placeholder="write detailed plan"
        onChange={(e) => {
          setDatas({ ...datas, title: e.target.value });
        }}
      />
      <Textarea
        name=""
        id=""
        rows={3}
        cols={50}
        required
        placeholder="Tell me the detailed plan"
        onChange={(e) => {
          setDatas({ ...datas, desc: e.target.value });
        }}
      />
      <TagInput
        type="text"
        placeholder="Please tag ' ,' as a separator"
        onChange={(e) => {
          setDatas({
            ...datas,
            tags: e.target.value.split(",").map((el) => el.trim()),
          });
        }}
      />
      <Btns>
        <SavaBtn type="submit">add</SavaBtn>
        <CancelBtn
          type="button"
          onClick={() => {
            if (handleCancel === undefined) return;
            handleCancel(false);
          }}
        >
          cancel
        </CancelBtn>
      </Btns>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 20px;
  background-color: rgb(246, 246, 246);
`;

const TitleInput = styled.input`
  margin-bottom: 12px;
  padding: 8px;
  font-size: 1.4rem;
  font-weight: 300;
  font-family: Arial, Helvetica, sans-serif;

  @media (max-width: 414px) {
    font-size: 1rem;
  }
`;

const Textarea = styled.textarea`
  margin-bottom: 12px;
  padding: 8px;
  font-size: 1.4rem;

  &::placeholder {
    color: rgb(130, 130, 130);
    font-weight: 100;
    font-family: Arial, Helvetica, sans-serif;

    @media (max-width: 414px) {
      font-size: 1rem;
    }
  }
`;

const TagInput = styled.input`
  margin-bottom: 12px;
  padding: 8px;
  font-size: 1.4rem;
  font-weight: 300;
  font-family: Arial, Helvetica, sans-serif;

  @media (max-width: 414px) {
    font-size: 1rem;
  }
`;

const SavaBtn = styled.button`
  padding: 8px 12px;
  font-size: 1.4rem;
  margin-right: 12px;

  @media (max-width: 414px) {
    font-size: 1rem;
  }
`;

const CancelBtn = styled.button`
  padding: 8px 12px;
  font-size: 1.4rem;

  @media (max-width: 414px) {
    font-size: 1rem;
  }
`;

const Btns = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;
