import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const temp_string: string = "temp temp temp";

const split_with_overlap = (
  s: string,
  n: number,
  overlap_p: number = 0.5
): Array<string> => {
  let res: string[] = [];
  let cur_count: number = 0;
  const l: number = Math.round(s.length / n);
  const overlap_l: number = Math.round(l / 2);
  while (cur_count < s.length) {
    res.push(s.substring(cur_count, Math.min(cur_count + l, s.length)));
    cur_count += overlap_l;
  }
  return res;
};

const create_embedding = async (s: string): number[] => {
  const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: s,
  });
  return response.data?[0].embedding;
}

interface IHash {
  [s: string] : number[];
} 

const create_embedding_hash = (data: string[]): IHash => {
  let embedding_hash: IHash = {};
  data.forEach((item: string) => {
    embedding_hash[item] = create_embedding(item);
  });
  return embedding_hash;
};

const main = () => {
  console.log(temp_string);
};
