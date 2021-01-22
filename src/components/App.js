import React from "react";
import NewPost from "./NewPost";
import PostsList from "./PostsList";
import Login from "./Login";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ApolloClient from 'apollo-boost';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <ExchangeRates />
          <Router>
            <Route path="/" component={Home}></Route>
            <Route path="/posts" component={PostsList}></Route>
            <Route path="/login" component={Login}></Route>
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}

const client = new ApolloClient({
  uri: "https://api.news-lifestyle-staging.realestate.com.au/graphql"
});
// or you can use `import gql from 'graphql-tag';` instead




const EXCHANGE_RATES = gql`
{
  related_posts_by_id(id: 140496) {
    total
    posts {
      id
      date
      fields {
        galleries {
          title
        }
      }
    }
  }
  posts(id: 140496) {
    posts {
      title
      fields {
        galleries {
          title
        }
      }
    }
  }
}
`;

client
  .query({
    query: EXCHANGE_RATES
  })
  .then(result => console.log(result));

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // return data.rates.map(({ currency, rate }) => (
  //   <div key={currency}>
  //     <p>
  //       {currency}: {rate}
  //     </p>
  //   </div>
  return (
    <dir>hhhhhh</dir>
  )
}

export default App;
