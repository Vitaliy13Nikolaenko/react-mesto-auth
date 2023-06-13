class Api {
  constructor({ serverUrl, headers }) {
    this.serverUrl = serverUrl;
    this.headers = headers;
  }

  _checkRequestResponse = (res) => {
    if (res.ok) {
      console.log(res);
      return Promise.resolve(res.json());
    }
    return Promise.reject("Ошибка");
  };

  getServerUserInfo() {
    return fetch(`${this.serverUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this._checkRequestResponse);
  }

  getServerInitialCards() {
    return fetch(`${this.serverUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this._checkRequestResponse);
  }

  setServerUserInfo(data) {
    return fetch(`${this.serverUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkRequestResponse);
  }

  addNewPlace(data) {
    return fetch(`${this.serverUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkRequestResponse);
  }

  setServerUserAvatar(data) {
    return fetch(`${this.serverUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkRequestResponse);
  }

  deleteCard(data) {
    return fetch(`${this.serverUrl}/cards/${data._id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkRequestResponse);
  }

  addPlaceLike(data) {
    return fetch(`${this.serverUrl}/cards/${data._id}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then(this._checkRequestResponse);
  }

  changePlaceLikeStatus(place, isLiked) {
    if (isLiked) {
      return this.removePlaceLike(place);
    }
    return this.addPlaceLike(place);
  }

  removePlaceLike(data) {
    return fetch(`${this.serverUrl}/cards/${data._id}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkRequestResponse);
  }
}

const api = new Api({
  serverUrl: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "bfe5e15f-b2ee-41bd-884f-9edc965ed305",
    "Content-Type": "application/json",
  },
});

export default api;


