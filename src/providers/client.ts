import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { AuthOptions, AUTH_TYPE, createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { getToken } from './auth';
import { RetryLink } from '@apollo/client/link/retry';

const url = `https://graph.qmenu.mn/graphql`;

// const url = 'https://iphdknedhzgrrdmxc5tvh6zmq4.appsync-api.ap-east-1.amazonaws.com/graphql';

const region = `ap-east-1`;

const auth: AuthOptions = {
  type: AUTH_TYPE.AWS_LAMBDA,
  token: () => getToken(),
};

const httpLink = createHttpLink({ uri: url });

const authLink = createAuthLink({ url, region, auth });

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((element: any, index: any) => {
      switch (element.errorType) {
        // case 'UnauthorizedException': {
        //   localStorage.clear();
        //   window.location.reload();
        //   return forward(operation);
        // }

        case 'PE0001': {
          window.location.href = '/notplan';
          return forward(operation);
        }
      }
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const subscriptionLink = createSubscriptionHandshakeLink({ url: url, region, auth }, httpLink);

const retryLink = new RetryLink({
  delay: {
    initial: 1000,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => {
      return error.networkError || error.graphQLErrors;
    },
  },
});

const link = ApolloLink.from([retryLink, authLink, errorLink, subscriptionLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
