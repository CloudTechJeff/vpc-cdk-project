#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { VpcCdkProjectStack } from "../lib/vpc-cdk-project-stack";
import { EC2Stack } from "../lib/ec2-stack"; // Updated import path

const app = new cdk.App();
const vpcStack = new VpcCdkProjectStack(app, "VpcCdkProjectStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

new EC2Stack(app, "MyEC2Stack", {
  vpc: vpcStack.vpc,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

app.synth();
