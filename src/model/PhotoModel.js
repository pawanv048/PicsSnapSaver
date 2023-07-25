export default class PhotoModel {
  constructor(id, urls, user, likes) {
    this.id = id;
    this.urls = urls;
    this.user = user;
    this.likes = likes;
  }
}

export class Urls {
  constructor(raw, full, regular, small, thumb) {
    this.raw = raw;
    this.full = full;
    this.regular = regular;
    this.small = small;
    this.thumb = thumb;
  }
}

export class User {
  constructor(id, username, name, profileImage) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.profileImage = profileImage;
  }
}