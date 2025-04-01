const blogList = document.querySelector('.blog') as HTMLElement;
import { getCurrentPage } from "./swiper";

axios.defaults.baseURL = "https://profile-server-qbyd.onrender.com";
// axios.defaults.baseURL = "http://localhost:5500"
axios.defaults.withCredentials = true;



interface BlogArticle{
  title: string;
  header: string;
  date: string;
  _id: string;
  photo: string;
}

export async function fetchCatArticle(): Promise<BlogArticle[]> {
  try {
    let page = getCurrentPage();
      const response = await axios.get(`/cat-article?page=${page}`);
      // console.log("3data", response.data.data.data) wrong
      console.log("2data", response.data.data.items)
      // console.log("1data", response.data.items) wrong
      return response.data.data.items;
    } catch (error: any) {
      throw new Error(`Error fetching blog: ${error.response?.data?.message || error.message}`);
    }  
  }

async function renderCatArticle() {

  let blog = await fetchCatArticle();
  console.log("blog", blog) //super
  
  if (!blog || blog.length === 0) return;
  
    blogList.innerHTML = blog
        .map(
            ({  title, 
                header, 
              _id,
                photo
          }) => {
            // console.log("id", _id) super
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