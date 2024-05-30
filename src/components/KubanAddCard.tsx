import { useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import KubanAddCardDetailForm from "./KubanAddCardDetailForm";
import { useAddData } from "../hooks/useData";
import { useRecoilState } from "recoil";
import { idState } from "../atoms/idAtom";

interface KubanAddCardProps {
  setAddPlan: (value: boolean) => void;
}

interface AddContentBtnProps {
  $cardType: string;
}

export default function KunbanAddCard({ setAddPlan }: KubanAddCardProps) {
  const [addDetailPlan, setAddDetailPlan] = useState(false);
  const { mutate: addDatas } = useAddData();
  const [id, setId] = useRecoilState(idState);

  const [datas, setDatas] = useState({
    id: String(id),
    title: "",
    detailTitle: "",
    desc: "",
    tags: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDatas({ ...datas });
    setId(id + 1);
    setAddDetailPlan(false);
    setAddPlan(false);
  };

  return (
    <AddForm onSubmit={handleSubmit}>
      <AddFormInput
        $addDetailPlan={addDetailPlan}
        type="text"
        id="formTitle"
        placeholder="What to do?"
        onChange={(e) => {
          setDatas((prev) => ({ ...prev, title: e.target.value }));
        }}
        required
      />
      {!addDetailPlan && (
        <AddContentBtn
          $cardType={"default"}
          type="button"
          onClick={() => {
            setAddDetailPlan(true);
          }}
        >
          <AiOutlinePlus />
        </AddContentBtn>
      )}
      {addDetailPlan && (
        <KubanAddCardDetailForm
          handleCancel={setAddDetailPlan}
          datas={datas}
          setDatas={setDatas}
        />
      )}
      <AddFormBtnCon>
        <AddFormSaveBtn type="submit">SAVE</AddFormSaveBtn>
        <AddFormCancleBtn
          type="button"
          onClick={() => {
            setAddPlan(false);
            setDatas({
              id: String(id),
              title: "",
              detailTitle: "",
              desc: "",
              tags: [],
            });
          }}
        >
          CANCLE
        </AddFormCancleBtn>
      </AddFormBtnCon>
    </AddForm>
  );
}

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

const AddForm = styled.form`
  width: 600px;
  height: 100%;
  border: 1px solid black;
  flex-shrink: 0;
  padding: 20px;
  margin-left: 30px;

  &:last-of-type {
    margin-right: 0;
  }

  @media (max-width: 414px) {
    width: 100%;
    margin-left: 0px;
    margin-top: 20px;
  }
`;

const AddFormInput = styled.input<{ $addDetailPlan: boolean }>`
  width: 100%;
  font-size: 2rem;
  padding: 6px 10px;
  margin-bottom: ${(props) => (props.$addDetailPlan ? "20px" : "0px")};
  @media (max-width: 414px) {
    font-size: 1.5rem;
  }
`;

const AddFormBtnCon = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  margin-top: 16px;

  @media (max-width: 414px) {
    margin-top: 14px;
  }
`;

const AddFormSaveBtn = styled.button`
  font-size: 1.5rem;
  padding: 6px 10px;
  margin-right: 14px;
  @media (max-width: 414px) {
    font-size: 1rem;
    margin-right: 10px;
  }
`;

const AddFormCancleBtn = styled.button`
  font-size: 1.5rem;
  padding: 6px 10px;
  @media (max-width: 414px) {
    font-size: 1rem;
  }
`;
