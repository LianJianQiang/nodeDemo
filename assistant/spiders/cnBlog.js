var superAgent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var qs = require('querystring');

function CnBlog(url) {
    this.cnodeUrl = url;
}

CnBlog.prototype.getData = function (res) {
    var cnodeUrl = this.cnodeUrl;
    superAgent.get(cnodeUrl)
        .end(function (err, sres) {
            if (err) {
                return new Error(err);
            }

            var $ = cheerio.load(sres.text);

            var lastPageUrl = $('.pagination li:last-child').find('a').attr('href');

            if (lastPageUrl != undefined) {
                var queryUrl = url.parse(lastPageUrl).query;
                var obj = qs.parse(queryUrl);
                var totalPages = obj.page;
            } else {
                var totalPages = $('.pagination').attr('current_page');
            }

            var items = [];
            $('#topic_list .topic_title').each(function (idx, ele) {
                var $ele = $(ele);
                var type = $ele.parent().parent().find('.topiclist-tab').text();
                items.push({
                    title: $ele.attr('title'),
                    href: $ele.attr('href'),
                    link: url.resolve(cnodeUrl, $ele.attr('href')),
                    type: type
                })

            });
            items.totalPages = totalPages;

            res.render('list', {
                title: '资源列表',
                items: items
            });
        });
};

module.exports = CnBlog;
