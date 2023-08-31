export const PRIVACY_POLICY_URL =
  'https://l3xqwdhkqn9goeozduz9ow.on.drv.tw/www.DevHubPrivacy&Policy.html';

///testing

const walkthrough_01_01_images = [
  require('../assets/images/walkthrough/walkthrough_01_01.png'),
  require('../assets/images/walkthrough/walkthrough_01_02.png'),
  require('../assets/images/walkthrough/walkthrough_01_03.png'),
  require('../assets/images/walkthrough/walkthrough_01_04.png'),
];

const walkthrough_01_02_images = [
  require('../assets/images/walkthrough/walkthrough_01_05.png'),
  require('../assets/images/walkthrough/walkthrough_01_06.png'),
  require('../assets/images/walkthrough/walkthrough_01_07.png'),
  require('../assets/images/walkthrough/walkthrough_01_01.png'),
];

const walkthrough = [
  {
    id: 0,
    title: 'Authentic Wallpaper Collection',
    sub_title:
      'Discover a diverse range of genuine wallpapers for a vibrant life.',
  },
  {
    id: 1,
    title: 'Effortless Wallpaper Selection',
    sub_title: 'Explore and order wallpapers from various brands all at once.',
  },
  {
    id: 2,
    title: 'Instant Wallpaper Search',
    sub_title:
      'Quickly locate wallpapers using our scanning camera feature, and pay with a simple scan.',
  },
  {
    id: 3,
    title: 'Express Wallpaper Delivery',
    sub_title:
      'Enjoy rapid delivery, even on weekends, with next-day delivery options.',
  },
];

const home_tabs = [
  {
    id: 0,
    label: 'Product',
  },
  {
    id: 1,
    label: 'My Chart',
  },
  {
    id: 2,
    label: 'Service',
  },
];

const dashboard_screens = {
  home: 'Home',
  category: 'Category',
  promo: 'Promo',
  profile: 'Profile',
};

const bottom_tabs = [
  {
    id: 0,
    label: dashboard_screens.home,
  },
  {
    id: 1,
    label: dashboard_screens.category,
  },
  {
    id: 2,
    label: dashboard_screens.promo,
  },
  {
    id: 3,
    label: dashboard_screens.profile,
  },
];

const scan_product_option = {
  qr: 'QR',
  camera: 'CAMERA',
};

export default {
  walkthrough_01_01_images,
  walkthrough_01_02_images,
  walkthrough,
  home_tabs,
  dashboard_screens,
  bottom_tabs,
  scan_product_option,
};
