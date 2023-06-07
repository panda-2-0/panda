package com.example.panda.controller;

//import com.example.panda.dto.AuctionDTO;
import com.example.panda.dto.AuctionDTO;
import com.example.panda.dto.UserDTO;
import com.example.panda.dto.WritingDTO;

import com.example.panda.dto.WritingRegisterDTO;
import com.example.panda.entity.AuctionEntity;
import com.example.panda.entity.UserEntity;
import com.example.panda.entity.WritingEntity;

import com.example.panda.service.UserService;
import com.example.panda.service.WritingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.crossstore.ChangeSetPersister;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class WritingController {

    //    @Autowired
    private final WritingService writingService;

    private final UserService userService;

    @PostMapping("/api/noticeRegister")
    public void boardwritepro(@RequestBody WritingRegisterDTO writingRegisterDTO){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();

        writingService.saveWriting(userDetails.getUsername(),writingRegisterDTO);
    }

    //게시글 내용 목록 조회를 위한 부분
    @RequestMapping("/api/noticePage")
    public List<WritingDTO> boardList()
    {
        List<WritingDTO> writingDTOList = writingService.findAll();
        return writingDTOList;
    }


    //게시글 아이디 하나로 상세 페이지 조회 하는 로직
    @GetMapping ("/notice/noticeConfirm/{postId}")
    public WritingDTO getPost(@PathVariable int postId)
    {
        WritingDTO writingDTO = writingService.findById(postId);
        return writingDTO;
    }
    @GetMapping("/notice/isAuction")
    public AuctionEntity isAuction(@RequestParam("wid")int wid){
        log.info("start isAuction");
        return writingService.isAuction(wid);
    }

    // 로그인한 사용자 entity반환
    @GetMapping("/api/UserInfo")
    public UserEntity getUserInfo()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        UserEntity userEntity =userService.findbyEmail(userDetails.getUsername());
        return userEntity;
    }

    //게시글 삭제 기능구현
    @DeleteMapping("/api/posts/{postId}")
    public void deletePost(@PathVariable Integer postId) throws ChangeSetPersister.NotFoundException {
        writingService.deletePost(postId);

    }

    @GetMapping("/api/myPosts")
    public List<WritingDTO> getMyPosts()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        UserEntity userEntity =userService.findbyEmail(userDetails.getUsername());

        String user_email = userEntity.getEmail();
        List<WritingDTO> myPosts = writingService.findByUserId(user_email);
        return myPosts;
    }
}