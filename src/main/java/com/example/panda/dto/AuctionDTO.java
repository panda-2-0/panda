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
    private int wid;
    private LocalDateTime auction_date;
    private int highest_value;
    private int buy_now;
    private UserDTO userDTO;
    private int lowest_value;


    public static AuctionDTO toAuctionDTO(AuctionEntity auctionEntity) {
        AuctionDTO auctionDTO = new AuctionDTO();
        auctionDTO.setWid(auctionEntity.getWid());
        auctionDTO.setAuction_date(auctionEntity.getAuction_date());
        auctionDTO.setHighest_value(auctionEntity.getHighest_value());
        auctionDTO.setBuy_now(auctionEntity.getBuy_now());
        auctionDTO.setUserDTO(UserDTO.toUserDTO(auctionEntity.getUserEntity()));
        auctionDTO.setLowest_value(auctionEntity.getLowest_value());
        return auctionDTO;
    }


}