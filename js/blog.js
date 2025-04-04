var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const blogList = document.querySelector('.blog');
const loadingMessage = document.querySelector(".loading-message");
axios.defaults.baseURL = "https://profile-server-qbyd.onrender.com";
// axios.defaults.baseURL = "http://localhost:5500"
axios.defaults.withCredentials = true;
function fetchCatArticle(page) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(`/cat-article?page=${page}`);
            // console.log("3data", response.data.data.data) wrong
            console.log("2data", response.data.data.items);
            // console.log("1data", response.data.items) wrong
            return response.data.data.items;
        }
        catch (error) {
            console.warn("Server request failed.");
            return [];
        }
    });
}
export function renderCatArticle(page) {
    return __awaiter(this, void 0, void 0, function* () {
        let blog = yield fetchCatArticle(page);
        document.querySelectorAll(".loading-message").forEach(msg => msg.remove());
        if (loadingMessage) {
            loadingMessage.remove();
        }
        if (!blog || blog.length === 0) {
            blogList.insertAdjacentHTML("afterend", `<p class="loading-message">No articles available, server is down. Please visit us a little bit later.</p>`);
        }
        ;
        blogList.innerHTML = '';
        blogList.innerHTML = blog
            .map(({ title, header, _id, photo }) => {
            // console.log("id", _id) super
            return `<li class="blog-item">
                <a href="pages/article.html?id=${_id}" class="blog-link">
                <img src="./img/${photo}" alt="cat" class="blog-photo" />
<div class="wrapper">
              <h2 class="blog-title sub-title">${DOMPurify.sanitize(title)}</h2>
              <p class="blog-text">${DOMPurify.sanitize(header)}</p>
              </div>
      </a>
            </li>`;
        })
            .join('');
    });
}
window.onload = () => renderCatArticle(1);
