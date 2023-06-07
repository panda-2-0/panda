package com.example.panda.service;

import com.example.panda.dto.AuctionDTO;
import com.example.panda.dto.WritingDTO;
import com.example.panda.dto.WritingRegisterDTO;
import com.example.panda.dto.WritingResponseDTO;
import com.example.panda.entity.AuctionEntity;
import com.example.panda.entity.UserEntity;
import com.example.panda.entity.WritingEntity;
import com.example.panda.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.crossstore.ChangeSetPersister;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import static com.example.panda.entity.QUserEntity.userEntity;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class WritingService {
    //    @Autowired
    private final WritingRepository writingRepository;
    private final WritingDSLRepository writingDSLRepository;
    private final UserRepository userRepository;
    private final AuctionRepository auctionRepository;
    private final AuctionDSLRepository auctionDSLRepository;

    public void write(WritingEntity we)
    {
        we.setFavorite_count(0);
        writingRepository.save(we);
    }

    public List<WritingDTO> findAll(){
        List<WritingEntity> writingEntityList = writingRepository.findAll();
        List<WritingDTO> writingDTOList = new ArrayList<>();

        for(WritingEntity writingEntity : writingEntityList) {
            writingDTOList.add(WritingDTO.toWritingDTO(writingEntity));
        }

        return writingDTOList;
    }
    public List<WritingDTO> findSearch(String word){
        List<WritingEntity> writingEntityList = writingDSLRepository.findSearch(word);
        List<WritingDTO> writingDTOList = new ArrayList<>();
        for(WritingEntity writingEntity : writingEntityList) {
            writingDTOList.add(WritingDTO.toWritingDTO(writingEntity));
        }
        return writingDTOList;
    }
    public WritingDTO findById(int wid){
        Optional<WritingEntity> writingEntity = writingRepository.findById(wid);
        WritingDTO writingDTO=WritingDTO.toWritingDTO(writingEntity.get());
        return writingDTO;
    }

    public AuctionDTO findByauctionId(int wid){
        Optional<AuctionEntity> auctionEntity = auctionRepository.findById(wid);
        AuctionDTO auctionDTO=AuctionDTO.toAuctionDTO(auctionEntity.get());
        return auctionDTO;
    }

    public List<WritingResponseDTO> findResponseById(List<Integer> widList){
        List<WritingEntity> writingEntityList = writingDSLRepository.findByIdList(widList);
        List<WritingResponseDTO> writingResponseDTOList = new LinkedList<WritingResponseDTO>();
        for(WritingEntity we : writingEntityList){
            writingResponseDTOList.add(WritingResponseDTO.toWritingResponseDTO(we, false));
        }
        return writingResponseDTOList;
    }

    public List<WritingResponseDTO> findPopular(){
        List<WritingEntity> writingEntityList = writingDSLRepository.findPopularWriting();
        List<WritingResponseDTO> writingResponseDTOList = new LinkedList<>();
        for(WritingEntity we : writingEntityList){
            writingResponseDTOList.add(WritingResponseDTO.toWritingResponseDTO(we, false));
        }
        return writingResponseDTOList;
    }

    //게시글 삭제 로직 구현
    public void deletePost(Integer postId) throws ChangeSetPersister.NotFoundException {
        if(!writingRepository.existsById(postId))
        {
            throw new ChangeSetPersister.NotFoundException();
        }

        writingRepository.deleteById(postId);
    }

    public void saveWriting(String email, WritingRegisterDTO writingRegisterDTO){  //게시글과 옥션을 저장
        WritingDTO writingDTO=new WritingDTO();
        AuctionDTO auctionDTO=new AuctionDTO();

        writingDTO.setWriting_name(writingRegisterDTO.getWriting_name());
        writingDTO.setCategory(writingRegisterDTO.getCategory());
        if(writingRegisterDTO.getWritingImg()!=null){
            writingDTO.setWritingImg(writingRegisterDTO.getWritingImg());
        }
        if(writingRegisterDTO.getWritingImg1()!=null){
            writingDTO.setWritingImg1(writingRegisterDTO.getWritingImg1());
        }
        if(writingRegisterDTO.getWritingImg2()!=null){
            writingDTO.setWritingImg2(writingRegisterDTO.getWritingImg2());
        }
        if(writingRegisterDTO.getWritingImg3()!=null){
            writingDTO.setWritingImg3(writingRegisterDTO.getWritingImg3());
        }
        writingDTO.setDetail_category(writingRegisterDTO.getDetail_category());
        writingDTO.setCount(writingRegisterDTO.getCount());
        writingDTO.setPrice(writingRegisterDTO.getPrice());
        writingDTO.setContent(writingRegisterDTO.getContent());

        WritingEntity writingEntity=WritingEntity.toWritingEntity(writingDTO);
        Optional<UserEntity> userEntity=userRepository.findByEmail(email);

        writingEntity.setUserEntity(userEntity.get());
        writingRepository.save(writingEntity);

        //System.out.println(writingEntity.getWid());

        if(writingRegisterDTO.getAuction_flag()==1){
            auctionDTO.setWid(writingEntity.getWid());
            auctionDTO.setHighest_value(writingRegisterDTO.getHighest_value());
            auctionDTO.setBuy_now(writingRegisterDTO.getBuy_now());
            auctionDTO.setLowest_value(writingRegisterDTO.getLowest_value());

            AuctionEntity auctionEntity=AuctionEntity.toAuctionEntity(auctionDTO,writingRegisterDTO.getAuction_date());
            auctionEntity.setUserEntity(userEntity.get());
            auctionRepository.save(auctionEntity);
       }
    }
    public AuctionEntity isAuction(int wid){
        log.info("isAuctioning");
        Optional<AuctionEntity> optionalAuctionEntity = auctionDSLRepository.existsByWid(wid);
        return optionalAuctionEntity.orElse(null);
    }

    public List<WritingResponseDTO> findCheap() {
        List<WritingEntity> writingEntityList = writingDSLRepository.findCheapWriting();
        List<WritingResponseDTO> writingResponseDTOList = new LinkedList<>();
        for(WritingEntity we : writingEntityList){
            writingResponseDTOList.add(WritingResponseDTO.toWritingResponseDTO(we, false));
        }
        return writingResponseDTOList;
    }

    public List<WritingResponseDTO> findExpensive() {
        List<WritingEntity> writingEntityList = writingDSLRepository.findExpensiveWriting();
        List<WritingResponseDTO> writingResponseDTOList = new LinkedList<>();
        for(WritingEntity we : writingEntityList){
            writingResponseDTOList.add(WritingResponseDTO.toWritingResponseDTO(we, false));
        }
        return writingResponseDTOList;
    }

    public List<WritingDTO> findByUserId(String userEmail) {
        List<WritingEntity> writings = writingDSLRepository.findByUserEmail(userEmail);
        List<WritingDTO> writingDTOS = new ArrayList<>();
        for(WritingEntity writing : writings)
        {
            WritingDTO writingDTO = convertToDTO(writing);
            writingDTOS.add(writingDTO);
        }
        return writingDTOS;
    }

    private WritingDTO convertToDTO(WritingEntity writing) {
        WritingDTO writingDTO = new WritingDTO();
        writingDTO.setWriting_Id(writing.getWid());
        writingDTO.setWriting_name(writing.getWriting_name());
        writingDTO.setFavorite_count(writing.getFavorite_count());
        writingDTO.setRegit_date(writing.getRegit_date());
        writingDTO.setUser_name(writing.getUserEntity().getNickname());

        return writingDTO;
    }
    //경매 등록
//    public void saveAuction(AuctionDTO auctionDTO){
//        AuctionEntity auctionEntity = AuctionEntity.toAuctionEntity(auctionDTO);
//
//        auctionRepository.save(auctionEntity);
//    }

}