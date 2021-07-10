window.onload = ()=>{

    const srchbtn = document.querySelector('#srchbtn');
    srchbtn.addEventListener('click', event=>{

        const id = event.target.name;

        fetch(`/api/developers/${id}`)
        .then(res=>{
            return res.json();
        })
        .then(res=>{

            document.getElementById('id').innerText = res.id;

            for(const i = 0; i<7; i++){
                img = document.createElement('img');
                img.setAttribute('style','height: 30px')
                img.setAttribute('style','width: 30px')
                img.style.verticalAlign = 'middle';
                document.getElementById('linklist').appendChild(img)
            }


            for(const i = 0; i<3; i++){
                img = document.createElement('img');
                img.setAttribute('style','height: 30px')
                img.setAttribute('style','width: 30px')
                img.style.verticalAlign = 'middle';

                spn = document.createElement('span');

                document.getElementById('reachlist').appendChild(img)
                document.getElementById('reachlist').appendChild(spn)
            }

            for(const i = 0; i<res.repos.length; i++){
                name = document.createElement('div');
                name.innerText = res.repos[i].name;

                desc = document.createElement('p');
                desc.innerText = res.repos[i].description;

                document.getElementById('repos').appendChild(name)
                document.getElementById('repos').appendChild(desc)
            }
        
        }, error=>{
            document.querySelector('#profiles-display').style.display = 'none';
        })
    })
}