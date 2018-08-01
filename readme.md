# 4k API

[![CircleCI](https://circleci.com/gh/smaclell/4k/tree/master.svg?style=svg)](https://circleci.com/gh/smaclell/4k/tree/master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](https://github.com/smaclell/4k/blob/master/CODE_OF_CONDUCT.md)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

This is a simple service for retrieving/interacting with the [4k world map data](http://4kworldmap.com/). The data exclusively belongs to 4k world map project.

# Get started

You must have Docker installed. If you are using Docker for Mac, make sure to share the repo directory.

To develop the application run `./start.dev`

# Managing the Data

To simplify the data before publishing we import and restructure it from the individual regions and maps to flat files. To extract the data run:

```
node ./data/importer.js
```

# API

## `GET /region/:regionKey`

Get basic data about the region.

```http
# REQUEST
GET /region/CAN-MAN

# RESPONSE
content-type: application/json

{
  "regionKey": "CAN-MAN",
  "country": "Canada",
  "province": "Manitoba",
  "label": "Manitoba"
}
```

## `GET /geojson/:regionKey`

Get the geojson defining the shape of the region.

```http
# REQUEST
GET /geojson/CAN-MAN

# RESPONSE
content-type: application/json

{
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [
                    -98.1205501734768,
                    54.2802499570956,
                    0
                ],
                ...
                [
                    -98.1205501734768,
                    54.2802499570956,
                    0
                ]
            ],
            ...
            [
                [
                    -100.028849917578,
                    53.0991501003509,
                    0
                ],
                ...
                [
                    -98.1927499943503,
                    57.6727498603561,
                    0
                ]
            ]
        ]
    },
    "properties": {
        "regionKey": "CAN-MAN"
    }
}
```

# Contributing

We maintain an active backlog of new features and bugs we would love your help with.

Have a great idea or change you want to share? Awesome. We actively welcome pull requests:

1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.

We have adopted a [Code of Conduct]((https://github.com/smaclell/4k/blob/master/CODE_OF_CONDUCT.md)) that we expect project participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated.

# Deploying

We are running the site using Zeit now.

Deploy using:

```
now --docker --public
```

Test the new site to make sure the basics work.

Then alias the new deployment to update the main site:

```
now alias 4k-yhgtxlebeu.now.sh 4kmaps
```

# License

This project is [Apache 2.0](https://github.com/smaclell/4k/blob/master/LICENSE.md) Licensed. We also provide an additional patent grant.
