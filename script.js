window.addEventListener('load', function (){
    new Glider(document.querySelector('.carousel--list'), {
        slidesToScroll: 1,
        slidesToShow: 1.5,
        draggable: true,
        dots: '.carousel--indicators',
        arrows: {
          prev: '.carousel__before',
          next: '.carousel__after'
        },
        responsive: [
            {
              // screens greater than >= 775px
              breakpoint: 425,
              settings: {
                // Set to `auto` and provide item width to adjust to viewport
                slidesToShow: '3.5',
                slidesToScroll: '2',
                itemWidth: 150,
                duration: 0.25
              }
            },{
              // screens greater than >= 1024px
              breakpoint: 1024,
              settings: {
                slidesToShow: 4.5,
                slidesToScroll: 3,
                itemWidth: 150,
                duration: 0.25
              }
            }
        ]
    });
});