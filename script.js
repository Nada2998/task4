fetch('https://jsonplaceholder.typicode.com/posts') 
    .then(response => response.json()) 
    .then(posts => { 
        const postsContainer = document.getElementById('posts'); 
        posts.forEach(post=> { 
            const postElement = document.createElement('div'); 
            postElement.classList.add('post','col-md-6','mb-3','border','rounded','pt-4'); 
            postElement.innerHTML = ` 
            <div class=" text-center"> 
                <h3 class=" pb-4">${post.title}</h3> 
                <p class=" pb-3 fst-italic ">${post.body}</p> 
                <button class="mb-4 btn btn-outline-light mx-auto" data-post-id="${post.id}">Comment</button> 
                <div class="comments" id="comments-${post.id}"></div> 
            </div> 
            `; 
            postsContainer.appendChild(postElement); 
            const button = postElement.querySelector('button'); 
            button.addEventListener('click', function(event) { 
                const postId = this.getAttribute('data-post-id'); 
                const commentsContainer = document.getElementById(`comments-${postId}`);
                if (commentsContainer.innerHTML === '') { 
                    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`) 
                        .then(response => response.json()) 
                        .then(comments => { 
                            comments.forEach(comment=> { 
                                const commentElement = document.createElement('div'); 
                                commentElement.classList.add('comment','mb-5'); 
                                commentElement.innerHTML = ` 
                                    <p>${comment.name}</p> 
                                    <p class="email text-info">${comment.email}</p> 
                                    <p class="text-secondary text-white">${comment.body}</p> 
                                `; 
                                commentsContainer.appendChild(commentElement); 
                            }); 
                        }); 
                } else { 
                    commentsContainer.innerHTML = ''; 
                } 
            }); 
        }); 
    }) 
   
