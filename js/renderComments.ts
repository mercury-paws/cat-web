const commentSection = document.querySelector(".comment-section") as HTMLElement;
const heading = commentSection?.querySelector(".commentsh3") as HTMLElement;
const loadingMessage = document.querySelector(".loading-message");
  
axios.defaults.baseURL = "https://profile-server-qbyd.onrender.com";
axios.defaults.withCredentials = true;

interface Comments{
  name: string;
  comment: string;
}


const localComments: Comments[] = [
  {
    name: "Максим",
    comment:
      "Я ніколи не усвідомлював, скільки прихованих талантів мають коти! Від їхніх мисливських інстинктів до здатності спілкуватися так витончено, неймовірно, скільки ми можемо від них навчитися. Вони справді містичні та захоплюючі створіння.",
  },
  {
    name: "Юлія",
    comment:
      "Неймовірно, як коти адаптуються до свого оточення, поєднуючи грацію з інтелектом так, що це часто залишається непоміченим. Те, як вони відчувають події до того, як вони стануться, наприклад, землетруси, просто вражає. Коти — це точно більше, ніж просто милі домашні улюбленці!",
  },
];

async function fetchCatComments(): Promise<Comments[] | null> {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("urlParams", urlParams)
    const catArticleId = urlParams.get("id");
    const response = await axios.get(`/cat-comments/${catArticleId}`);
	return response.data.data.data;
  } catch (error) {
    console.warn("Server request failed. Using local comments.json instead.");
    return null;
  }  
}

async function renderCatComments() {
  let comments = await fetchCatComments();

  if (!comments || comments.length === 0) {
    comments = localComments;
  }

  if (loadingMessage) {
    loadingMessage.remove();
  }

   if (heading && comments.length === 0) {
    heading.insertAdjacentHTML("afterend", `<p class="loading-message">No comments available.</p>`);
    return;
  }

  

  comments.forEach(({ name, comment }) => {
    const sanitizedComment = DOMPurify.sanitize(comment);
    const sanitizedName = DOMPurify.sanitize(name);
    const markup = `
      <article class="received-comment">
        <p class="client-text-review">${sanitizedComment}</p>
        <p class="client-name">${sanitizedName}</p>
      </article>
    `;
    
    if (heading) {
  heading.insertAdjacentHTML("afterend", markup);
}
  })

  if (heading && (!comments || !localComments)) {
  heading.insertAdjacentHTML("afterend", "<p>Comments are loading from the server, please wait. Thank you.</p>");
}
   
  }
  
  window.onload = renderCatComments;
  
