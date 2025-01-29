import api from "../helpers/axiosInstance";

export default function Fetch() {
  async function fetch() {
    try {
      api({
        method: "GET",
        url: "",
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJK.V1QiLCJhbGciOiJS.UzI1NiJ9`,
        },
      });
    } catch (err) {
      console.log(err, "<<< err fetch");
    }
  }

  return (
    <div>{JSON.stringify()}</div>
  )
}