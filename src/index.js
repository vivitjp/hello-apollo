import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from "apollo-boost";
//import gql from "graphql-tag";
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
          }`
      }
    });
  }
});

// const query1 = gql`
//   {
//     organization(login: "apollographql") {
//       repositories(first: 10) {
//         nodes {
//           id
//           name
//           url
//           viewerHasStarred
//           stargazers {
//             totalCount
//           }
//         }
//       }
//     }
//   }
// `

// client
//   .query({ query: query1 })
//   .then(result => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
