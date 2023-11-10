async function script(csrfToken,xToken,id,length) {
    var resp = await fetch("https://playentry.org/graphql", {
      "headers": {
        "content-type": "application/json",
        "csrf-token": `${csrfToken}`,
        "x-client-type": "Client",
        "x-token": `${xToken}`
     },
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"query\":\"\\n    query SELECT_ENTRYSTORY(\\n    $pageParam: PageParam\\n    $query: String\\n    $user: String\\n    $category: String\\n    $term: String\\n    $prefix: String\\n    $progress: String\\n    $discussType: String\\n    $searchType: String\\n    $searchAfter: JSON\\n){\\n        discussList(\\n    pageParam: $pageParam\\n    query: $query\\n    user: $user\\n    category: $category\\n    term: $term\\n    prefix: $prefix\\n    progress: $progress\\n    discussType: $discussType\\n    searchType: $searchType\\n    searchAfter: $searchAfter\\n) {\\n            total\\n            list {\\n                \\n\\tid\\n    content\\n    created\\n    commentsLength\\n    likesLength\\n    user {\\n        \\n    id\\n    nickname\\n    username\\n    profileImage {\\n        \\n    id\\n    name\\n    label {\\n        \\n    ko\\n    en\\n    ja\\n    vn\\n\\n    }\\n    filename\\n    imageType\\n    dimension {\\n        \\n    width\\n    height\\n\\n    }\\n    trimmed {\\n        filename\\n        width\\n        height\\n    }\\n\\n    }\\n    status {\\n        following\\n        follower\\n    }\\n    description\\n    role\\n    mark {\\n        \\n    id\\n    name\\n    label {\\n        \\n    ko\\n    en\\n    ja\\n    vn\\n\\n    }\\n    filename\\n    imageType\\n    dimension {\\n        \\n    width\\n    height\\n\\n    }\\n    trimmed {\\n        filename\\n        width\\n        height\\n    }\\n \\n    }\\n\\n    }\\n    image {\\n        \\n    id\\n    name\\n    label {\\n        \\n    ko\\n    en\\n    ja\\n    vn\\n\\n    }\\n    filename\\n    imageType\\n    dimension {\\n        \\n    width\\n    height\\n\\n    }\\n    trimmed {\\n        filename\\n        width\\n        height\\n    }\\n\\n    }\\n    sticker {\\n        \\n    id\\n    name\\n    label {\\n        \\n    ko\\n    en\\n    ja\\n    vn\\n\\n    }\\n    filename\\n    imageType\\n    dimension {\\n        \\n    width\\n    height\\n\\n    }\\n    trimmed {\\n        filename\\n        width\\n        height\\n    }\\n\\n    }\\n    isLike\\n\\n            }\\n            searchAfter\\n        }\\n    }\\n\",\"variables\":{\"category\":\"free\",\"user\":\"${id}\",\"term\":\"all\",\"searchType\":\"scroll\",\"pageParam\":{\"display\":${length},\"sort\":\"created\"}}}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    })
    .then(response => response.json())
    .then(data => {
        const json = data; 
        const arr = json.data.discussList.list;
        
        for (let i=0; i<length; i++) {
            var contentId = arr[i].id;
            fetch("https://playentry.org/graphql", {
              "headers": {
                "content-type": "application/json",
                "csrf-token": `${csrfToken}`,
                "x-client-type": "Client",
                "x-token": `${xToken}`
              },
              "referrerPolicy": "strict-origin-when-cross-origin",
              "body": `{\"query\":\"\\n    mutation REMOVE_DISCUSS($id: ID) {\\n        removeDiscuss(id: $id){\\n            id\\n        }\\n    }\\n\",\"variables\":{\"id\":\"${contentId}\"}}`,
              "method": "POST",
              "mode": "cors",
              "credentials": "include"
            });
        }
        
        console.log('삭제가 완료되었으니 새로고침 하셔도 좋아요!');
    })
}

const id = location.href.slice(30,54);

const length = prompt('몇 개의 커뮤니티 글을 삭제?');

const next_data = document.getElementById("__NEXT_DATA__");
const nj = JSON.parse(next_data.innerText);
const csrf = nj.props.initialProps.csrfToken;
const xtoken = nj.props.initialState.common.user.xToken;

console.log('삭제하는 중입니다..');
script(csrf,xtoken,id,length);
