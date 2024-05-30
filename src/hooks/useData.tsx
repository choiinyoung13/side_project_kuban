import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function useFetchData() {
  const fetchDatas = async () => {
    const res = await axios.get("http://localhost:3000/items");
    const datas = res.data;

    return datas;
  };

  const { data, error, isLoading } = useQuery(["datas"], fetchDatas, {
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading };
}

/* =========== post datas ============ */

type setDataType = {
  id: string;
  title: string;
  detailTitle?: string;
  desc: string;
  tags: string[];
};

const addDatas = async (datas: setDataType) => {
  try {
    const postDatas =
      datas.detailTitle === ""
        ? {
            id: datas.id,
            title: datas.title,
            contents: [],
          }
        : {
            id: datas.id,
            title: datas.title,
            contents: [
              {
                id: "1",
                title: datas.detailTitle,
                desc: datas.desc,
                tags: datas.tags,
              },
            ],
          };

    const response = await axios.post("http://localhost:3000/items", postDatas);
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const useAddData = () => {
  const queryClient = useQueryClient();

  return useMutation(addDatas, {
    onSuccess: () => {
      // 데이터가 성공적으로 추가된 후 todos 쿼리를 무효화하여 다시 가져오도록 설정
      queryClient.invalidateQueries("datas"); // <- 쿼리 키 넣는 곳
    },
  });
};

/* =========== delete datas ============ */
interface ContentType<T> {
  id: T;
  title: T;
  desc: T;
  tags: T[];
}

interface ItemType<T> {
  id: T;
  title: T;
  contents: ContentType<T>[];
}

const deleteDatas = async (id: string) => {
  try {
    // 지정된 ID의 항목 삭제
    await axios.delete(`http://localhost:3000/items/${id}`);

    // 모든 항목 가져오기
    const res = await axios.get(`http://localhost:3000/items`);
    const datas: ItemType<string>[] = res.data;

    // 항목 ID를 재정렬
    const sortedDatas = datas.map((item, i) => ({
      ...item,
      id: String(i + 1),
    }));

    // 기존 항목 모두 삭제
    for (const item of datas) {
      await axios.delete(`http://localhost:3000/items/${item.id}`);
    }

    // 정렬된 항목을 다시 추가
    for (const data of sortedDatas) {
      await axios.post(`http://localhost:3000/items`, data);
    }
  } catch (error) {
    console.error("Error processing data:", error);
  }
};

export const useDeleteData = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteDatas, {
    onSuccess: () => {
      // 데이터가 성공적으로 추가된 후 todos 쿼리를 무효화하여 다시 가져오도록 설정
      queryClient.invalidateQueries("datas"); // <- 쿼리 키 넣는 곳
    },
  });
};

/* =========== patch datas ============ */

interface PatchDatasType {
  id: string;
  title: string;
  desc: string;
  tags: string[];
}

const patchDatas = async ({
  id,
  datas,
}: {
  id: string;
  datas: PatchDatasType;
}) => {
  try {
    const res = (await axios.get(`http://localhost:3000/items/${id}`)).data;

    const dataContents = res.contents.filter((data: ContentType<string>) => {
      return data.title !== "";
    });

    const patchData = {
      id: datas.id,
      title: datas.title,
      desc: datas.desc,
      tags: datas.tags,
    };

    const newContetns = [...dataContents, patchData];

    await axios.patch(`http://localhost:3000/items/${id}`, {
      contents: newContetns,
    });
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const usePatchData = () => {
  const queryClient = useQueryClient();

  return useMutation(patchDatas, {
    onSuccess: () => {
      queryClient.invalidateQueries("datas");
    },
  });
};

/* =============== delete content =============== */

const deleteContent = async ({
  id,
  contentId,
}: {
  id: string;
  contentId: string;
}) => {
  const data = (await axios.get(`http://localhost:3000/items/${id}`)).data;
  const contents = data.contents;
  const filterdContent = contents.filter(
    (content: ContentType<string>) => content.id !== contentId
  );

  await axios.patch(`http://localhost:3000/items/${id}`, {
    contents: filterdContent,
  });
};

export const useDeleteContent = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteContent, {
    onSuccess: () => {
      queryClient.invalidateQueries("datas");
    },
  });
};
