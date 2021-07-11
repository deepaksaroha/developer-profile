const express = require('express');
const router = express.Router();
const profiles = require('./devprofileData');
const axios = require('axios');

router.get('/', (req, res, next)=>{
    response = []
    for(profile in profiles){
        response.push({
            "id": profiles[profile].id,
            "avatar_url": profiles[profile].avatar_url
        })
    }
    res.status(200).send({ list: response });
})

router.post('/', (req, res, next)=>{

    const id = req.body.github_id

    axios.all([
        axios.get(`https://api.github.com/users/${id}`), 
        axios.get(`https://api.github.com/users/${id}/repos`)
    ])
    .then(axios.spread((...response) => {        
        
        userdata = response[0].data;
        
        profiles[id] = {
            "id": id,
	        "avatar_url": userdata.avatar_url,
	        "name": userdata.name,
	        "company": userdata.company,
	        "blog": userdata.blog,
	        "location": userdata.location,
	        "email": userdata.email,
	        "bio": userdata.bio,
	        "github_id": id,
	        "linkedin_id": req.body.linkedin_id,
	        "codechef_id": req.body.codechef_id,
	        "hackerrank_id": req.body.hackerrank_id,
	        "twitter_id": req.body.twitter_id,
	        "medium_id": req.body.medium_id,
        }


        repos = []
        for(repo in response[1].data){
            repos.push({
                name: response[1].data[repo].name,
                html_url: response[1].data[repo].html_url,
                description: response[1].data[repo].description,
                updated_at: response[1].data[repo].updated_at
            })
        }
        profiles[id].repos = repos;

        res.status(201).send({ "id": id })
    })).catch(error => {
        res.status(400).send('GitHub username is invalid');
    })
})

router.get('/:id', (req, res, next)=>{
    
    profile = profiles[req.params.id]
    if (profile){
        res.status(200).send({
            "id": req.params.id,
	        "avatar_url": profile.avatar_url,
	        "name": profile.name,
	        "company": profile.company,
	        "blog": profile.blog,
	        "location": profile.location,
	        "email": profile.email,
	        "bio": profile.bio,
	        "github_id": req.params.id,
	        "linkedin_id": profile.linkedin_id,
	        "codechef_id": profile.codechef_id,
	        "hackerrank_id": profile.hackerrank_id,
	        "twitter_id": profile.twitter_id,
	        "medium_id": profile.medium_id,
	        "repos": profile.repos
        })
    }else{
        res.status(404).send('User does not exist');
    }
})

router.delete('/:id', (req, res, next)=>{
    const id = req.params.id;
    delete profiles.id;
    res.status(204).send('Deleted');
})

module.exports = router;