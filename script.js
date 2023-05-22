const blogDiv=document.querySelector(".blog-container");
const title=document.querySelector(".title-input");
const description=document.querySelector(".descript-input");

fetchBlogData();
let blogArray=""

// fetchblogData function
function fetchBlogData(){
   fetch("https://jsonplaceholder.typicode.com/posts")
   .then(async(response)=>{
    const json=await response.json();
    console.log("res=",json);
    blogArray=json;
    loadBlogPost();
   })
   .catch(error=>{
    console.log(error);
   })
}


// loads blogs to page
function loadBlogPost(){
    let html="";
    blogArray.forEach((data,index) => {
        html+=`<div class="border border-black p-1">
        <div class="flex flex-row item-center justify-between bg-[#4285F4]"><h1 class="font-medium text-white pl-2">${data.title}</h1>
        <button onClick="deleteBlog('${data.title}')" class="px-2 py-1 bg-[#E21717] text-white">Delete</button>
        </div>
        <div><p>${data.body}</p></div>
    </div>`
    });
    blogDiv.innerHTML=html;
}


// creates new blog
function createBlog(){
    if(title.value.length>0 && description.value.length>0){
        blogArray.push({
            body: description.value,
            id: blogArray.length+"guest"+1,
            title: title.value,
        })
        description.value="",
        title.value=""
        loadBlogPost();
        console.log(blogArray);
    }
    else{
        window.alert("All feilds are required")
    }
}


// delete a blog
function deleteBlog(title){
    blogArray=blogArray.filter(post=>post.title!=title);
    loadBlogPost();

}