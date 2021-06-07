import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dogPictures: '',
      loading: true,
    };
    this.fetchApi = this.fetchApi.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  shouldComponentUpdate() {
    const localDogImg = localStorage.getItem('dogImageUrl');

    const includesTerrier = localDogImg.includes('terrier');

    return !includesTerrier;
  }

  fetchApi() {
    this.setState({ loading: true },
      () => fetch('https://dog.ceo/api/breeds/image/random')
        .then((result) => result.json())
        .then((json) => this.setState((lastState) => ({
          dogPictures: [...lastState.dogPictures, json.message],
          loading: false,
        }))));
    const { dogPictures, loading } = this.state;
    localStorage.setItem('dogImageUrl', dogPictures[dogPictures.length - 1]);
    const localDogImg = localStorage.getItem('dogImageUrl');
    const breed = localDogImg.replace(/[\d\w/.:]*breeds\//g, '').replace(/\/.*/g, '');
    if (!loading) {
      alert(breed);
    }
  }

  render() {
    const { dogPictures, loading } = this.state;
    return (
      <div className="App">
        {loading ? (
          <h1>loading...</h1>
        ) : (
          <div>
            <img src={ dogPictures[dogPictures.length - 1] } alt="dogimage" />
            <button type="button" onClick={ this.fetchApi }>New Dog Picture</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
