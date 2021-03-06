import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const myQuery = gql`
  {
    organization(login: "apollographql") {
      repositories(first: 5, isFork: false) {
        nodes {
          id
          name
          url
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;

const App = () => (
  <Query query={myQuery}>
    {({ loading, data }) => {
      if (loading) return <p>Loading...</p>;

      const repositories = data.organization.repositories.nodes;

      return (
        <ul>
          {repositories.map(repo => (
            <li key={repo.id}>
              <a href={repo.url}>{repo.name}</a>
              <button>{repo.stargazers.totalCount} Star</button>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default App;