package com.example.panda.entity;

import com.example.panda.dto.AuctionDTO;
import com.example.panda.dto.WritingDTO;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "Auction")
public class AuctionEntity {
    @Id
    private int wid;
    @Column
     private LocalDateTime auction_date;
    @Column
    private int highest_value;
    @Column
   private int buy_now;
    @ManyToOne
    @JoinColumn(name = "email")
    private UserEntity userEntity;
    @Column
    private int lowest_value;
    public static AuctionEntity toAuctionEntity(AuctionDTO auctionDTO,int auction_date){
        AuctionEntity auctionEntity=new AuctionEntity();

        auctionEntity.setWid(auctionDTO.getWid());
        auctionEntity.setAuction_date(LocalDateTime.now().plusDays(auction_date));  //현재일로부터 임의로 정한 일뒤에 마감
        auctionEntity.setBuy_now(auctionDTO.getBuy_now());
        auctionEntity.setHighest_value(auctionDTO.getHighest_value());
        auctionEntity.setLowest_value(auctionDTO.getLowest_value());

        return auctionEntity;
    }



}