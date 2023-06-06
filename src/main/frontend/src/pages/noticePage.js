import React , {useState , useEffect} from 'react';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import styles from "../Css_dir/notice.module.css";


function NoticePage(){
    const location=useLocation();
    const writingInfo = { ...location.state };
    const listdata=new FormData();
    // const writingdata = new FormData();
    const [data, setData] = useState([])  //해당 게시글에 찜등록한 사람 수
    listdata.append('wid', writingInfo.word);  //이전 페이지에서 받아온 글id
    const writingdata = new FormData();
    writingdata.append('wid',writingInfo.word);
    const navigate = useNavigate();

     const movePage1= (event)=>{
        const getId=event.currentTarget.id
        navigate('/pages/noticeConfirm?search='+getId, {state:{
                word:getId
            }});
    }

    function goregist()
    {
        navigate('/pages/noticeRegist');
    }

    function goconfirm()
    {
        navigate('/pages/noticeConfirm');
    }

    const [posts , setPosts] = useState([]);
    const [loginUser , setLoiginUser] = useState(null)

    useEffect(() => {
       axios.get('/api/noticePage')
            .then(response => {
            setPosts(response.data);
           })
           .catch(error => {
                console.log(error);
            });

    },[]);

    useEffect(() => {
        axios.get('/api/UserInfo')
            .then(response => {
                setLoiginUser(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    } , [])

    useEffect(() => {

        axios.post('/api/favorite_writing',listdata,{  //해당 게시글을 찜등록한 사람의 수를 카운팅해서 가져옴
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
            <div className={styles.wrap}>
                <div className={styles.board_wrap}>
                    <div className={styles.board_title}>
                        <strong>게시글 확인 및 등록</strong>
                        {loginUser && (
                            <p>{loginUser.nickname}님 반갑습니다. 하단 등록 버튼을 눌러 추가 게시글 등록을 할 수 있습니다.</p>
                            
                        )}
                    </div>
                    <div className={styles.border_list_wrap}>
                        <div className={styles.board_list}>
                            <div className={styles.top}>
                                <div className={styles.num}>번호</div>
                                <div className={styles.title}>제목</div>
                                <div className={styles.writer}>글쓴이</div>
                                <div className={styles.date}>작성일</div>
                                <div className={styles.count}>찜</div>
                            </div>
                            {posts.map(post => (
                                loginUser && post.user_name === loginUser.nickname && (
                                    <div key={post.writing_Id}>
                                        <div className={styles.num}>{post.writing_Id}</div>
                                        <div className={styles.title} onClick={movePage1} id={post.writing_Id}>{post.writing_name}</div>
                                        <div className={styles.writer}>{post.user_name}</div>
                                        <div className={styles.date}>2020.20.20</div>
                                        <div className={styles.count}>{data.favorite_count}</div>
                                    </div>
                                    )
                                 ))}

                        </div>

                        <div className={styles.bt_wrap}>
                            <a onClick={goregist} className={styles.on}>등록</a>
                        </div>
                    </div>
                </div>
            </div>



                );

            }

export default NoticePage;
