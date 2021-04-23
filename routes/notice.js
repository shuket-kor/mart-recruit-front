const express = require('express');
const app = express();
const router = express.Router();
const { noticeList, noticeDelete, addNoticeCreate, noticeUpdate } = require('../app/controllers/notice.js')



// 공지사항 리스트 페이지
router.get('/list', noticeList);

// 공지사항 삭제 
//router.get('/remove/:SEQ', noticeDelete);

// 공지사항 글 작성 페이지  
//router.get('/create', addNoticeCreate);  
  
// 공지사항 수정 페이지
//router.patch('/update/:SEQ', noticeUpdate);








/*router.get('/list', async (req, res) => {
    try {
        const {response} = await got.get('http://localhost:8081', {
            responseType:'json'
        });
        if (response.result == 'success'){
            res.render('write', {
                write: response.data
            });
        } else {
            res.render('error');
        }
    }catch (err) {
        console.log('에러가 발생하였습니다./list');
    }
})*/



module.exports = router;