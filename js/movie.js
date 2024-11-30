movieList();

async function movieList(){
    let date = new Date();
    let getDate = (date.getFullYear()-1).toString().concat(date.getMonth()+1, date.getDate()-1);
    kobis(getDate)
        .then((result) => {

            let BoxOfficeList = result.boxOfficeResult.dailyBoxOfficeList;
            let output = ``;
            let posters = [];
            BoxOfficeList.forEach((element) => {
                posters.push(getPoster(element.movieNm));
                
           });

           Promise.all(posters)
                .then((poster)=>{            
                    BoxOfficeList.forEach((element,index) => {
                        output += `
                            <div class="swiper-slide">
                                <div class="thumb">
                                    <img src="${poster[index]}" alt="">
                                    <div class="num">${element.rank}</div>
                                    <div class="dim">
                                        <a href="">상세보기</a>
                                        <a href="">예매하기</a>
                                    </div>
                                </div>
                                <div>
                                    <strong>${element.movieNm}</strong>
                                    <div>
                                        <span>누적관객수 ${element.audiCnt}</span>
                                    </div>
                                </div>
                            </div>
                        `;
                        document.querySelector('.slide_area.movie .swiper-wrapper').innerHTML = output;
                    });
                })
                .catch((error) => console.log('error'));
        })
        .catch((error) => console.log('error'));
    
}

async function getPoster(movieNm){
    return await kmdb(movieNm)
}




// kofic api
async function kobis(targetDt){
    let key = `e6cc18e742adf7189da38b34bb5ad8b9`;
    let url = `	http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}&targetDt=${targetDt}`;
    let kofic = await fetch(url); 
    let jsonData = await kofic.json();
    return jsonData;
}

// kmdb api
async function kmdb(title){
    let key = `MO075W76WVQ09UK49059`;
    let url =  `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?`;
        url += `collection=kmdb_new2&detail=Y&title=${title}&ServiceKey=${key}`;
    let kmdb = await fetch(url);
    let jsonData = await kmdb.json();
    let posters = jsonData.Data[0].Result[0].posters.split('|');
    return posters[0];
}