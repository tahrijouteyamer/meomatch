import { useQuery } from "@tanstack/react-query";

const useQueryCatImages = () =>
  useQuery(["catImages"], async () => {
    const res = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=10"
    );
    const data = await res.json();
    return data;
  });

export default useQueryCatImages;
