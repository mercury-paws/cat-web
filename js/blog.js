'use strict'

const blogList = document.querySelector('.blog');
axios.defaults.baseURL = "https://profile-server-qbyd.onrender.com";
axios.defaults.withCredentials = true;

async function fetchCatArticle() {
    try {
      const response = await axios.get("/cat-article");
      console.log(response.data.data.data)
      return response.data.data.data;
    } catch (error) {
      throw new Error(`Error fetching blog: ${error.response?.data?.message || error.message}`);
    }  
  }

  async function renderCatArticle() {
    let blog = await fetchCatArticle();
 
    blogList.innerHTML = blog
        .map(
            ({  title, 
                header, 
                date, 
                _id
            }) => {
                return `<li class="blog-item">
                <a href="pages/small-article.html?id=${_id}" class="blog-link">
                <img src="./img/1.png" alt="cat" class="blog-photo" />
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