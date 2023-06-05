///// wikipedia API/////
let input = '';
const searchUrl = 'https://ja.wikipedia.org/w/api.php?action=query&format=json&list=backlinks&bllimit=20&bltitle='

function setup() {
    noCanvas();
    input = select('#keyword');
    input.changed(search);
}

function search() {
    let url = searchUrl + input.value();
    loadJSON(url, show, 'jsonp');
}


function show(data) {
    let links = data.query.backlinks;
    let resultsDiv = select('#results'); // 結果を表示する要素を選択

    links.forEach(link => {
        let div = createDiv();
        div.class('result'); // 結果要素にCSSクラスを追加

        let a = createA(
            'https://ja.wikipedia.org/wiki/' + encodeURIComponent(link.title), // ウィキペディアのリンク
            link.title, // リンクテキスト
            '_blank' // リンクを新しいタブで開くようにする
        );
        a.parent(div); // リンクを結果要素の子要素として追加

        let space = createSpan(' '); // スペースを作成
        space.parent(div); // スペースを結果要素の子要素として追加

        div.parent(resultsDiv); // 結果要素を結果表示要素の子要素として追加
    });
}

