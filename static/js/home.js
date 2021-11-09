window.onload = ()=>{


    function displayprofs(result){
        
        let box = document.createElement('div');
        box.name = result.id;
        box.class = 'proflinks';
        box.style.margin = '20px 0px';
        box.addEventListener('click', (event)=>{
            console.log(event.target.name);            
            window.location = `profilepage.html?name=${event.target.name}`;
        })

        let avatar = document.createElement('img');
        avatar.setAttribute('src', `https://github.com/${result.id}.png`);
        avatar.setAttribute('style','width: 100px');
        avatar.style.borderRadius = '50%';
        avatar.style.verticalAlign = 'middle';
        avatar.name = result.id;

        let prof_id = document.createElement('span');
        prof_id.innerText = result.id
        prof_id.style.marginLeft = '50px';
        prof_id.style.marginRight = '20px';
        prof_id.name = result.id;

        let arrow = document.createElement('img');
        arrow.setAttribute('src', '/images/north_east-24px.svg')
        arrow.alt = result.id;
        box.appendChild(avatar)
        box.appendChild(prof_id)
        box.appendChild(arrow)
        document.querySelector('#profiles-display').appendChild(box);
    }

    

    function displaydashboard(){
        fetch('/api/developers').then(res=>{
            return res.json();
        })
        .then(res=>{
            if((res.list).length === 0){
                document.querySelector('#profiles-display').style.display = 'none';
                document.querySelector('.cover').style.display = 'none';
                document.querySelector('.common hr').style.display = 'none';
                document.querySelector('.bottom').innerText = 'No developers added yet';
            }
            else{
                for(i in res.list){

                    displayprofs(res.list[i]);
                }
            }
        })
    }

    displaydashboard();

    const idinput = document.querySelector('.form-box input');


    idinput.addEventListener('focus', ()=>{
        document.querySelector('#profiles-display').style.display = 'grid';
        fetch(`/api/developers/`)
        .then(res=>{
            return res.json();
        })
        .then(res=>{
            profileSearchResults = res.list;
        })
    }) 

    let filteredResults = []

    idinput.addEventListener('input', event=>{
        event.preventDefault();
        const inputId = event.target.value;

        filteredResults = profileSearchResults.filter(element=>{
            return inputId.length && element.id.startsWith(inputId);
        })


        if (event.target.value.length>0){
            document.querySelector('#profiles-display').innerHTML = '';
            filteredResults.forEach(ele=>{
                displayprofs(ele);
            })
        }else{
            document.querySelector('#profiles-display').innerHTML = ''
            displaydashboard();
        }
    })

    
    const srchbtn = document.querySelector('#srchbtn');
    srchbtn.addEventListener('click', event=>{
        event.preventDefault();

        const formele = document.querySelector('#srchform');
        const formData = new FormData(formele);

        if(formData.get('id') !== ''){            
            document.querySelector('#profiles-display').innerHTML = '';
            fetch(`/api/developers/${formData.get('id')}`)
            .then(res=>{
                return res.json();
            })
            .then(res=>{
    
                displayprofs(res);
    
            }, error=>{
                document.querySelector('#profiles-display').style.display = 'none';
            })
        }else{
            window.alert('Enter something to search');
        }
    })
 


    const devbtn = document.querySelector('.bottom-btn');
    devbtn.addEventListener('click', event=>{
        document.querySelector('#form-input div input').value = '';
        document.querySelector('#overlay').style.display = 'block'; 
        document.querySelector('#dev-form').style.display = 'block';
    })



    const cancelbtn = document.querySelector('#cancelbtn');
    cancelbtn.addEventListener('click', event=>{
        event.preventDefault();
        document.querySelector('#overlay').style.display = 'none'; 
        document.querySelector('#dev-form').style.display = 'none';
    })



    const submitbtn = document.querySelector('#submitbtn');
    submitbtn.addEventListener('click', event=>{
        
        event.preventDefault();

        const formele = document.querySelector("#form");
        const formData = new FormData(formele);


        if(formData.get('github_id') !== ''){
            const request = new Request('/api/developers', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(Object.fromEntries(formData))
            })
            
        
            fetch(request).then(res=>{
                return res.json();
            }).then(res=>{
                displayprofs(res);
                
                document.querySelector('#profiles-display').style.display = 'grid';
                document.querySelector('.cover').style.display = 'block';
                document.querySelector('.common hr').style.display = 'block';
                document.querySelector('.bottom').innerText = 'Could not find what you were looking for?';
            
                document.querySelector('#overlay').style.display = 'none'; 
                document.querySelector('#dev-form').style.display = 'none';
            
            })
            .catch(error=>{
                window.alert('GitHub username is invalid');
            })
        }else{
            window.alert('GitHub username is required')
        }
    })

    

}