/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
function fetchModel(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Lỗi khi gọi API: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Lỗi khi fetch dữ liệu:", error);
      throw error;
    });
}

export default fetchModel;