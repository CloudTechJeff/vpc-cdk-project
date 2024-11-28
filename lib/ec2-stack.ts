import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

// -----Props-----
interface EC2StackProps extends cdk.StackProps {
    vpc: ec2.Vpc;
}

export class EC2Stack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: EC2StackProps) {
        super(scope, id, props);

        const subnetSelectionAZ1 = props.vpc.selectSubnets({
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
            availabilityZones: [props.vpc.availabilityZones[0]],
        });

        const subnetSelectionAZ2 = props.vpc.selectSubnets({
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
            availabilityZones: [props.vpc.availabilityZones[1]],
        });

        // EC2 Instance 1 in AZ 1
        const instance1 = new ec2.Instance(this, 'MyPrivateEC2-AZ1', {
            vpc: props.vpc,
            vpcSubnets: {
                subnets: subnetSelectionAZ1.subnets,
            },
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
            }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
        });

        cdk.Tags.of(instance1).add('Name', 'MyPrivateEC2-AZ1');

        // EC2 Instance 2 in AZ 2
        const instance2 = new ec2.Instance(this, 'MyPrivateEC2-AZ2', {
            vpc: props.vpc,
            vpcSubnets: {
                subnets: subnetSelectionAZ2.subnets,
            },
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
            }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
        });

        cdk.Tags.of(instance2).add('Name', 'MyPrivateEC2-AZ2');
    }
}
