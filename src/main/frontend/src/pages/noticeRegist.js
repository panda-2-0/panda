import React, {useRef, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from "../Css_dir/notice.module.css";
import axios from 'axios';

const NoticeRegist = () => {
    const movePage = useNavigate();

    function alertmessage() {
        alert("정상 등록 되었습니다");
    }

    function nagative_alertmessage() {
        alert("등록 실패 !..");
    }

    function gonoticeAuction() {
        movePage('/pages/noticeAuction');
    }

    function gonoticepage() {
        movePage('/pages/noticePage');
    }

    const [writing_name, setTitle] = useState('');
    const [writing_photo, setWriting_photo] = useState(null); // Initialize with an empty string
    const [category, setCategory] = useState('');
    const [detail_category, setDetail_category] = useState('');
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);
    const [content, setContent] = useState('');
    const [windowSize, setWindowSize] = useState(0);
    const imageInput = useRef();

    //경매 정보
    const [auction_date, setAuctiondate] = useState('');
    const [highest_value, setHighestvalue] = useState('');
    const [buy_now, setBuynow] = useState(0);
    const [lowest_value, setLowestvalue] = useState(0);
    const [visiable, setVisiable] = useState(false);

    const handleFileChange = (event) => {    //이미지 업로드
        if (event.target.files[0] == null) {
            return;
        }

        const file = event.target.files[0];

        const fileExtension = file.name.split('.').pop().toLowerCase();
        const allowedExtensions = ['jpg', 'jpeg', 'png'];

        if (!allowedExtensions.includes(fileExtension)) {
            alert('지원하는 이미지 파일이 아닙니다.');
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setWriting_photo(imageUrl);
            };
            reader.readAsDataURL(file);
        }


        //
        // const reader = new FileReader();
        // reader.onload = function (e) {
        //     setWriting_photo(e.target.result);
        // };
        // if (event.target.files.length > 0) { // Check if an image is selected
        //     reader.readAsDataURL(event.target.files[0]);
        // }
    };
    const imageSelectClick = () => {
        imageInput.current.click();
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //
    //     const formData = new FormData();
    //     formData.append('writing_name', writing_name);
    //     formData.append('writing_photo', writing_photo);
    //     formData.append('category', category);
    //     formData.append('detail_category', detail_category);
    //     formData.append('count', count);
    //     formData.append('price', price);
    //     formData.append('content', content);
    //
    //     axios.post("/api/noticeRegister", formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })
    //         .then(response => {
    //             alertmessage();
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             nagative_alertmessage();
    //         });
    //
    //     setTitle('');
    //     setCount(0);
    //     setPrice(0);
    //     setCategory('');
    //     setDetail_category('');
    //     setContent('');
    //     setWriting_photo('');
    // };

    const registerInfo = () => {

        if (visiable) {
            // if(writing_name===''){
            //     alert('글 제목을 입력해주세요!');
            //     return;
            // }
            // if(category===''){
            //     alert('카테고리를 입력해주세요!');
            //     return;
            // }
            // if(detail_category===''){
            //     alert('세부 카테고리를 입력해주세요!');
            //     return;
            // }
            // if(count===0){
            //     alert('수량 입력해주세요!');
            //     return;
            // }
            // if(price===0){
            //     alert('금액을 0원으로 책정할 수 없습니다!');
            //     return;
            // }
            // if(content===''){
            //     alert('글 내용을 입력해주세요!');
            //     return;
            // }
            const writing = {
                writing_name: writing_name,
                category: category,
                detail_category: detail_category,
                count: count,
                price: price,
                content: content,
                writingImg: btoa(writing_photo)
            }
            const auction = {
                auction_date: auction_date,
                highest_value: highest_value,
                buy_now: buy_now,
            }

            axios.post('/api/noticeRegister', writing, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:8000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
                .then((response) => {
                    axios.post("/api/noticeAuctions", auction, {
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "http://localhost:8000",
                            "Access-Control-Allow-Credentials": "true",
                        },
                    })
                        .then((response) => {
                            alert("경매 등록 성공!!");
                        })
                        .catch(error => {
                            alert("경매 등록 실패!");
                        });
                })
                .catch(error => {
                    nagative_alertmessage();
                });
            gonoticepage();
        } else {
            // if(writing_name===''){
            //     alert('글 제목을 입력해주세요!');
            //     return;
            // }
            // if(category===''){
            //     alert('카테고리를 입력해주세요!');
            //     return;
            // }
            // if(detail_category===''){
            //     alert('세부 카테고리를 입력해주세요!');
            //     return;
            // }
            // if(count===0){
            //     alert('수량 입력해주세요!');
            //     return;
            // }
            // if(price===0){
            //     alert('금액을 0원으로 책정할 수 없습니다!');
            //     return;
            // }
            // if(content===''){
            //     alert('글 내용을 입력해주세요!');
            //     return;
            // }
            const writing = {
                writing_name: writing_name,
                category: category,
                detail_category: detail_category,
                count: count,
                price: price,
                content: content,
                writingImg: btoa(writing_photo)
            };

            axios.post('/api/noticeRegister', writing, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:8000",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
                .then((response) => {
                    alertmessage();
                })
                .catch(error => {
                    alert("경매 등록 실패!");
                });
            gonoticepage();
        }
    };
    useEffect(()=> {
        const windowResize = () => {
            const width = window.innerWidth;
            setWindowSize(width);
        }

        window.addEventListener(`resize`, windowResize);

        return () => {
            window.removeEventListener(`resize`, windowResize);
        }
    }, []);

    return (
        <div>
            <div className={styles.board_wrapr}>
                <div className={styles.board_title}>
                    <strong>게시글 작성</strong>
                    <p>판매자는 하단 등록 버튼을 눌러 판매 등록을 할 수 있습니다.</p>
                </div>
                <form onSubmit={registerInfo} encType={"multipart/form-data"}>
                    <div className={styles.board_write_wrap}>
                        <div className={styles.board_write}>
                            <div className={styles.title}>
                                <dl>
                                    <dt>{/*<label htmlFor={writing_name}></label>*/}제목</dt>
                                    <dd><input type="text" id="writing_name" value={writing_name}
                                               placeholder="제목 입력" onChange={(e) => setTitle(e.target.value)}/></dd>
                                </dl>
                            </div>
                            <div className={styles.info}>
                                {windowSize <= 550 ?
                                <table className={styles.info_table}>
                                    <tr>
                                        <td>
                                            <dl>
                                                <dt>사진 등록</dt>
                                                <dd id="photo_regist_dd">
                                                    <input type="file" ref={imageInput} name="writing_photo"
                                                           id="writing_photo"
                                                           onChange={handleFileChange}/>
                                                </dd>
                                            </dl>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <dl>
                                                <dt>대표 이미지 설정</dt>
                                                <dd>
                                                    <img alt="미리보기" src={writing_photo} style={{maxWidth: "100px"}}/>
                                                </dd>
                                            </dl>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <dl>
                                                <dt>카테고리</dt>
                                                <dd><select name="category" id="category"
                                                            onChange={(e) => setCategory(e.target.value)}>
                                                    <option value={"의류"}>의류</option>
                                                    <option value={"뷰티"}>뷰티</option>
                                                    <option value={"가구/인테리어"}>가구/인테리어</option>
                                                    <option value={"가전"}>가전</option>
                                                    <option value={"모바일/태블릿/PC"}>모바일/태블릿/PC</option>
                                                    <option value={"생활용품"}>생활용품</option>
                                                    <option value={"반려동물"}>반려동물</option>
                                                    <option value={"문구/도서"}>문구/도서</option>
                                                    <option value={"스포츠"}>스포츠</option>
                                                    <option value={"자동차용품"}>자동차용품</option>
                                                    <option value={"식품"}>식품</option>
                                                </select></dd>
                                            </dl>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <dl>
                                                <dt>세부 카테고리</dt>
                                                <dd><select name="detail_category" id="detail_category"
                                                            onChange={(e) => setDetail_category(e.target.value)}>
                                                    <optgroup label={"의류"}>
                                                        <option value={"모자"}>모자</option>
                                                        <option value={"상의"}>상의</option>
                                                        <option value={"하의"}>하의</option>
                                                        <option value={"신발"}>신발</option>
                                                        <option value={"기타"}>기타</option>
                                                    </optgroup>
                                                    <optgroup label={"뷰티"}>
                                                        <option value={"공용화장품"}>모자</option>
                                                        <option value={"남자 화장품"}>상의</option>
                                                        <option value={"여자 화장품"}>하의</option>
                                                        <option value={"기타"}>기타</option>
                                                    </optgroup>
                                                    <optgroup label={"가구/인테리어"}>
                                                        <option value={"침대"}>침대</option>
                                                        <option value={"소파"}>소파</option>
                                                        <option value={"책상"}>책상</option>
                                                        <option value={"기타"}>기타</option>
                                                    </optgroup>
                                                    <optgroup label={"가전"}>
                                                        <option value={"냉장고"}>냉장고</option>
                                                        <option value={"TV"}>TV</option>
                                                        <option value={"청소기"}>청소기</option>
                                                        <option value={"에어컨"}>에어컨</option>
                                                        <option value={"기타"}>기타</option>
                                                    </optgroup>
                                                    <optgroup label={"모바일/태블릿/PC"}>
                                                        <option value={"스마트폰"}>스마트폰</option>
                                                        <option value={"태블릿"}>태블릿</option>
                                                        <option value={"노트북"}>노트북</option>
                                                        <option value={"기타"}>기타</option>
                                                    </optgroup>
                                                    <optgroup label={"생활용품"}>
                                                        <option value={"생활필수품"}>생활필수품</option>
                                                        <option value={"욕실"}>욕실</option>
                                                        <option value={"주방"}>주방</option>
                                                        <option value={"기타"}>기타</option>
                                                    </optgroup>
                                                    <optgroup label={"반려동물"}>
                                                        <option value={"사료"}>사료</option>
                                                        <option value={"장난감"}>장난감</option>
                                                        <option value={"의류"}>의류</option>
                                                        <option value={"기타"}>기타</option>
                                                    </optgroup>
                                                    <optgroup label={"문구/도서"}>
                                                        <option value={"책"}>책</option>
                                                        <option value={"볼펜"}>볼펜</option>
                                                        <option value={"샤프/연필"}>샤프/연필</option>
                                                        <option value={"기타"}>기타</option>
                                                    </optgroup>
                                                    <optgroup label={"스포츠"}>
                                                        <option value={"축구"}>축구</option>
                                                        <option value={"야구"}>야구</option>
                                                        <option value={"농구"}>농구</option>
                                                        <option value={"기구"}>기구</option>
                                                    </optgroup>
                                                    <optgroup label={"자동차용품"}>
                                                        <option value={"방향제"}>방향제</option>
                                                        <option value={"장식 악세사리"}>장식 악세사리</option>
                                                        <option value={"블랙박스"}>블랙박스</option>
                                                        <option value={"기타"}>기타</option>
                                                    </optgroup>
                                                    <optgroup label={"식품"}>
                                                        <option value={"생수"}>생수</option>
                                                        <option value={"면"}>면</option>
                                                        <option value={"과자"}>과자</option>
                                                        <option value={"빵"}>빵</option>
                                                    </optgroup>
                                                </select></dd>
                                            </dl>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <dl>
                                                <dt>수량</dt>
                                                <dd><input type="text" id="count" value={count}
                                                           onChange={(e) => setCount(e.target.value)}/></dd>
                                            </dl>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <dl>
                                                <dt>가격</dt>
                                                <dd><input type="text" id="price" value={price}
                                                           onChange={(e) => setPrice(e.target.value)}/></dd>
                                            </dl>
                                        </td>
                                    </tr>
                                </table> :
                                    <table className={styles.info_table}>
                                        <tr>
                                            <td>
                                                <dl>
                                                    <dt>사진 등록</dt>
                                                    <dd id="photo_regist_dd">
                                                        <input type="file" ref={imageInput} name="writing_photo"
                                                               id="writing_photo"
                                                               onChange={handleFileChange}/>
                                                    </dd>
                                                </dl>
                                            </td>
                                            <td>
                                                <dl>
                                                    <dt>대표 이미지 설정</dt>
                                                    <dd>
                                                        <img alt="미리보기" src={writing_photo} style={{maxWidth: "100px"}}/>
                                                    </dd>
                                                </dl>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <dl>
                                                    <dt>카테고리</dt>
                                                    <dd><select name="category" id="category"
                                                                onChange={(e) => setCategory(e.target.value)}>
                                                        <option value={"의류"}>의류</option>
                                                        <option value={"뷰티"}>뷰티</option>
                                                        <option value={"가구/인테리어"}>가구/인테리어</option>
                                                        <option value={"가전"}>가전</option>
                                                        <option value={"모바일/태블릿/PC"}>모바일/태블릿/PC</option>
                                                        <option value={"생활용품"}>생활용품</option>
                                                        <option value={"반려동물"}>반려동물</option>
                                                        <option value={"문구/도서"}>문구/도서</option>
                                                        <option value={"스포츠"}>스포츠</option>
                                                        <option value={"자동차용품"}>자동차용품</option>
                                                        <option value={"식품"}>식품</option>
                                                    </select></dd>
                                                </dl>
                                            </td>
                                            <td>
                                                <dl>
                                                    <dt>세부 카테고리</dt>
                                                    <dd><select name="detail_category" id="detail_category"
                                                                onChange={(e) => setDetail_category(e.target.value)}>
                                                        <optgroup label={"의류"}>
                                                            <option value={"모자"}>모자</option>
                                                            <option value={"상의"}>상의</option>
                                                            <option value={"하의"}>하의</option>
                                                            <option value={"신발"}>신발</option>
                                                            <option value={"기타"}>기타</option>
                                                        </optgroup>
                                                        <optgroup label={"뷰티"}>
                                                            <option value={"공용화장품"}>모자</option>
                                                            <option value={"남자 화장품"}>상의</option>
                                                            <option value={"여자 화장품"}>하의</option>
                                                            <option value={"기타"}>기타</option>
                                                        </optgroup>
                                                        <optgroup label={"가구/인테리어"}>
                                                            <option value={"침대"}>침대</option>
                                                            <option value={"소파"}>소파</option>
                                                            <option value={"책상"}>책상</option>
                                                            <option value={"기타"}>기타</option>
                                                        </optgroup>
                                                        <optgroup label={"가전"}>
                                                            <option value={"냉장고"}>냉장고</option>
                                                            <option value={"TV"}>TV</option>
                                                            <option value={"청소기"}>청소기</option>
                                                            <option value={"에어컨"}>에어컨</option>
                                                            <option value={"기타"}>기타</option>
                                                        </optgroup>
                                                        <optgroup label={"모바일/태블릿/PC"}>
                                                            <option value={"스마트폰"}>스마트폰</option>
                                                            <option value={"태블릿"}>태블릿</option>
                                                            <option value={"노트북"}>노트북</option>
                                                            <option value={"기타"}>기타</option>
                                                        </optgroup>
                                                        <optgroup label={"생활용품"}>
                                                            <option value={"생활필수품"}>생활필수품</option>
                                                            <option value={"욕실"}>욕실</option>
                                                            <option value={"주방"}>주방</option>
                                                            <option value={"기타"}>기타</option>
                                                        </optgroup>
                                                        <optgroup label={"반려동물"}>
                                                            <option value={"사료"}>사료</option>
                                                            <option value={"장난감"}>장난감</option>
                                                            <option value={"의류"}>의류</option>
                                                            <option value={"기타"}>기타</option>
                                                        </optgroup>
                                                        <optgroup label={"문구/도서"}>
                                                            <option value={"책"}>책</option>
                                                            <option value={"볼펜"}>볼펜</option>
                                                            <option value={"샤프/연필"}>샤프/연필</option>
                                                            <option value={"기타"}>기타</option>
                                                        </optgroup>
                                                        <optgroup label={"스포츠"}>
                                                            <option value={"축구"}>축구</option>
                                                            <option value={"야구"}>야구</option>
                                                            <option value={"농구"}>농구</option>
                                                            <option value={"기구"}>기구</option>
                                                        </optgroup>
                                                        <optgroup label={"자동차용품"}>
                                                            <option value={"방향제"}>방향제</option>
                                                            <option value={"장식 악세사리"}>장식 악세사리</option>
                                                            <option value={"블랙박스"}>블랙박스</option>
                                                            <option value={"기타"}>기타</option>
                                                        </optgroup>
                                                        <optgroup label={"식품"}>
                                                            <option value={"생수"}>생수</option>
                                                            <option value={"면"}>면</option>
                                                            <option value={"과자"}>과자</option>
                                                            <option value={"빵"}>빵</option>
                                                        </optgroup>
                                                    </select></dd>
                                                </dl>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <dl>
                                                    <dt>수량</dt>
                                                    <dd><input type="text" id="count" value={count}
                                                               onChange={(e) => setCount(e.target.value)}/></dd>
                                                </dl>
                                            </td>
                                            <td>
                                                <dl>
                                                    <dt>가격</dt>
                                                    <dd><input type="text" id="price" value={price}
                                                               onChange={(e) => setPrice(e.target.value)}/></dd>
                                                </dl>
                                            </td>
                                        </tr>
                                    </table>}
                                <dl>


                                    <dd><a className={styles.on} onClick={() => {
                                        setVisiable(!visiable);
                                    }}> {visiable ? "닫기" : "경매등록▼"}</a></dd>

                                </dl>
                                <hr/>
                                {visiable && (
                                    <dl>
                                        <dt>경매 종료 시간 등록</dt>
                                        <dd><input type="text" id="auction_date" value={auction_date}
                                                   placeholder="(yyyy-MM-dd HH:mm:ss)"
                                                   onChange={(e) => setAuctiondate(e.target.value)}/></dd>
                                    </dl>)}

                                {visiable && (<dl>
                                    <dt>경매 시작 가격</dt>
                                    <dd><input type="text" id="lowest_value" value={lowest_value}
                                               placeholder="경매 시작가를 입력하시오"
                                               onChange={(e) => setLowestvalue(e.target.value)}/></dd>
                                </dl>)}
                                {visiable && (<dl>
                                        <dt>즉시 구매 가격</dt>
                                        <dd><input type="text" id="buy_now" value={buy_now}
                                                   placeholder="즉시 구매가를 입력하시오"
                                                   onChange={(e) => setBuynow(e.target.value)}/></dd>
                                    </dl>
                                )}

                            </div>
                            <div className={styles.cont}>
                                    <textarea id="content" value={content} placeholder="제품 상세 설명을 입력하시오"
                                              onChange={(e) => setContent(e.target.value)}></textarea>
                            </div>

                        </div>
                        <div className={styles.bt_wrap}>
                            <button type="submit" className={styles.regist_btn_r}>등록</button>
                            <a onClick={gonoticepage}>취소</a>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default NoticeRegist;