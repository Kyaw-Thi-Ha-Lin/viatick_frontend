export const fetchGetData = async (url: string) => {
    const result = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    }).then((res) => res.json());
    return result;
};
  