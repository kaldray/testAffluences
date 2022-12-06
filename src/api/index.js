import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

export async function getDatetime(datetime, id = 1317) {
  try {
    const res = await instance.get(
      `/resource/${id}/available?datetime=${datetime}`
    );
    const { data } = res;
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}
