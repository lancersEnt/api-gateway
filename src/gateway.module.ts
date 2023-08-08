import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { GraphQLDataSource } from './graphql-data-source';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        buildService: (args) => new GraphQLDataSource(args),
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'users',
              url: 'http://localhost:9009/graphql',
            },
            {
              name: 'posts',
              url: 'http://localhost:9119/graphql',
            },
            {
              name: 'comments',
              url: 'http://localhost:9229/graphql',
            },
            {
              name: 'klads',
              url: 'http://localhost:9339/graphql',
            },
            // {
            //   name: 'mailer',
            //   url: 'http://localhost:9449/graphql',
            // },
            {
              name: 'notification',
              url: 'http://localhost:9559/graphql',
            },
          ],
        }),
      },
    }),
  ],
})
export class GatewayModule {}
