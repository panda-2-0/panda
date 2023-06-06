package com.example.panda.dto;

import com.example.panda.entity.AuctionEntity;
import com.example.panda.entity.UserEntity;
import com.example.panda.entity.WritingEntity;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuctionDTO {
    private int writing_Id;
    private LocalDateTime auction_date;
    private int highest_value;
    private int buy_now;
    private UserDTO userDTO;
    private String user_name;


    public static AuctionDTO toAuctionDTO(AuctionEntity auctionEntity) {
        AuctionDTO auctionDTO = new AuctionDTO();
        auctionDTO.setWriting_Id(auctionEntity.getWriting_Id());
        auctionDTO.setAuction_date(auctionEntity.getAuction_date());
        auctionDTO.setHighest_value(auctionEntity.getHighest_value());
        auctionDTO.setBuy_now(auctionEntity.getBuy_now());
        auctionDTO.setUserDTO(UserDTO.toUserDTO(auctionEntity.getUserEntity()));
        auctionDTO.setUser_name(auctionDTO.getUserDTO().getNickname());
        return auctionDTO;
    }


}
