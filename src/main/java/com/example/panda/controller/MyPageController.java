package com.example.panda.controller;

import com.example.panda.dto.*;
import com.example.panda.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class MyPageController {
    private final WritingService writingService;
    private final UserService userService;
    private final FavoriteService favoriteService;
    private final PurchaseHistoryService purchaseHistoryService;
    private final InquiryHistoryService inquiryHistoryService;
    @GetMapping("/api/writings")
    public List<WritingDTO> test(){
        List<WritingDTO> writingDTOList = writingService.findAll();
        return writingDTOList;
    }

    @PostMapping("/api/del_item")
    public void requestItem(@RequestParam("id")int id,
                            @RequestParam("writing_name")String writing_name,           //찜 삭제
                            @RequestParam("list")String list)  {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        String[] del_list=list.split(",");
        for(String st:del_list){
            favoriteService.deleteFavorite(userDetails.getUsername(),Integer.parseInt(st));
        }
    }

    @GetMapping("/api/list_totalPrice")   //프론트 내부에서 전체 리스트 계산 합 못 구함(정적 데이터만 계산 가능함)
    public int totalPrice(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        List<FavoriteDTO> favoriteDTOList = favoriteService.findByEmail(userDetails.getUsername());
        int sum=0;
        for(FavoriteDTO favoriteDTO : favoriteDTOList) sum+=favoriteDTO.getPrice();

        return sum;
    }

    @GetMapping("/api/favoriteList")   //찜 목록 조회(매개변수에 @RequestParam으로 세션값 받아와야함)
    public List<FavoriteDTO> favoriteList(){
        List<WritingDTO> writingDTOList=new ArrayList<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();

        List<FavoriteDTO> favoriteDTOList=favoriteService.findByEmail(userDetails.getUsername());

        //System.out.println(userDetails.getUsername());

        return favoriteDTOList;
    }
    @PostMapping("/api/favorite_writing")
    public WritingDTO favoriteWriting(@RequestParam("wid") int wid){  //해당 게시글 찜 등록한 사람 수 리턴
        List<WritingDTO> writingDTOList=new ArrayList<>();

//        List<FavoriteDTO> favoriteDTOList=favoriteService.findByWid(wid);   //나중에 글아이디 넣기
//        int count=favoriteDTOList.size();

        WritingDTO writingDTO=writingService.findById(wid); //찜 등록시 게시글에 찜 카운팅+1

        return writingDTO;
    }
    @PostMapping("/api/favorite_register")
    public int favoriteRegit(@RequestParam("wid") int wid){        //찜 등록
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        return favoriteService.save(userDetails.getUsername(),wid);
    }
    @PostMapping("/api/purchaseList")
    public List<PurchaseHistoryDTO> purchaseHistory(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        List<PurchaseHistoryDTO> list=purchaseHistoryService.findbyEmail(userDetails.getUsername());

        System.out.println(list);
        return list;
    }

    @PostMapping("/api/saveInquiry")
    public void saveInquiry(@RequestParam("wid") int wid){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();

        inquiryHistoryService.save(userDetails.getUsername(),wid);
    }
    @GetMapping("/api/inquiryList")
    public List<WritingDTO> myInquiryList(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        List<WritingDTO> list=inquiryHistoryService.findbyEmail(userDetails.getUsername());  //WritingDTO를 반환함
        return list;
    }

    @PostMapping("/api/sendAssociation")
    public void recAssociation(){
//        List<WritingDTO>writingDTOList=writingService.findAll();
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        // 요청 URL
//        String url = "http://127.0.0.1:5000/api/sendAssociation";
//
//        // 요청 헤더
//        HttpHeaders headers=new HttpHeaders();
//
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        // 요청 본문 데이터
//        String requestBody = "{\"name\": \"John\", \"age\": 30}";
//
//        // 요청 엔티티
//        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
//        // HTTP POST 요청
//        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
//        String responseBody = responseEntity.getBody();
//        System.out.println(responseBody);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();

        HashMap<String,StringBuilder> dataSet=new HashMap<>(); //사용자 별로 데이터 나누기 (key: userEmail, value: 사용자 당 구매한 이력들(StringBuilder))
        List<PurchaseHistoryDTO> purchaseHistoryAll=purchaseHistoryService.findAll(); //구매목록 일단 다 가져오기
        AssociationDTO associationDTO=new AssociationDTO();

        for(PurchaseHistoryDTO purchaseHistoryDTO:purchaseHistoryAll){
            if(dataSet.containsKey(purchaseHistoryDTO.getUserDTO().getEmail())){  //만약 해쉬맵에 이미 넣은 유저가 있을때 값을 넣어줌
                StringBuilder sb=dataSet.get(purchaseHistoryDTO.getUserDTO().getEmail());
                sb.append("/");
                sb.append(purchaseHistoryDTO.getWritingCompleteDTO().getWid());

                dataSet.put(purchaseHistoryDTO.getUserDTO().getEmail(),sb);
            }else{   //만약 해쉬맵에 이미 넣은 유저가 없다면 새로 만들어줌
                StringBuilder sb=new StringBuilder();
                sb.append(purchaseHistoryDTO.getWritingCompleteDTO().getWid());
                dataSet.put(purchaseHistoryDTO.getUserDTO().getEmail(),sb);
            }
        }
        dataSet.remove(userDetails.getUsername());  //자기꺼는 없애기
        System.out.println(dataSet);

        List<PurchaseHistoryDTO> purchaseHistoryDTOList=purchaseHistoryService.findbyEmail(userDetails.getUsername());  //사용자 본인의 구매이력 가져오기

        List<Integer> widList=new ArrayList<>();
        for(PurchaseHistoryDTO purchaseHistory: purchaseHistoryDTOList){   //wid 값만 넘겨주기
            widList.add(purchaseHistory.getWritingCompleteDTO().getWid());
        }



        associationDTO.setMyList(widList);
        for(String userName: dataSet.keySet()){
            associationDTO.getOtherList().put(userName,dataSet.get(userName).toString());  //StringBuilder -> String으로 변환해서 넘기기위해서
        }
        System.out.println(associationDTO.getMyList());
        System.out.println(associationDTO.getOtherList());

        List<WritingDTO>writingDTOList=writingService.findAll();

        RestTemplate restTemplate = new RestTemplate();

        // 요청 URL
        String url = "http://127.0.0.1:5000/api/sendAssociation";

        // 요청 헤더
        HttpHeaders headers=new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        // 요청 본문 데이터
        String requestBody = "{\"name\": \"John\", \"age\": 30}";

        // 요청 엔티티
        HttpEntity<AssociationDTO> requestEntity = new HttpEntity<>(associationDTO, headers);   //글 리스트를 보냄
        // HTTP POST 요청
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
        String responseBody = responseEntity.getBody();

        String[] splitted = responseBody.split("\\[|\\]");
        System.out.println(splitted[1]);
    }

}
