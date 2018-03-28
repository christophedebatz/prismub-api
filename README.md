
# Primub REST API v1.0
Typescripted API for
More information about how using TypeScript here: https://www.typescriptlang.org/docs/handbook

## Searching a public repository
**GET /repositories?search=*{search-input}*[&page=*{page-no}*]**

Example for "Boot" like "Bootstrap"...
```
[
    {
        "id": 2126244,
        "name": "bootstrap",
        "description": "The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.",
        "language": "CSS",
        "starsCount": 123091,
        "url": "https://api.github.com/repos/twbs/bootstrap",
        "owner": {
            "name": "twbs",
            "pictureUrl": "https://avatars0.githubusercontent.com/u/2918581?v=4"
        }
    },
    {
        "id": 23069399,
        "name": "bootstrap-material-design",
        "description": "Material design theme for Bootstrap 3 and 4",
        "language": "CSS",
        "starsCount": 19132,
        "url": "https://api.github.com/repos/FezVrasta/bootstrap-material-design",
        "owner": {
            "name": "FezVrasta",
            "pictureUrl": "https://avatars2.githubusercontent.com/u/5382443?v=4"
        }
    },
    // ...
]
```

## Access to some repository's commits metrics
**GET /users/*{repo-owner}*/repositories/*{repo-name}*/metrics[?page=*{page-no}*]**

Example for the "mistergift-front" repository for user "christophedebatz".
Used to get the repartition of the implications of each developers who participated to a project.
Each page contains about 100 commits, dispatched over their authors.
```
{
    "commitsCount": 79,
    "details": [
        {
            "commitsCount": 77,
            "ratio": 97.47,
            "user": {
                "name": "joulse",
                "email": "contact@julienducrot.com",
                "pictureUrl": "https://avatars2.githubusercontent.com/u/5382443?v=4",
                "profileUrl": "https://github.com/christophedebatz"
            }
        },
        {
            "commitsCount": 1,
            "ratio": 1.27,
            "user": {
                "name": "Christophe de Batz",
                "email": "christophe.db@gmail.com",
                "pictureUrl": "https://avatars2.githubusercontent.com/u/5382443?v=4",
                "profileUrl": "https://github.com/christophedebatz"
            }
        },
        {
            "commitsCount": 1,
            "ratio": 1.27,
            "user": {
                "name": "polem",
                "email": "paulemile.miny@gmail.com"
                "pictureUrl": "https://avatars2.githubusercontent.com/u/5382443?v=4",
                "profileUrl": "https://github.com/christophedebatz"
            }
        },
        // ...
    ]
}
```

## Retrieve the list of commits for a repository
**GET /users/*{repo-owner}*/repositories/*{repo-name}*/commits[?page=*{page-no}*]**

Used to get the last commits of the given repository (all branches concerned, obviously ordered by commit date).
Each page serve about 100 commits.

```
 [
        {
            "sha": "3958e8e3213647d49244b7b0cc129865e1e5d9b2",
            "message": "feat(translation): add translation flag into search service",
            "creationDate": "2018-03-26T14:31:56Z",
            "author": {
                "name": "chris15",
                "email": "chris@chris.com",
                "pictureUrl": "https://avatars2.githubusercontent.com/u/5382443?v=4",
                "profileUrl": "https://github.com/chrissou"
            }
        },
        {
            "sha": "3958e8e3213647d49244b7b0cc129865e1e5d9b2",
            "message": "feat(translation): add translation flag into search service",
            "creationDate": "2018-03-26T14:31:56Z",
            "author": {
                "name": "chris15",
                "email": "chris@chris.com",
                "pictureUrl": "https://avatars2.githubusercontent.com/u/5382443?v=4",
                "profileUrl": "https://github.com/chrissou"
            }
        },
        // ...
]
