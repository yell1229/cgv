initForm();

function initForm(){
    let output = `
        <h1>박스오피스</h1>
        <div>
            <select name="" id="type">
                <option value="default">선택</option>
                <option value="Daily">일별</option>
                <option value="Weekly">주말</option>
            </select>
            <input type="text" placeholder="예)20241110" class="date">
            <button type="button">Search</button>
        </div>
        <div class="result"></div>
    `;
    document.querySelector('body').innerHTML = output;

    // default table
    // let date = new Date(); 
    // let month = date.getMonth();
    // let day = date.getDate();
    // if(month === '13') month = 12;
    // else if(day === 0) {month = month -1; day = 29;}
    
    movieList('Daily',20241111);

    let type = document.querySelector('#type');
    let inputDate = document.querySelector('input.date');
    let btn = document.querySelector('button');
    btn.addEventListener('click', () => {  
        if(type.value === 'default'){
            alert('일별, 주말을 선택해주세요.');
            type.focus();
        }else if(inputDate.value === ''){
            alert('날짜를 입력해주세요.');
            date.focus();
        }else{
            movieList(type.value,inputDate.value);
        }
    });
    
}


// 결과
async function movieList(type,date){
    kobis(type, date)
        .then((result) => {
            let list = result.boxOfficeResult.dailyBoxOfficeList;
            let output = ``;
            let posters = [];
            list.forEach((el) => {
                posters.push(posterList(el.movieNm));
            });
            
            Promise.all(posters)
                .then((poster) =>{
                    output = `
                        <table>
                            <thead>
                            <tr>
                                <th>순위</th>
                                <th>포스터</th>
                                <th>제목</th>
                                <th>개봉일</th>
                                <th>일별 관객수</th>
                                <th>누적 관객수</th>
                            </tr>
                            </thead>
                            <tbody>
                        `;
                        list.forEach((el,index) => {
                            output +=`
                                <tr>
                                    <td>${el.rank}</td>
                                    <td><img src="${poster[index]}"></td>
                                    <td>${el.movieNm}</td>
                                    <td>${el.openDt}</td>
                                    <td>${el.audiCnt}</td>
                                    <td>${el.audiAcc}</td>
                                </tr>
                            `;
                        });
                        
                            output +=`
                            </tbody>
                        </table>
                        `;
                        document.querySelector('.result').innerHTML = output;
                })
                .catch((error) => console.log('error'));
        })
        .catch((error) => console.log('error'));
}

//poster
async function posterList(title){
    return await kmdb(title);       
}







// kobis api
async function kobis(type,searchDt){
    const key = `e6cc18e742adf7189da38b34bb5ad8b9`;
    const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/search${type}BoxOfficeList.json?key=${key}&targetDt=${searchDt}`;
    
    let data = await fetch(url);
    let jsonData = await data.json();
    return jsonData
}

// kmdb api
async function kmdb(title){
    let key = `MO075W76WVQ09UK49059`;
    let url = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2`;
        url +=`&detail=Y&title=${title}&ServiceKey=${key}`;

    let kmdb = await fetch(url);
    let jsonData = await kmdb.json();

    let posters = jsonData.Data[0].Result[0].posters.split('|');
    
    return posters[0];
}