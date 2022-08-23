# ETF Tracker

[ETF Tracker](https://yumingchang1991.github.io/proxy-frontend/) is a simple demonstration of using a proxy server to request data from a third party API.

[Marketstack](https://marketstack.com/documentation) is the third party API used in this project.

# Backend Repo (HTTP on AWS)

This is the backend repo, auto-deployed to AWS, for [ETF Tracker](https://yumingchang1991.github.io/proxy-frontend/).

By setting up this server, I wrote an article on Medium sharing [the 3 steps to deploy TypeScript server to AWS](https://blog.devgenius.io/3-steps-to-deploy-typescript-to-aws-elastic-beanstalk-with-continuous-delivery-611bc7ecf15c)

This repo could operate, but it is a HTTP server.

HTTPS request to HTTP server is blocked by modern AJAX library & browser. So this repo only serves as the track of my self learning journey.

