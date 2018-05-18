document.addEventListener('DOMContentLoaded', function (event) {
  var glide = new Glide('#intro', {
  type: 'carousel',
  perView: 2,
  autoplay: 3500,
  hoverpause: true,
  breakpoints: {
    1500: {
      perView: 2
    },
    700: {
      perView: 1
    }
  } 
})
glide.mount()
})
