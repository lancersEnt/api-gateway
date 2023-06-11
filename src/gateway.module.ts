import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'posts',
              url: 'http://localhost:9119/graphql',
            },
            {
              name: 'comments',
              url: 'http://localhost:9229/graphql',
            },
          ],
        }),
      },
    }),
  ],
})
export class GatewayModule {}
