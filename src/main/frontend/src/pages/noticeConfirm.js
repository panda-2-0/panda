import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "../Css_dir/notice.module.css";
import profile from "../imgs/logo512_512.png";

function NoticeConfirm() {
    const movePage = useNavigate();
    const location = useLocation();
    const writingInfo = { ...location.state };
    const listdata = new FormData();
    listdata.append('wid', writingInfo.word);
    const writingdata = new FormData();
    writingdata.append('wid', writingInfo.word);
    const [data, setData] = useState({}); // 해당 게시글에 찜등록한 사람 수


    const goNoticePage = () => {
        movePage('/pages/noticePage');
    };

    const goModify = () => {
        movePage('/pages/noticeModify');
    };

    const registerFavorite = () => {
        const favorite_regit = new FormData();
        favorite_regit.append('wid', writingInfo.word);
        axios
            .post('/api/favorite_register', favorite_regit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                if (response.data === 1) alert('이미 등록한 제품입니다!');
                else if (response.data === 2) alert('자신의 제품을 찜 등록 할 수 없습니다!');
                else {
                    alert('정상 등록 되었습니다.');
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const goChat = () => {
        axios
            .post('/joinChat', { writing_Id: writingInfo.word }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                if (response.data !== '') {
                    console.log('채팅 페이지 이동');
                    window.open('/pages/Chat', '_blank');
                } else {
                    alert('당신의 글입니다');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        axios
            .post('/api/favorite_writing', listdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setData(response.data);


            })
            .catch((error) => console.log(error));
    }, []);

    const [loginUser , setLoginUser] = useState(null)

    useEffect(() => {
        axios.get('/api/UserInfo')
            .then(response => {
                setLoginUser(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    } , [])

    const deletePost = (postId) => {
        axios
            .delete(`/api/posts/${postId}`)
            .then((response) => {
                alert('게시글 삭제가 완료되었습니다!!');
                movePage('/pages/noticePage');
            })
            .catch((error) => {
                alert('게시글이 존재하지 않거나 오류가 발생하여 삭제 할 수 없습니다');
            });
    };

    const handleDelete = () => {
        deletePost(writingInfo.word);
    };

    return (
        <div>
            <div className={styles.board_wrap}>
                <div className={styles.board_title}>
                    <strong>게시글 확인</strong>
                    <p>판매자가 등록한 물품정보를 확인 할 수 있습니다</p>
                </div>
                <div className={styles.board_view_wrap}>
                    <div className={styles.board_view}>
                        <div className={styles.title}>
                            <div>
                                {data.writing_name}&nbsp;&nbsp;
                                <span className={styles.favorite_count}>찜: {data.favorite_count}회</span>
                            </div>
                            {loginUser && data.user_name !== loginUser.nickname && (
                                <button className={styles.favorite_btn} onClick={registerFavorite}>
                                    찜등록
                                </button>
                            )}
                        </div>
                        <div className={styles.info}>
                            <dl>
                                <dt>번호</dt>
                                <dd>{writingInfo.word}</dd>
                            </dl>
                            <dl>
                                <dt>글쓴이</dt>
                                <dd>{data.user_name}</dd>
                            </dl>
                            <dl>
                                <dt>가격</dt>
                                <dd>{data.price}</dd>
                            </dl>

                        </div>
                        <img alt="불러오는중" src={data.writingImg!=null ? `${atob(data.writingImg)}`: profile} style={{width:'70%'}} />
                        <div
                            className={styles.cont} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{data.content}

                        </div>
                        <div className={styles.bt_wrap}>
                            <a onClick={goNoticePage} className={styles.on}>
                                목록
                            </a>
                            {loginUser && data.user_name === loginUser.nickname && (
                                <a onClick={goModify}>수정</a>
                            )}
                            {loginUser && data.user_name === loginUser.nickname && (
                                <a onClick={handleDelete}>삭제</a>
                            )}
                            {!(loginUser && data.user_name === loginUser.nickname) && (
                                <a onClick={goChat} className={styles.on}>
                                    채팅
                                </a>
                            )}


                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default NoticeConfirm;