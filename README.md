# Welcome to your CDK Typescript project

This is a blank project for CDK development with Typescript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

In ./lib/old-ec2-stack.ts there is a setup for the 2 EC2 Instances that
I'm sure is incorrect for deploying to specific AZ's, because we only
2 EC2 and 2 AZ's it was inevitable that they would go in the correct
place. 
I am working on a way to do it, But it might be beyond me at the moment,
But I'm reading AWS docs and will figure it out soon before I move on 
to adding the Databases to this project.

