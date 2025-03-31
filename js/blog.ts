const blogList = document.querySelector('.blog') as HTMLElement;
declare const DOMPurify: {
  sanitize: (input: string) => string;
};
declare const axios: any;

axios.defaults.baseURL = "https://profile-server-qbyd.onrender.com";
axios.defaults.withCredentials = true;

interface BlogArticle{
  title: string;
  header: string;
  date: string;
  _id: string;
  photo: string;
}

async function fetchCatArticle(): Promise<BlogArticle[]> {
    try {
      const response = await axios.get("/cat-article");
      console.log(response.data.data.data)
      return response.data.data.data;
    } catch (error) {
      throw new Error(`Error fetching blog: ${error.response?.data?.message || error.message}`);
    }  
  }

async function renderCatArticle() {
  if (!blogList) return;
  
    let blog = await fetchCatArticle();
 
    blogList.innerHTML = blog
        .map(
            ({  title, 
                header, 
                date, 
              _id,
                photo
            }) => {
                return `<li class="blog-item">
                <a href="pages/article.html?id=${_id}" class="blog-link">
                <img src="./img/${photo}.png" alt="cat" class="blog-photo" />
<div class="wrapper">
              <h2 class="blog-title sub-title">${DOMPurify.sanitize(title)}</h2>
              <p class="blog-text">${DOMPurify.sanitize(header)}</p>
              </div>
      </a>
            </li>`;
            }
          )
      .join('');
    
    }
    
    window.onload = renderCatArticle;