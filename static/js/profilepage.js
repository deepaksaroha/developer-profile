window.onload = ()=>{

    console.log(window.location.href)


    function reachlist(img1, text){
        const img = document.createElement('img');
        img.setAttribute('style','height: 30px')
        img.setAttribute('style','width: 30px')
        img.style.verticalAlign = 'middle';
        img.src = img1;

        const spn = document.createElement('span');
        spn.innerText = text;

        document.getElementById('reachlist').appendChild(img)
        document.getElementById('reachlist').appendChild(spn)
    }

    function linklist(img1, link){
        const a = document.createElement('a');
        a.href = link
        a.target = '_blank'

        const img = document.createElement('img');
        img.setAttribute('style','height: 30px')
        img.setAttribute('style','width: 30px')
        img.style.verticalAlign = 'middle';
        img.src = img1

        a.appendChild(img)
        document.getElementById('linklist').appendChild(a)
    }

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    const id = params.name

    fetch(`/api/developers/${id}`)
    .then(res=>{
        return res.json();
    })
    .then(res=>{

        const p_img = document.createElement('img')
        p_img.src = res.avatar_url;
        document.getElementById('profileimg').appendChild(p_img)


        document.getElementById('name').innerText = res.name;

        document.getElementById('intro-line').innerText = res.bio;


        linklist('/images/iconfinder_github_317712.png',`https://github.com/${res.github_id}`)
        linklist('/images/iconfinder_160_Hackerrank_logo_logos_4373234.png',`https://www.hackerrank.com/profile/${res.hackerrank_id}`)
        linklist('/images/codechef-1324440139527402917_32.png',`https://www.codechef.com/users/${res.codechef_id}`)
        linklist('/images/iconfinder_2018_social_media_popular_app_logo_linkedin_3225190.png',`https://linkedin.com/in/${res.linkedin_id}`)
        linklist('/images/iconfinder_Circled_Medium_svg5_5279113.png',`https://medium.com/@${res.medium_id}`)
        linklist('/images/iconfinder_2018_social_media_popular_app_logo_twitter_3225183.png',`https://twitter.com/${res.twitter_id}`)
        linklist('/images/email-24px.svg',res.email)

        
        reachlist('/images/location_on-24px.svg', res.location)
        reachlist('/images/business-24px.svg', res.company)
        reachlist('/images/insert_link-24px (1).svg', res.blog)


        for(let i = 0; i<res.repos.length; i++){
            console.log(res.repos[i].name)
            let name = document.createElement('div');
            name.innerText = res.repos[i].name;
            desc = document.createElement('p');
            desc.innerText = res.repos[i].description;
            document.getElementById('repos').appendChild(name);
            document.getElementById('repos').appendChild(desc);
        }
    })
}

