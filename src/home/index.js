import './index.scss';
import $ from 'jquery';

function Home(router) {
  this.router = router;
  this.templateIndex = require('./index.html');
}

Home.prototype = {
  index: function () {
    const self = this;
    $('body').attr('class', 'home layout');
    $('#layout-container').html(self.templateIndex({
      logoLargeURL: require('./logo-large.png').default,
      logoSmallURL: require('./logo-small.png').default
    }));
    self.router.updatePageLinks();
  }
};

export default Home;
