import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

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

const query = gql`
  {
    organization(login: "apollographql") {
      repositories(first: 5) {
        nodes {
          id
          name
          url
          viewerHasStarred
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`

client
  .query({
    query
  })
  .then(result => console.log(result));

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

