import styled from "styled-components";

type setDataType = {
  id: string;
  title: string;
  detailTitle: string;
  desc: string;
  tags: string[];
};

interface AddFormType {
  handleCancel?: (value: boolean) => void;
  datas: {
    id: string;
    title: string;
    detailTitle: string;
    desc: string;
    tags: string[];
  };
  setDatas: (value: setDataType) => void;
}

export default function KubanAddCardDetailForm({
  handleCancel,
  datas,
  setDatas,
}: AddFormType) {
  return (
    <Form>
      <TitleInput
        type="text"
        required
        placeholder="write detailed plan"
        value={datas.detailTitle}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDatas({ ...datas, detailTitle: e.target.value });
        }}
      />
      <Textarea
        name=""
        id=""
        rows={3}
        cols={50}
        required
        placeholder="Tell me the detailed plan"
        value={datas.desc}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setDatas({ ...datas, desc: e.target.value });
        }}
      />
      <TagInput
        type="text"
        placeholder="Please tag ',' as a separator"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDatas({
            ...datas,
            tags: e.target.value.split(",").map((tag) => tag.trim()),
          });
        }}
      />
      <Btns>
        <CancelBtn
          type="button"
          onClick={() => {
            if (handleCancel === undefined) return;
            handleCancel(false);
            setDatas({ ...datas, detailTitle: "", desc: "", tags: [] });
          }}
        >
          cancel
        </CancelBtn>
      </Btns>
    </Form>
  );
}

const Form = styled.div`
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
