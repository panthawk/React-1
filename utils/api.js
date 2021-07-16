const id = "53a897d4a281fc207537";
const sec = "fe7b2f3a5ab0c1447807bbcd100b0e0f7bd8dec6";
const param = `?client_id=${id}&client_secret=${sec}`;

function ErrorMessage(message, userName){
    if(message === "Not Found"){
        return `${userName} does not exist`;
    }
    return message;
}

function getRepos(userName){
    return fetch(`https://api.github.com/users/${userName}/repos${param}&per_page=100`)
    .then((res)=>res.json)
    .then((repos)=>{
        if(repos.message){
          throw new Error(ErrorMessage(repos.message, userName));
        }
        return repos; 
    })
}

function getProfile(userName) {
    return fetch(`https://api.github.com/users/${userName}${param}`)
    .then((res) => res.json())
    .then((profile) => {
        if(profile.message){
         throw new Error(ErrorMessage(profile.message, username));
        }
    return profile;
    });
}

function getStar(repos) {
    return repos.reduce((count, { stargazers_count }) => count + stargazers_count , 0)
  }

function calculateStar(followers, repos){
    return (followers*3)+getStar(repos);
}

function getUserData(player){
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(([profile, repos])=>({
        profile,
        score:calculateStar(profile.followers, repos)
    }))
}

function sortPlayer(result){
    return result.sort((a, b)=>b.score - a.score);
}

export function Battle(player) {
    return Promise.all([
        getUserData(player[0]),
        getUserData(player[1])
    ]).then((result)=>sortPlayer(result));
}
export function fetchRepos(language){
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    return fetch(endpoint)
        .then((res)=>res.json())
        .then((data)=>{
            if(!data.items){
                throw new Error("not able to fetch");
            }
        return data.items;
        })
}