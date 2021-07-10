window.onload = ()=>{

    console.log(window.location.href)

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    const id = params.name

    fetch(`/api/developers/${id}`)
    .then(res=>{
        return res.json();
    })
    .then(res=>{

        // console.log(res)
        document.getElementById('name').innerText = res.name;

        document.getElementById('intro-line').innerText = res.bio;

        for(let i = 0; i<7; i++){
            let img = document.createElement('img');
            img.setAttribute('style','height: 30px')
            img.setAttribute('style','width: 30px')
            img.style.verticalAlign = 'middle';
            document.getElementById('linklist').appendChild(img)
        }

        let img1 = document.createElement('img');
        img1.setAttribute('style','height: 30px')
        img1.setAttribute('style','width: 30px')
        img1.style.verticalAlign = 'middle';
        spn1 = document.createElement('span');
        img1.src = '/images/location_on-24px.svg';
        spn1.innerText = res.location;
        document.getElementById('reachlist').appendChild(img1)
        document.getElementById('reachlist').appendChild(spn1)

        let img2 = document.createElement('img');
        img2.setAttribute('style','height: 30px')
        img2.setAttribute('style','width: 30px')
        img2.style.verticalAlign = 'middle';
        spn2 = document.createElement('span');
        img2.src = '/images/business-24px.svg';
        spn2.innerText = res.company;
        document.getElementById('reachlist').appendChild(img2)
        document.getElementById('reachlist').appendChild(spn2)

        let img3 = document.createElement('img');
        img3.setAttribute('style','height: 30px')
        img3.setAttribute('style','width: 30px')
        img3.style.verticalAlign = 'middle';
        spn3 = document.createElement('span');
        img3.src = '/images/insert_link-24px (1).svg';
        spn3.innerText = res.blog;
        document.getElementById('reachlist').appendChild(img3)
        document.getElementById('reachlist').appendChild(spn3)

        

        for(let i = 0; i<res.repos.length; i++){

            console.log(res.repos[i].name)
            let name = document.createElement('div');
            name.innerText = res.repos[i].name;
            desc = document.createElement('p');
            desc.innerText = res.repos[i].description;
            document.getElementById('repos').appendChild(name)
            document.getElementById('repos').appendChild(desc)
        }
    
    })
}