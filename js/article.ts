const container = document.getElementById("container") as HTMLElement;

axios.defaults.baseURL = "https://profile-server-qbyd.onrender.com";
axios.defaults.withCredentials = true;

async function fetchArticle(id: string) {
    try {
      const response = await axios.get(`/cat-article/${id}`);
      console.log(response.data.data)
      return response.data.data;
    } catch (error:any) {
      throw new Error(`Error fetching cat-article: ${error.response?.data?.message || error.message}`);
    }  
  }

  async function renderArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("urlParams", urlParams)
    const catArticleId = urlParams.get("id");
console.log("catArticleId", catArticleId)
    if (!catArticleId) {
        console.error("No article ID provided.");
        return;
    }

    const article = await fetchArticle(catArticleId);
    console.log(article.text)
    if (article) {
      container.innerHTML = DOMPurify.sanitize(article.text);
    }
}


window.onload = renderArticle;