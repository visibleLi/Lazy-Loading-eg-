$(function() {
    //  alert($);
    var num = 0;
    var $list = $('.container .product-list');

    loadAj($list, num);
    $('header .menu').click(function() {
        $('header .nav').toggleClass('hide');
    });

    function loadAj($ele, num) {
        $('.loading').removeClass('hide');
        $.ajax({
            url: 'data/data-' + num + '.json',
            success: function(data) {
                // console.log(data);
                var str = '';
                $.each(data, function(i, item) {
                    //console.log(item);
                    str += [
                        ' <li class="col-xs-6">',
                        ' <a href="#">',
                        ' <div class="img-content">',
                        '  <img src="images/' + item.imageUrl + '">',
                        '  </div>',
                        ' <div class="text-content pl5">',
                        '     <p>' + item.productText + '</p>',
                        ' </div>',
                        '  <div class="price-content pl5">',
                        '    <small>￥</small><strong>' + item.productPrice + '</strong>',
                        '  </div>',
                        ' <div class="comment-content pl5">',
                        ' <small>' + item.productEvaluate + '</small><span>条评论</span>',
                        ' </div>',
                        '</a>',
                        ' </li>'
                    ].join('');
                })
                $list.append(str);
                setTimeout(function() {
                    $('.loading').addClass('hide');
                }, 500)
            },
            error: function() {
                alert('没有网啊骚年！')
            }
        })
    }
    $('.back-top').click(function() {
        $(window).scrollTop(0);
    })
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            $('header').addClass('hide');
            $('.back-top').removeClass('hide');
            // loadAj($list, num+1);
        } else {
            $('header').removeClass('hide');
            $('.back-top').addClass('hide');
        }
        if ($(window).scrollTop() >= $(document).height() - $(window).height() && ++num < 9) {
            loadAj($list, num);
        } else if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            $('.loading').removeClass('hide');
            $('.loading').addClass('op');
            $('.loading').html('没有更多了！');
        } else if ($(window).scrollTop() <= $(document).height() - $(window).height()) {
            $('.loading').addClass('hide');

        }
    })
})
