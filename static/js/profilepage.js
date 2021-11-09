window.onload = ()=>{



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
        document.getElementById('linklist').appendChild(a);
    }

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    const id = params.name;

    fetch(`/api/developers/${id}`)
    .then(res=>{
        return res.json();
    })
    .then(res=>{

        document.getElementById('profileimg').src = res.avatar_url;

        document.getElementById('name').innerText = res.name;

        document.getElementById('intro-line').innerText = res.bio;


        res.github_id && linklist('/images/iconfinder_github_317712.png',`https://github.com/${res.github_id}`);
        res.hackerrank_id && linklist('/images/iconfinder_160_Hackerrank_logo_logos_4373234.png',`https://www.hackerrank.com/profile/${res.hackerrank_id}`)
        res.codechef_id && linklist('/images/codechef-1324440139527402917_32.png',`https://www.codechef.com/users/${res.codechef_id}`)
        res.linkedin_id && linklist('/images/iconfinder_2018_social_media_popular_app_logo_linkedin_3225190.png',`https://linkedin.com/in/${res.linkedin_id}`)
        res.medium_id && linklist('/images/iconfinder_Circled_Medium_svg5_5279113.png',`https://medium.com/@${res.medium_id}`)
        res.twitter_id && linklist('/images/iconfinder_2018_social_media_popular_app_logo_twitter_3225183.png',`https://twitter.com/${res.twitter_id}`)
        res.email && linklist('/images/email-24px.svg',res.email)

        
        reachlist('/images/location_on-24px.svg', res.location)
        reachlist('/images/business-24px.svg', res.company)
        reachlist('/images/insert_link-24px (1).svg', res.blog)

 
        for(let i = 0; i<res.repos.length; i++){


            let box = document.createElement('div')
            box.style.marginTop = '30px';
            box.style.marginBottom = '30px';

            let name = document.createElement('a');
            name.innerText = res.repos[i].name;
            name.href = res.repos[i].html_url;
            name.style.textDecoration = 'none';
            name.style.fontSize = '36px';
            name.style.color = '#4396da';

            let date = document.createElement('span');
            date.innerText = `Updated on ${res.repos[i].updated_at}`;
            date.style.fontSize = '24px';
            date.style.marginLeft = '20px';
            date.style.color = '#b3b9bd';

            let arrow = document.createElement('img');
            arrow.src = '/images/north_east-24px.svg';

            let desc = document.createElement('p');
            desc.innerText = res.repos[i].description;
            desc.style.fontSize = '32px';
            desc.style.color = '#7d7f81';


            box.appendChild(name);            
            box.appendChild(arrow);           
            box.appendChild(date); 
            box.appendChild(desc);

            document.getElementById('repos').appendChild(box);
            document.getElementById('repos').appendChild(document.createElement('hr'));
            
        }
    })
}

