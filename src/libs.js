import { loadScript } from 'vue-plugin-load-script'

const libs = [
  '/src/assets/js/jquery-2.2.4.min.js',
  '/src/assets/js/bootstrap.min.js',
  '/src/assets/js/owl-carousel/owl.carousel.js',
  '/src/assets/js/slick-slider/slick.js',
  '/src/assets/js/themejs/libs.js',
  '/src/assets/js/unveil/jquery.unveil.js',
  '/src/assets/js/countdown/jquery.countdown.min.js',
  '/src/assets/js/dcjqaccordion/jquery.dcjqaccordion.2.8.min.js',
  '/src/assets/js/datetimepicker/moment.js',
  '/src/assets/js/datetimepicker/bootstrap-datetimepicker.min.js',
  '/src/assets/js/jquery-ui/jquery-ui.min.js',
  '/src/assets/js/modernizr/modernizr-2.6.2.min.js',
  '/src/assets/js/minicolors/jquery.miniColors.min.js',
  '/src/assets/js/lightslider/lightslider.js',
  '/src/assets/js/themejs/application.js',
  '/src/assets/js/themejs/homepage.js',
  '/src/assets/js/themejs/toppanel.js',
  '/src/assets/js/themejs/so_megamenu.js',
  '/src/assets/js/themejs/addtocart.js',
]

libs.map((lib) => {
  loadScript(lib)
    .then(() => {
      console.log('Loaded ---> ' + lib)
    })
    .catch(() => {
      console.log('No ----> ' + lib)
    })
})
