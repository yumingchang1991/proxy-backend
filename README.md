# ETF Tracker

[ETF Tracker](https://yumingchang1991.github.io/proxy-frontend/) is a simple demonstration of using a proxy server to request data from a third party API.

[Marketstack](https://marketstack.com/documentation) is the third party API used in this project.

# Why Proxy Server?

**More Secured**: It completely hides the visibility of the access token to third-party from frontend.

**Better Experience with Faster Responsiveness**: It is achieved by cacheing the response, and by doing so reduces the number for server to actually make the API call to third party service.

# Backend Repo (HTTP on AWS)

This is the backend repo, auto-deployed to AWS EC2.

By setting up this server, I wrote an article on Medium sharing [the 3 steps to deploy TypeScript server to AWS](https://blog.devgenius.io/3-steps-to-deploy-typescript-to-aws-elastic-beanstalk-with-continuous-delivery-611bc7ecf15c)

# Backend Techstack

- TypeScript
- Express
- apicache
- express-rate-limit
- axios
- AWS Elastic Beanstalk
- AWS CodePipeline

# API Documentation

[ETF Tracker - Proxy Server APIs](https://app.swaggerhub.com/apis-docs/YUMINGCHANG1991_1/ETFProxyServer/1.0.0) which is created in swagger

# Backend Description

It is a simple proxy server that hides the access token to Marketstack, caches responses, and limit api call rate.

This repo is connected to AWS CodeBuild, so each time there is a change in repo, it will automatically compile typescript, and deploy this application to AWS EC2.

# Repo Navigation
[to Frontend Repo](https://github.com/yumingchang1991/proxy-frontend)
