# Developer Profile
##A profile building app. 
Lets users create a profile by providing links to various profiles like github, linkedin, twitter etc. Aggregates data from various public profiles and displays at one place. 

## Technologies used
<li>html</li>
<li>css</li>
<li>Javascript</li>
<li>express ^4.17.1</li>
<li>axios ^0.21.1</li>
<li>Heroku</li>

## UI
<img src="/readmeimages/dp-ss1.jpg" />
<img src="/readmeimages/dp-ss2.jpg" />
<img src="/readmeimages/dp-ss3.jpg" />
<img src="/readmeimages/dp-ss4.jpg" />

## API Endpoints
```
POST http://devprofile1.herokuapp.com/api/developers
Sample Request Data
{
  codechef_id: "",
  github_id: "deepaksaroha",
  hackerrank_id: "",
  linkedin_id: "",
  medium_id: "",
  twitter_id: ""
}
Sample Response Data
{
  id: "deepaksaroha"
}
```

```
GET http://devprofile1.herokuapp.com/api/developers/deepaksaroha

Sample Response Data
{
  avatar_url: "https://avatars.githubusercontent.com/u/29004767?v=4"
  bio: null
  blog: ""
  codechef_id: ""
  company: null
  email: null
  github_id: "deepaksaroha"
  hackerrank_id: ""
  id: "deepaksaroha"
  linkedin_id: ""
  location: null
  medium_id: ""
  name: null
  repos: [
            0: {name: "big-companies-interview-questions",…}
            description: "A curated list of previous asked Interview Question at Big Companies and Startups 🤲 🏆"
            html_url: "https://github.com/deepaksaroha/big-companies-interview-questions"
            name: "big-companies-interview-questions"
            updated_at: "2022-01-18T17:38:35Z"},
         ]
  twitter_id: ""
}
```


```
GET http://devprofile1.herokuapp.com/api/developers

Sample Response Data
[
  {
    avatar_url: "https://avatars.githubusercontent.com/u/29004767?v=4"
    id: "deepaksaroha"
  },
]
```
